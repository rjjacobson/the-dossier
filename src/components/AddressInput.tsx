'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface Suggestion {
  display_name: string;
  lat: string;
  lon: string;
  type?: string;
  class?: string;
  address?: {
    house_number?: string;
    road?: string;
    neighbourhood?: string;
    suburb?: string;
    city?: string;
    state?: string;
    postcode?: string;
  };
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
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    try {
      // Append "New York" if not present to bias results
      const searchQuery = /new york|ny|nyc|brooklyn|queens|bronx|manhattan|staten island/i.test(query)
        ? query
        : `${query}, New York`;

      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?` +
        `q=${encodeURIComponent(searchQuery)}` +
        `&format=json&addressdetails=1&limit=5` +
        `&countrycodes=us` +
        `&viewbox=-74.26,40.49,-73.7,40.92&bounded=1`,
        { headers: { 'Accept': 'application/json' } }
      );

      if (!res.ok) return;
      const data: Suggestion[] = await res.json();

      // Filter to actual addresses (not landmarks/POIs) and NY results
      const nySuggestions = data
        .filter((s) => {
          if (!s.display_name.includes('New York')) return false;
          // Only keep place types that are addresses, not landmarks
          const excludeTypes = ['tourism', 'amenity', 'shop', 'leisure', 'historic', 'building'];
          if (s.class && excludeTypes.includes(s.class)) return false;
          return true;
        })
        .map((s) => ({
          ...s,
          display_name: formatAddress(s),
        }));

      // Deduplicate by display name
      const seen = new Set<string>();
      const unique = nySuggestions.filter((s) => {
        if (seen.has(s.display_name)) return false;
        seen.add(s.display_name);
        return true;
      });

      setSuggestions(unique);
      setShowSuggestions(unique.length > 0);
      setSelectedIndex(-1);
    } catch {
      // Silently fail autocomplete, user can still type and submit
    }
  }, []);

  function formatAddress(s: Suggestion): string {
    // Build a clean address from structured parts if available
    if (s.address) {
      const parts: string[] = [];
      if (s.address.house_number && s.address.road) {
        parts.push(`${s.address.house_number} ${s.address.road}`);
      } else if (s.address.road) {
        parts.push(s.address.road);
      }
      if (s.address.suburb || s.address.neighbourhood) {
        parts.push(s.address.suburb || s.address.neighbourhood || '');
      }
      if (s.address.city && s.address.city !== 'City of New York') {
        parts.push(s.address.city);
      }
      if (s.address.postcode) {
        parts.push(`NY ${s.address.postcode}`);
      } else {
        parts.push('NY');
      }
      if (parts.length >= 2) return parts.filter(Boolean).join(', ');
    }

    // Fallback: clean the display name
    return s.display_name
      .replace(/, United States$/, '')
      .replace(/, New York, New York/, ', New York')
      .replace(/County, New York/, 'NY');
  }

  function handleInputChange(value: string) {
    setAddress(value);
    setError('');

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(value), 300);
  }

  function selectSuggestion(suggestion: Suggestion) {
    setAddress(suggestion.display_name);
    setSuggestions([]);
    setShowSuggestions(false);
    setSelectedIndex(-1);

    // Submit directly with the geocoded coordinates
    submitWithCoords(suggestion.display_name, parseFloat(suggestion.lat), parseFloat(suggestion.lon));
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

  async function submitWithCoords(displayAddress: string, lat: number, lng: number) {
    setLoading(true);
    setError('');

    const roundedLat = Math.round(lat * 100000) / 100000;
    const roundedLng = Math.round(lng * 100000) / 100000;

    router.push(`/results?lat=${roundedLat}&lng=${roundedLng}&address=${encodeURIComponent(displayAddress)}`);
    setLoading(false);
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
                  key={i}
                  role="option"
                  aria-selected={i === selectedIndex}
                  className={`px-4 py-2.5 text-[13px] text-gray-700 cursor-pointer border-b border-gray-50 last:border-0 ${
                    i === selectedIndex ? 'bg-gray-100' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => selectSuggestion(suggestion)}
                  onMouseEnter={() => setSelectedIndex(i)}
                >
                  {suggestion.display_name}
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
