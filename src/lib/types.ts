export type OfficeLevelGroup = 'Federal' | 'State' | 'County / Borough' | 'City (NYC)' | 'Local' | 'Political';

export type OfficeLevel =
  | 'federal_president' | 'federal_senate' | 'federal_house'
  | 'state_governor' | 'state_lt_governor' | 'state_ag'
  | 'state_comptroller' | 'state_senate' | 'state_assembly'
  | 'state_supreme_court'
  | 'county_da' | 'county_sheriff' | 'county_legislature'
  | 'borough_president'
  | 'city_mayor' | 'city_comptroller' | 'city_public_advocate'
  | 'city_council' | 'city_civil_court_judge'
  | 'community_board' | 'pep'
  | 'district_leader';

export type EvidenceType = 'vote' | 'statement' | 'endorsement' | 'attendance';

export type Stance = 'strongly_supportive' | 'supportive' | 'neutral' | 'opposed' | 'strongly_opposed';

export type Grade = 'A' | 'B' | 'C' | 'D' | 'F' | 'N/R';

export interface Official {
  id: number;
  name: string;
  slug: string;
  level: OfficeLevel;
  district_id: number | null;
  party: string | null;
  photo_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface OfficialWithGrade extends Official {
  score: number | null;
  grade: Grade;
  evidence_count: number;
}

export interface Evidence {
  id: number;
  official_id: number;
  type: EvidenceType;
  quote: string;
  source_url: string;
  source_name: string;
  date: string | null;
  stance: Stance;
  verified: boolean;
  created_at: string;
}

export interface District {
  id: number;
  level: OfficeLevel;
  name: string;
  cicero_id: string | null;
}

export interface GeocodeResult {
  lat: number;
  lng: number;
  matched_address: string;
}

export interface LookupResult {
  address: string;
  lat: number;
  lng: number;
  officials: OfficialWithGrade[];
}
