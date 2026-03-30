import { NextResponse } from 'next/server';

// Static mapping of city council members to their district numbers
// This connects our officials data to the GeoJSON district boundaries
const COUNCIL_DISTRICT_MAP: Record<string, number> = {
  'erik-bottcher': 3,
  'inna-vernikov': 48,
  'chi-osse': 36,
  'shahana-hanif': 39,
  'tiffany-caban': 22,
  'kalman-yeger': 44,
};

// Hardcoded for now since we have a small dataset
// Will move to Supabase query once districts table is populated
const COUNCIL_GRADES: Array<{ district: number; officialName: string; grade: string; slug: string }> = [
  { district: 3, officialName: 'Erik Bottcher', grade: 'B', slug: 'erik-bottcher' },
  { district: 48, officialName: 'Inna Vernikov', grade: 'A', slug: 'inna-vernikov' },
  { district: 36, officialName: 'Chi Osse', grade: 'F', slug: 'chi-osse' },
  { district: 39, officialName: 'Shahana Hanif', grade: 'F', slug: 'shahana-hanif' },
  { district: 22, officialName: 'Tiffany Caban', grade: 'F', slug: 'tiffany-caban' },
  { district: 44, officialName: 'Kalman Yeger', grade: 'A', slug: 'kalman-yeger' },
];

export async function GET() {
  return NextResponse.json(COUNCIL_GRADES, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}

export { COUNCIL_DISTRICT_MAP };
