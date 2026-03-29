import { NextRequest, NextResponse } from 'next/server';

// Census Bureau Geocoder API
const CENSUS_GEOCODER_URL = 'https://geocoding.geo.census.gov/geocoder/locations/onelineaddress';

interface CensusResult {
  result: {
    addressMatches: Array<{
      matchedAddress: string;
      coordinates: {
        x: number; // longitude
        y: number; // latitude
      };
    }>;
  };
}

export async function GET(request: NextRequest) {
  const address = request.nextUrl.searchParams.get('address');

  if (!address || !address.trim()) {
    return NextResponse.json({ error: 'Please enter an address.' }, { status: 400 });
  }

  // Basic NY validation
  const normalized = address.toLowerCase();
  const isNY = normalized.includes('ny') ||
    normalized.includes('new york') ||
    normalized.includes('brooklyn') ||
    normalized.includes('queens') ||
    normalized.includes('bronx') ||
    normalized.includes('staten island') ||
    normalized.includes('manhattan');

  if (!isNY) {
    return NextResponse.json(
      { error: 'Please enter a New York address.' },
      { status: 400 }
    );
  }

  try {
    // Call Census Bureau Geocoder
    const params = new URLSearchParams({
      address: address.trim(),
      benchmark: 'Public_AR_Current',
      format: 'json',
    });

    const response = await fetch(`${CENSUS_GEOCODER_URL}?${params}`, {
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Address lookup temporarily unavailable. Try again.' },
        { status: 503 }
      );
    }

    const data: CensusResult = await response.json();
    const matches = data.result.addressMatches;

    if (matches.length === 0) {
      return NextResponse.json(
        { error: "We couldn't find that address. Try entering a full street address in New York." },
        { status: 404 }
      );
    }

    const match = matches[0];
    const lat = Math.round(match.coordinates.y * 100000) / 100000;
    const lng = Math.round(match.coordinates.x * 100000) / 100000;

    // TODO: PostGIS point-in-polygon query against district boundaries
    // For now, return the geocoded coordinates
    return NextResponse.json({
      lat,
      lng,
      matched_address: match.matchedAddress,
    });
  } catch (err) {
    if (err instanceof DOMException && err.name === 'TimeoutError') {
      return NextResponse.json(
        { error: 'Address lookup temporarily unavailable. Try again.' },
        { status: 503 }
      );
    }
    return NextResponse.json(
      { error: 'Something went wrong. Try again.' },
      { status: 500 }
    );
  }
}
