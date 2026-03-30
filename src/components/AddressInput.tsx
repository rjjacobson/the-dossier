'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface PhotonFeature {
  properties: {
    osm_key?: string;
    osm_value?: string;
    name?: string;
    housenumber?: string;
    street?: string;
    locality?: string;
    district?: string;
    city?: string;
    state?: string;
    postcode?: string;
    countrycode?: string;
  };
  geometry: {
    coordinates: [number, number]; // [lon, lat]
  };
}

interface Suggestion {
  label: string;
  lat: number;
  lng: number;
}

export function AddressInput() {
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const fetchSuggestions = useCallback(async (query: string) => {
    if (query.length < 5) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      // Photon API - designed for autocomplete, biased toward NYC
      const searchQuery = /new york|ny|nyc|brooklyn|queens|bronx|manhattan|staten island/i.test(query)
        ? query
        : `${query}, New York`;

      const res = await fetch(
        `https://photon.komoot.io/api/?` +
        `q=${encodeURIComponent(searchQuery)}` +
        `&lat=40.7128&lon=-73.95` +
        `&limit=5&lang=en&layer=house&layer=street`,
      );

      if (!res.ok) return;
      const data = await res.json();

      // Parse user input into tokens for prefix matching
      const inputTokens = query.trim().toLowerCase().split(/\s+/);

      const results: Suggestion[] = (data.features || [])
        .filter((f: PhotonFeature) => {
          const p = f.properties;
          if (p.state !== 'New York') return false;
          if (!p.street) return false;

          // Build the full address text for matching
          const addressText = [
            p.housenumber,
            p.street,
            p.locality,
            p.district,
            p.city,
          ].filter(Boolean).join(' ').toLowerCase();

          // Every input token must prefix-match a word in the address
          const addressWords = addressText.split(/[\s,]+/);
          return inputTokens.every((token) =>
            addressWords.some((word) => word.startsWith(token))
          );
        })
        .map((f: PhotonFeature) => {
          const p = f.properties;
          return {
            label: formatPhotonResult(p),
            lat: f.geometry.coordinates[1],
            lng: f.geometry.coordinates[0],
          };
        });

      // Deduplicate by label
      const seen = new Set<string>();
      const unique = results.filter((s: Suggestion) => {
        if (seen.has(s.label)) return false;
        seen.add(s.label);
        return true;
      });

      setSuggestions(unique);
      setShowSuggestions(unique.length > 0);
      setSelectedIndex(-1);
    } catch {
      // Silently fail, user can still type and submit
    }
  }, []);

  function formatPhotonResult(p: PhotonFeature['properties']): string {
    const parts: string[] = [];

    if (p.housenumber && p.street) {
      parts.push(`${p.housenumber} ${p.street}`);
    } else if (p.street) {
      parts.push(p.street);
    }

    if (p.locality) {
      parts.push(p.locality);
    } else if (p.district) {
      parts.push(p.district);
    }

    if (p.city && p.city !== 'City of New York' && p.city !== 'New York') {
      parts.push(p.city);
    }

    parts.push(p.postcode ? `NY ${p.postcode}` : 'NY');

    return parts.join(', ');
  }

  function handleInputChange(value: string) {
    setAddress(value);
    setError('');

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(value), 300);
  }

  function selectSuggestion(suggestion: Suggestion) {
    setAddress(suggestion.label);
    setSuggestions([]);
    setShowSuggestions(false);
    setSelectedIndex(-1);

    // Navigate directly with coordinates
    const roundedLat = Math.round(suggestion.lat * 100000) / 100000;
    const roundedLng = Math.round(suggestion.lng * 100000) / 100000;
    router.push(`/results?lat=${roundedLat}&lng=${roundedLng}&address=${encodeURIComponent(suggestion.label)}`);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      selectSuggestion(suggestions[selectedIndex]);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setShowSuggestions(false);
    setError('');

    const trimmed = address.trim();
    if (!trimmed) {
      setError('Please enter an address.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`/api/lookup?address=${encodeURIComponent(trimmed)}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong. Try again.');
        return;
      }

      router.push(`/results?lat=${data.lat}&lng=${data.lng}&address=${encodeURIComponent(data.matched_address || trimmed)}`);
    } catch {
      setError('Address lookup temporarily unavailable. Try again.');
    } finally {
      setLoading(false);
    }
  }

  // Close suggestions on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[500px] mx-auto">
      <div className="flex gap-2" ref={wrapperRef}>
        <div className="flex-1 relative">
          <input
            type="text"
            value={address}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            placeholder="Enter your New York address..."
            className="w-full px-4 py-3 border border-gray-300 rounded-md text-[15px] bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1a3a5c] focus:border-transparent"
            disabled={loading}
            autoComplete="off"
            role="combobox"
            aria-expanded={showSuggestions}
            aria-haspopup="listbox"
            aria-autocomplete="list"
          />
          {showSuggestions && suggestions.length > 0 && (
            <ul
              role="listbox"
              className="absolute z-50 left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto"
            >
              {suggestions.map((suggestion, i) => (
                <li
                  key={`${suggestion.label}-${i}`}
                  role="option"
                  aria-selected={i === selectedIndex}
                  className={`px-4 py-2.5 text-[13px] text-gray-700 cursor-pointer border-b border-gray-50 last:border-0 ${
                    i === selectedIndex ? 'bg-gray-100' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => selectSuggestion(suggestion)}
                  onMouseEnter={() => setSelectedIndex(i)}
                >
                  {suggestion.label}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-[#1a3a5c] text-white rounded-md text-[15px] font-semibold hover:bg-[#2a5a8c] disabled:opacity-50 transition-colors shrink-0"
        >
          {loading ? '...' : 'Look Up'}
        </button>
      </div>
      {error && (
        <p className="text-red-600 text-sm mt-2">{error}</p>
      )}
    </form>
  );
}
