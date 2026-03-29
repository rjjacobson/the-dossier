import type { Grade, OfficeLevel, OfficeLevelGroup, Stance } from './types';

export const GRADE_COLORS: Record<Grade, { bg: string; text: string }> = {
  'A':   { bg: 'bg-green-600',  text: 'text-white' },
  'B':   { bg: 'bg-lime-600',   text: 'text-white' },
  'C':   { bg: 'bg-amber-500',  text: 'text-gray-900' },
  'D':   { bg: 'bg-orange-600', text: 'text-white' },
  'F':   { bg: 'bg-red-600',    text: 'text-white' },
  'N/R': { bg: 'bg-gray-400',   text: 'text-white' },
};

export const STANCE_COLORS: Record<Stance, { bg: string; text: string }> = {
  strongly_supportive: { bg: 'bg-green-100', text: 'text-green-800' },
  supportive:          { bg: 'bg-green-100', text: 'text-green-800' },
  neutral:             { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  opposed:             { bg: 'bg-red-50',    text: 'text-red-800' },
  strongly_opposed:    { bg: 'bg-red-50',    text: 'text-red-800' },
};

export const STANCE_LABELS: Record<Stance, string> = {
  strongly_supportive: 'Strongly Supportive',
  supportive: 'Supportive',
  neutral: 'Neutral',
  opposed: 'Opposed',
  strongly_opposed: 'Strongly Opposed',
};

export const EVIDENCE_TYPE_LABELS: Record<string, string> = {
  vote: 'Vote',
  statement: 'Statement',
  endorsement: 'Endorsement',
  attendance: 'Attendance',
};

export const LEVEL_GROUP_ORDER: OfficeLevelGroup[] = [
  'Federal',
  'State',
  'County / Borough',
  'City (NYC)',
  'Local',
  'Political',
];

export const LEVEL_TO_GROUP: Record<OfficeLevel, OfficeLevelGroup> = {
  federal_president: 'Federal',
  federal_senate: 'Federal',
  federal_house: 'Federal',
  state_governor: 'State',
  state_lt_governor: 'State',
  state_ag: 'State',
  state_comptroller: 'State',
  state_senate: 'State',
  state_assembly: 'State',
  state_supreme_court: 'State',
  county_da: 'County / Borough',
  county_sheriff: 'County / Borough',
  county_legislature: 'County / Borough',
  borough_president: 'County / Borough',
  city_mayor: 'City (NYC)',
  city_comptroller: 'City (NYC)',
  city_public_advocate: 'City (NYC)',
  city_council: 'City (NYC)',
  city_civil_court_judge: 'City (NYC)',
  community_board: 'Local',
  pep: 'Local',
  district_leader: 'Political',
};

export const LEVEL_LABELS: Record<OfficeLevel, string> = {
  federal_president: 'President',
  federal_senate: 'US Senate',
  federal_house: 'US House',
  state_governor: 'Governor',
  state_lt_governor: 'Lt. Governor',
  state_ag: 'Attorney General',
  state_comptroller: 'State Comptroller',
  state_senate: 'State Senate',
  state_assembly: 'State Assembly',
  state_supreme_court: 'Supreme Court Justice',
  county_da: 'District Attorney',
  county_sheriff: 'Sheriff',
  county_legislature: 'County Legislature',
  borough_president: 'Borough President',
  city_mayor: 'Mayor',
  city_comptroller: 'City Comptroller',
  city_public_advocate: 'Public Advocate',
  city_council: 'City Council',
  city_civil_court_judge: 'Civil Court Judge',
  community_board: 'Community Board',
  pep: 'Panel for Educational Policy',
  district_leader: 'District Leader',
};
