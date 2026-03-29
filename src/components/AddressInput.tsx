'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function AddressInput() {
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
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

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[500px] mx-auto">
      <div className="flex gap-2">
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your New York address..."
          className="flex-1 px-4 py-3 border border-gray-300 rounded-md text-[15px] bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1a3a5c] focus:border-transparent"
          disabled={loading}
        />
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
