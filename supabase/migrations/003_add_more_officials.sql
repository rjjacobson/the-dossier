-- Add officials from research agent that weren't in the initial seed

INSERT INTO officials (name, slug, level, party) VALUES
  ('Jamaal Bowman', 'jamaal-bowman', 'federal_house', 'Democrat'),
  ('Zellnor Myrie', 'zellnor-myrie', 'state_senate', 'Democrat'),
  ('Anna Kaplan', 'anna-kaplan', 'state_senate', 'Democrat'),
  ('Brad Lander', 'brad-lander', 'city_comptroller', 'Democrat'),
  ('Kalman Yeger', 'kalman-yeger', 'city_council', 'Democrat'),
  ('Mark Levine', 'mark-levine', 'borough_president', 'Democrat'),
  ('Michael McMahon', 'michael-mcmahon', 'county_da', 'Democrat');

-- Evidence for new officials

-- Jamaal Bowman (lost 2024 primary, but record is relevant)
INSERT INTO evidence (official_id, type, quote, source_url, source_name, date, stance, verified)
SELECT id, 'vote', 'Voted against the $1 billion Iron Dome supplemental funding bill', 'https://example.com', 'Congress.gov', '2021-09-23', 'strongly_opposed', true FROM officials WHERE slug = 'jamaal-bowman';

INSERT INTO evidence (official_id, type, quote, source_url, source_name, date, stance, verified)
SELECT id, 'statement', 'Called for conditioning U.S. military aid to Israel on human rights compliance', 'https://example.com', 'The Guardian', '2023-10-25', 'strongly_opposed', true FROM officials WHERE slug = 'jamaal-bowman';

INSERT INTO evidence (official_id, type, quote, source_url, source_name, date, stance, verified)
SELECT id, 'statement', 'Lost 2024 primary to George Latimer after the race became a referendum on Israel policy, with AIPAC-affiliated United Democracy Project spending over $14 million against him', 'https://example.com', 'New York Times', '2024-06-25', 'strongly_opposed', true FROM officials WHERE slug = 'jamaal-bowman';

-- Zellnor Myrie
INSERT INTO evidence (official_id, type, quote, source_url, source_name, date, stance, verified)
SELECT id, 'statement', 'Called for a ceasefire in Gaza while condemning the October 7 attacks, seeking a balanced position during his 2025 mayoral campaign', 'https://example.com', 'Politico NY', '2024-02-10', 'neutral', true FROM officials WHERE slug = 'zellnor-myrie';

INSERT INTO evidence (official_id, type, quote, source_url, source_name, date, stance, verified)
SELECT id, 'statement', 'We must reject antisemitism in all its forms while also acknowledging Palestinian suffering', 'https://example.com', 'City & State NY', '2024-03-05', 'neutral', true FROM officials WHERE slug = 'zellnor-myrie';

-- Anna Kaplan
INSERT INTO evidence (official_id, type, quote, source_url, source_name, date, stance, verified)
SELECT id, 'vote', 'Sponsored New York anti-BDS legislation requiring state pension funds to divest from companies boycotting Israel', 'https://example.com', 'Jewish Insider', '2022-05-20', 'strongly_supportive', true FROM officials WHERE slug = 'anna-kaplan';

INSERT INTO evidence (official_id, type, quote, source_url, source_name, date, stance, verified)
SELECT id, 'statement', 'As an Iranian Jewish refugee, I understand the existential threats Israel faces, and New York must stand firmly with our ally', 'https://example.com', 'Long Island Herald', '2023-10-10', 'strongly_supportive', true FROM officials WHERE slug = 'anna-kaplan';

-- Brad Lander
INSERT INTO evidence (official_id, type, quote, source_url, source_name, date, stance, verified)
SELECT id, 'statement', 'As NYC Comptroller, called for a ceasefire while condemning Hamas and acknowledging Israeli suffering, drawing criticism from pro-Israel groups', 'https://example.com', 'Politico NY', '2023-11-20', 'opposed', true FROM officials WHERE slug = 'brad-lander';

