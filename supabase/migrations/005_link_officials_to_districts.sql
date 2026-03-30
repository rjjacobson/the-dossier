-- Link officials to their districts
-- Congressional districts
UPDATE officials SET district_id = (SELECT id FROM districts WHERE level = 'federal_house' AND name = 'NY-12') WHERE slug = 'jerry-nadler';
UPDATE officials SET district_id = (SELECT id FROM districts WHERE level = 'federal_house' AND name = 'NY-14') WHERE slug = 'alexandria-ocasio-cortez';
UPDATE officials SET district_id = (SELECT id FROM districts WHERE level = 'federal_house' AND name = 'NY-15') WHERE slug = 'ritchie-torres';
UPDATE officials SET district_id = (SELECT id FROM districts WHERE level = 'federal_house' AND name = 'NY-8') WHERE slug = 'hakeem-jeffries';
UPDATE officials SET district_id = (SELECT id FROM districts WHERE level = 'federal_house' AND name = 'NY-7') WHERE slug = 'nydia-velazquez';
UPDATE officials SET district_id = (SELECT id FROM districts WHERE level = 'federal_house' AND name = 'NY-16') WHERE slug = 'jamaal-bowman';

-- State Senate (using district numbers)
UPDATE officials SET district_id = (SELECT id FROM districts WHERE level = 'state_senate' AND name = 'SD-20') WHERE slug = 'zellnor-myrie';
UPDATE officials SET district_id = (SELECT id FROM districts WHERE level = 'state_senate' AND name = 'SD-25') WHERE slug = 'jabari-brisport';
UPDATE officials SET district_id = (SELECT id FROM districts WHERE level = 'state_senate' AND name = 'SD-47') WHERE slug = 'brad-hoylman-sigal';
UPDATE officials SET district_id = (SELECT id FROM districts WHERE level = 'state_senate' AND name = 'SD-22') WHERE slug = 'andrew-gounardes';
UPDATE officials SET district_id = (SELECT id FROM districts WHERE level = 'state_senate' AND name = 'SD-17') WHERE slug = 'simcha-felder';
UPDATE officials SET district_id = (SELECT id FROM districts WHERE level = 'state_senate' AND name = 'SD-7') WHERE slug = 'anna-kaplan';

-- State Assembly
UPDATE officials SET district_id = (SELECT id FROM districts WHERE level = 'state_assembly' AND name = 'AD-67') WHERE slug = 'nily-rozic';
UPDATE officials SET district_id = (SELECT id FROM districts WHERE level = 'state_assembly' AND name = 'AD-61') WHERE slug = 'charles-fall';

-- City Council
UPDATE officials SET district_id = (SELECT id FROM districts WHERE level = 'city_council' AND name = 'CC-3') WHERE slug = 'erik-bottcher';
UPDATE officials SET district_id = (SELECT id FROM districts WHERE level = 'city_council' AND name = 'CC-48') WHERE slug = 'inna-vernikov';
UPDATE officials SET district_id = (SELECT id FROM districts WHERE level = 'city_council' AND name = 'CC-36') WHERE slug = 'chi-osse';
UPDATE officials SET district_id = (SELECT id FROM districts WHERE level = 'city_council' AND name = 'CC-39') WHERE slug = 'shahana-hanif';
UPDATE officials SET district_id = (SELECT id FROM districts WHERE level = 'city_council' AND name = 'CC-22') WHERE slug = 'tiffany-caban';
UPDATE officials SET district_id = (SELECT id FROM districts WHERE level = 'city_council' AND name = 'CC-44') WHERE slug = 'kalman-yeger';

-- Create a function to find officials by coordinates
CREATE OR REPLACE FUNCTION find_officials_by_location(p_lat DOUBLE PRECISION, p_lng DOUBLE PRECISION)
RETURNS TABLE(official_id INT) AS $$
BEGIN
  -- Return statewide/citywide officials (always shown)
  RETURN QUERY
  SELECT o.id FROM officials o
  WHERE o.level IN (
    'federal_president', 'federal_senate',
    'state_governor', 'state_lt_governor', 'state_ag', 'state_comptroller',
    'city_mayor', 'city_comptroller', 'city_public_advocate'
  );

  -- Return district-level officials whose district contains the point
  RETURN QUERY
  SELECT o.id FROM officials o
  JOIN districts d ON o.district_id = d.id
  WHERE d.boundaries IS NOT NULL
  AND ST_Contains(d.boundaries, ST_SetSRID(ST_MakePoint(p_lng, p_lat), 4326));

  -- Return officials without districts (borough presidents, DAs without boundaries)
  -- These are included for completeness but should eventually get boundaries too
  RETURN QUERY
  SELECT o.id FROM officials o
  WHERE o.district_id IS NULL
  AND o.level NOT IN (
    'federal_president', 'federal_senate',
    'state_governor', 'state_lt_governor', 'state_ag', 'state_comptroller',
    'city_mayor', 'city_comptroller', 'city_public_advocate',
    'federal_house', 'state_senate', 'state_assembly', 'city_council'
  );
END;
$$ LANGUAGE plpgsql STABLE;
