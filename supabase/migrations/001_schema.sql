-- Enable PostGIS for geographic queries
CREATE EXTENSION IF NOT EXISTS postgis;

-- Office level enum covering all NY government levels
CREATE TYPE office_level AS ENUM (
  'federal_president', 'federal_senate', 'federal_house',
  'state_governor', 'state_lt_governor', 'state_ag',
  'state_comptroller', 'state_senate', 'state_assembly',
  'state_supreme_court',
  'county_da', 'county_sheriff', 'county_legislature',
  'borough_president',
  'city_mayor', 'city_comptroller', 'city_public_advocate',
  'city_council', 'city_civil_court_judge',
  'community_board', 'pep',
  'district_leader'
);

CREATE TYPE evidence_type AS ENUM ('vote', 'statement', 'endorsement', 'attendance');

CREATE TYPE stance AS ENUM (
  'strongly_supportive', 'supportive', 'neutral', 'opposed', 'strongly_opposed'
);

-- Districts with PostGIS boundaries
CREATE TABLE districts (
  id SERIAL PRIMARY KEY,
  level office_level NOT NULL,
  name TEXT NOT NULL,
  cicero_id TEXT,
  boundaries GEOMETRY(MultiPolygon, 4326),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_districts_boundaries ON districts USING GIST (boundaries);
CREATE INDEX idx_districts_level ON districts (level);

-- Officials
CREATE TABLE officials (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  level office_level NOT NULL,
  district_id INT REFERENCES districts(id),
  party TEXT,
  photo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_officials_slug ON officials (slug);
CREATE INDEX idx_officials_level ON officials (level);
CREATE INDEX idx_officials_district ON officials (district_id);

-- Evidence items
CREATE TABLE evidence (
  id SERIAL PRIMARY KEY,
  official_id INT REFERENCES officials(id) ON DELETE CASCADE,
  type evidence_type NOT NULL,
  quote TEXT NOT NULL,
  source_url TEXT NOT NULL,
  source_name TEXT NOT NULL,
  date DATE,
  stance stance NOT NULL,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_evidence_official ON evidence (official_id);
CREATE INDEX idx_evidence_verified ON evidence (verified);

-- Geocode cache (keyed on rounded lat/lng)
CREATE TABLE geocode_cache (
  lat_lng TEXT PRIMARY KEY,
  district_ids JSONB NOT NULL,
  cached_at TIMESTAMPTZ DEFAULT NOW()
);

-- Grade calculation function
-- Simple average of stance scores: +2/+1/0/-1/-2
-- Thresholds: A >= 1.5, B >= 0.75, C >= -0.25, D >= -1.0, F < -1.0
-- N/R when fewer than 2 verified evidence items
CREATE OR REPLACE FUNCTION calculate_grade(p_official_id INT)
RETURNS TABLE(score NUMERIC, grade TEXT, evidence_count INT) AS $$
DECLARE
  v_count INT;
  v_score NUMERIC;
BEGIN
  SELECT
    COUNT(*)::INT,
    AVG(
      CASE stance
        WHEN 'strongly_supportive' THEN 2
        WHEN 'supportive' THEN 1
        WHEN 'neutral' THEN 0
        WHEN 'opposed' THEN -1
        WHEN 'strongly_opposed' THEN -2
      END
    )
  INTO v_count, v_score
  FROM evidence e
  WHERE e.official_id = p_official_id
    AND e.verified = TRUE;

  evidence_count := v_count;

  IF v_count < 2 THEN
    score := NULL;
    grade := 'N/R';
    RETURN NEXT;
    RETURN;
  END IF;

  score := ROUND(v_score, 2);

  IF v_score >= 1.5 THEN grade := 'A';
  ELSIF v_score >= 0.75 THEN grade := 'B';
  ELSIF v_score >= -0.25 THEN grade := 'C';
  ELSIF v_score >= -1.0 THEN grade := 'D';
  ELSE grade := 'F';
  END IF;

  RETURN NEXT;
  RETURN;
END;
$$ LANGUAGE plpgsql STABLE;

-- View for officials with computed grades
CREATE VIEW officials_with_grades AS
SELECT
  o.*,
  g.score,
  g.grade,
  g.evidence_count
FROM officials o
LEFT JOIN LATERAL calculate_grade(o.id) g ON TRUE;

-- RLS: public read access, admin write
ALTER TABLE officials ENABLE ROW LEVEL SECURITY;
ALTER TABLE evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE districts ENABLE ROW LEVEL SECURITY;
ALTER TABLE geocode_cache ENABLE ROW LEVEL SECURITY;

-- Allow public read
CREATE POLICY "Public read officials" ON officials FOR SELECT USING (true);
CREATE POLICY "Public read evidence" ON evidence FOR SELECT USING (verified = true);
CREATE POLICY "Public read districts" ON districts FOR SELECT USING (true);
CREATE POLICY "Public read cache" ON geocode_cache FOR SELECT USING (true);

-- Service role can do everything (for admin operations)
CREATE POLICY "Service write officials" ON officials FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service write evidence" ON evidence FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service write districts" ON districts FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service write cache" ON geocode_cache FOR ALL USING (true) WITH CHECK (true);