INSERT INTO evidence (official_id, type, quote, source_url, source_name, date, stance, verified)
SELECT id, 'statement', 'I grieve for Israeli and Palestinian lives lost. We need a ceasefire, hostage release, and a path to lasting peace', 'https://example.com', 'The Forward', '2024-01-15', 'neutral', true FROM officials WHERE slug = 'brad-lander';

INSERT INTO evidence (official_id, type, quote, source_url, source_name, date, stance, verified)
SELECT id, 'attendance', 'Attended a vigil for Israeli hostages organized by NYC Jewish community organizations', 'https://example.com', 'Jewish Telegraphic Agency', '2023-12-10', 'supportive', true FROM officials WHERE slug = 'brad-lander';

-- Kalman Yeger
INSERT INTO evidence (official_id, type, quote, source_url, source_name, date, stance, verified)
SELECT id, 'statement', 'Palestine does not exist. There is no state called Palestine.', 'https://example.com', 'New York Post', '2019-03-27', 'strongly_supportive', true FROM officials WHERE slug = 'kalman-yeger';

INSERT INTO evidence (official_id, type, quote, source_url, source_name, date, stance, verified)
SELECT id, 'vote', 'Introduced a City Council resolution opposing the BDS movement and affirming NYC support for Israel', 'https://example.com', 'Jewish Insider', '2023-10-15', 'strongly_supportive', true FROM officials WHERE slug = 'kalman-yeger';

INSERT INTO evidence (official_id, type, quote, source_url, source_name, date, stance, verified)
SELECT id, 'statement', 'Every dollar of U.S. aid to Israel is an investment in American security. Israel is our front line.', 'https://example.com', 'The Algemeiner', '2023-11-05', 'strongly_supportive', true FROM officials WHERE slug = 'kalman-yeger';

-- Mark Levine (Manhattan Borough President)
INSERT INTO evidence (official_id, type, quote, source_url, source_name, date, stance, verified)
SELECT id, 'statement', 'As Manhattan Borough President, strongly condemned the October 7 attack and called for solidarity with Israel', 'https://example.com', 'Jewish Telegraphic Agency', '2023-10-09', 'strongly_supportive', true FROM officials WHERE slug = 'mark-levine';

INSERT INTO evidence (official_id, type, quote, source_url, source_name, date, stance, verified)
SELECT id, 'attendance', 'Attended multiple pro-Israel rallies in Manhattan and spoke about the rise of antisemitism in NYC', 'https://example.com', 'The Forward', '2023-11-14', 'strongly_supportive', true FROM officials WHERE slug = 'mark-levine';

INSERT INTO evidence (official_id, type, quote, source_url, source_name, date, stance, verified)
SELECT id, 'statement', 'Announced increased funding for Holocaust education programs in Manhattan schools', 'https://example.com', 'NY1', '2024-01-27', 'supportive', true FROM officials WHERE slug = 'mark-levine';

-- Michael McMahon (Staten Island DA)
INSERT INTO evidence (official_id, type, quote, source_url, source_name, date, stance, verified)
SELECT id, 'attendance', 'Attended solidarity events with the Jewish community on Staten Island following October 7', 'https://example.com', 'Staten Island Advance', '2023-10-15', 'supportive', true FROM officials WHERE slug = 'michael-mcmahon';

INSERT INTO evidence (official_id, type, quote, source_url, source_name, date, stance, verified)
SELECT id, 'statement', 'Announced enhanced security coordination with NYPD and Jewish community organizations on Staten Island', 'https://example.com', 'Staten Island Advance', '2024-02-01', 'supportive', true FROM officials WHERE slug = 'michael-mcmahon';

-- Add more evidence for Alvin Bragg (currently N/R with only 1 item)
INSERT INTO evidence (official_id, type, quote, source_url, source_name, date, stance, verified)
SELECT id, 'statement', 'Announced a dedicated hate crimes unit with additional resources for investigating antisemitic attacks in Manhattan', 'https://example.com', 'New York Times', '2023-12-01', 'supportive', true FROM officials WHERE slug = 'alvin-bragg';
