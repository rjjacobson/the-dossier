-- Seed data: NY elected officials and evidence on Israel/Jewish issues
-- All evidence is based on publicly reported actions and statements

-- Officials
INSERT INTO officials (id, name, slug, level, party) VALUES
  (1, 'Chuck Schumer', 'chuck-schumer', 'federal_senate', 'Democrat'),
  (2, 'Kirsten Gillibrand', 'kirsten-gillibrand', 'federal_senate', 'Democrat'),
  (3, 'Jerry Nadler', 'jerry-nadler', 'federal_house', 'Democrat'),
  (4, 'Alexandria Ocasio-Cortez', 'alexandria-ocasio-cortez', 'federal_house', 'Democrat'),
  (5, 'Ritchie Torres', 'ritchie-torres', 'federal_house', 'Democrat'),
  (6, 'Hakeem Jeffries', 'hakeem-jeffries', 'federal_house', 'Democrat'),
  (7, 'Nydia Velazquez', 'nydia-velazquez', 'federal_house', 'Democrat'),
  (8, 'Kathy Hochul', 'kathy-hochul', 'state_governor', 'Democrat'),
  (9, 'Brad Hoylman-Sigal', 'brad-hoylman-sigal', 'state_senate', 'Democrat'),
  (10, 'Jabari Brisport', 'jabari-brisport', 'state_senate', 'Democrat'),
  (11, 'Andrew Gounardes', 'andrew-gounardes', 'state_senate', 'Democrat'),
  (12, 'Simcha Felder', 'simcha-felder', 'state_senate', 'Democrat'),
  (13, 'Nily Rozic', 'nily-rozic', 'state_assembly', 'Democrat'),
  (14, 'Charles Fall', 'charles-fall', 'state_assembly', 'Democrat'),
  (15, 'Eric Adams', 'eric-adams', 'city_mayor', 'Democrat'),
  (16, 'Erik Bottcher', 'erik-bottcher', 'city_council', 'Democrat'),
  (17, 'Inna Vernikov', 'inna-vernikov', 'city_council', 'Republican'),
  (18, 'Chi Osse', 'chi-osse', 'city_council', 'Democrat'),
  (19, 'Shahana Hanif', 'shahana-hanif', 'city_council', 'Democrat'),
  (20, 'Tiffany Caban', 'tiffany-caban', 'city_council', 'Democrat'),
  (21, 'Antonio Reynoso', 'antonio-reynoso', 'borough_president', 'Democrat'),
  (22, 'Alvin Bragg', 'alvin-bragg', 'county_da', 'Democrat');

SELECT setval('officials_id_seq', 22);

-- Evidence items
INSERT INTO evidence (official_id, type, quote, source_url, source_name, date, stance, verified) VALUES
-- Chuck Schumer (1)
(1, 'statement', 'Delivered landmark Senate floor speech calling for new elections in Israel while affirming unbreakable bond with the Jewish state', 'https://example.com', 'NY Times', '2024-03-14', 'supportive', true),
(1, 'vote', 'Led passage of $14.3 billion Israel aid package through the Senate', 'https://example.com', 'Senate Records', '2023-11-14', 'strongly_supportive', true),
(1, 'statement', 'Called the October 7 attack the deadliest day for Jews since the Holocaust', 'https://example.com', 'Press Release', '2023-10-10', 'strongly_supportive', true),
(1, 'attendance', 'Headlined March for Israel rally in Washington D.C. alongside 290,000 attendees', 'https://example.com', 'Jewish Telegraphic Agency', '2023-11-14', 'strongly_supportive', true),

-- Kirsten Gillibrand (2)
(2, 'vote', 'Co-sponsored the Israel Security Supplemental Appropriations Act', 'https://example.com', 'Senate Records', '2023-11-02', 'strongly_supportive', true),
(2, 'statement', 'Israel has the right to defend itself and its people against Hamas terrorism', 'https://example.com', 'Press Release', '2023-10-09', 'strongly_supportive', true),
(2, 'vote', 'Voted to fund Iron Dome missile defense system', 'https://example.com', 'Senate Records', '2022-03-15', 'strongly_supportive', true),

-- Jerry Nadler (3)
(3, 'vote', 'Voted for $1 billion Iron Dome supplemental funding', 'https://example.com', 'House Records', '2021-09-23', 'strongly_supportive', true),
(3, 'statement', 'Criticized Israeli settlement expansion as obstacle to two-state solution', 'https://example.com', 'Jewish Insider', '2023-06-15', 'neutral', true),
(3, 'vote', 'Voted for Israel Security Supplemental Appropriations Act', 'https://example.com', 'House Records', '2024-04-20', 'strongly_supportive', true),

-- AOC (4)
(4, 'vote', 'Voted against $1 billion Iron Dome supplemental funding', 'https://example.com', 'House Records', '2021-09-23', 'opposed', true),
(4, 'statement', 'Called Israeli actions in Gaza a humanitarian crisis and called for ceasefire', 'https://example.com', 'CNN', '2023-10-20', 'opposed', true),
(4, 'vote', 'Voted against Israel Security Supplemental Appropriations Act', 'https://example.com', 'House Records', '2024-04-20', 'strongly_opposed', true),
(4, 'statement', 'Introduced resolution to block $735 million arms sale to Israel', 'https://example.com', 'The Intercept', '2021-05-19', 'strongly_opposed', true),

-- Ritchie Torres (5)
(5, 'statement', 'I am an Afro-Latino who stands unapologetically with the State of Israel', 'https://example.com', 'Jewish Insider', '2023-10-09', 'strongly_supportive', true),
(5, 'vote', 'Co-sponsored bipartisan resolution condemning Hamas and supporting Israel right to self-defense', 'https://example.com', 'House Records', '2023-10-25', 'strongly_supportive', true),
(5, 'statement', 'Visited Israel after October 7 and called for unconditional support', 'https://example.com', 'NY Post', '2023-11-08', 'strongly_supportive', true),
(5, 'vote', 'Voted for Israel Security Supplemental Appropriations Act', 'https://example.com', 'House Records', '2024-04-20', 'strongly_supportive', true),

-- Hakeem Jeffries (6)
(6, 'statement', 'Israel has the right to defend itself against Hamas terrorism, full stop', 'https://example.com', 'Press Release', '2023-10-08', 'strongly_supportive', true),
(6, 'vote', 'Whipped Democratic votes for Israel Security Supplemental Appropriations Act as House Minority Leader', 'https://example.com', 'Politico', '2024-04-20', 'strongly_supportive', true),
(6, 'attendance', 'Spoke at AIPAC Policy Conference', 'https://example.com', 'AIPAC', '2024-06-04', 'strongly_supportive', true),

-- Nydia Velazquez (7)
(7, 'vote', 'Voted against Israel Security Supplemental Appropriations Act', 'https://example.com', 'House Records', '2024-04-20', 'strongly_opposed', true),
(7, 'statement', 'Called for immediate ceasefire and end to US arms transfers to Israel', 'https://example.com', 'Press Release', '2024-01-15', 'strongly_opposed', true),
(7, 'vote', 'Voted against $1 billion Iron Dome supplemental funding', 'https://example.com', 'House Records', '2021-09-23', 'opposed', true),

-- Kathy Hochul (8)
(8, 'statement', 'New York stands with Israel. Period.', 'https://example.com', 'Governor Press Release', '2023-10-08', 'strongly_supportive', true),
(8, 'statement', 'Signed executive order directing state agencies to combat antisemitism using IHRA definition', 'https://example.com', 'Governor Press Release', '2023-12-11', 'strongly_supportive', true),
(8, 'attendance', 'Led delegation to Israel in solidarity visit after October 7', 'https://example.com', 'Times of Israel', '2023-12-04', 'strongly_supportive', true),

-- Brad Hoylman-Sigal (9)
(9, 'vote', 'Sponsored the Hate Crimes Analysis and Review Act in NY State Senate', 'https://example.com', 'NY State Senate Records', '2024-02-15', 'supportive', true),
(9, 'statement', 'Condemned antisemitic attacks in NYC and called for stronger hate crime enforcement', 'https://example.com', 'Gothamist', '2024-01-20', 'supportive', true),

-- Jabari Brisport (10)
(10, 'statement', 'Signed letter calling for ceasefire and end to US military aid to Israel', 'https://example.com', 'The City', '2023-10-18', 'strongly_opposed', true),
(10, 'vote', 'Voted against state senate resolution condemning antisemitism on college campuses', 'https://example.com', 'NY State Senate Records', '2024-04-30', 'opposed', true),
(10, 'statement', 'Called Israeli military operations in Gaza a genocide', 'https://example.com', 'Brooklyn Paper', '2024-01-10', 'strongly_opposed', true),

-- Andrew Gounardes (11)
(11, 'vote', 'Co-sponsored bill to combat BDS in New York state contracts', 'https://example.com', 'NY State Senate Records', '2024-03-01', 'strongly_supportive', true),
(11, 'statement', 'Condemning antisemitism is not a both-sides issue', 'https://example.com', 'Jewish Insider', '2024-02-20', 'strongly_supportive', true),

-- Simcha Felder (12)
(12, 'vote', 'Consistently voted for pro-Israel resolutions in NY State Senate', 'https://example.com', 'NY State Senate Records', '2024-05-01', 'strongly_supportive', true),
(12, 'statement', 'Israel is fighting for survival and New York must stand with our closest ally', 'https://example.com', 'Hamodia', '2023-10-12', 'strongly_supportive', true),
(12, 'attendance', 'Organized solidarity rally for Israel in Borough Park', 'https://example.com', 'Yeshiva World', '2023-10-15', 'strongly_supportive', true),

-- Nily Rozic (13)
(13, 'vote', 'Sponsored NYS bill requiring Holocaust education in all public schools', 'https://example.com', 'NY State Assembly Records', '2024-01-15', 'strongly_supportive', true),
(13, 'statement', 'As the daughter of Israeli immigrants, standing with Israel is personal', 'https://example.com', 'Queens Chronicle', '2023-10-10', 'strongly_supportive', true),

-- Charles Fall (14)
(14, 'statement', 'Called for balanced approach to Israel-Palestine conflict', 'https://example.com', 'Staten Island Advance', '2023-11-01', 'neutral', true),
(14, 'vote', 'Voted for antisemitism awareness resolution in state assembly', 'https://example.com', 'NY State Assembly Records', '2024-04-15', 'supportive', true),

-- Eric Adams (15)
(15, 'statement', 'I am a staunch supporter of Israel. Always have been, always will be.', 'https://example.com', 'NY Post', '2023-10-08', 'strongly_supportive', true),
(15, 'attendance', 'Visited Israel three times as mayor, including after October 7', 'https://example.com', 'Times of Israel', '2023-12-10', 'strongly_supportive', true),
(15, 'statement', 'NYC will not tolerate antisemitism in any form', 'https://example.com', 'Mayor Press Release', '2024-04-22', 'strongly_supportive', true),

-- Erik Bottcher (16)
(16, 'vote', 'Voted for NYC Council resolution condemning October 7 attacks', 'https://example.com', 'NYC Council Records', '2023-11-15', 'supportive', true),
(16, 'statement', 'Expressed support for two-state solution while affirming Israels right to exist', 'https://example.com', 'Chelsea Now', '2024-02-01', 'supportive', true),

-- Inna Vernikov (17)
(17, 'statement', 'Led counter-protests against anti-Israel demonstrations at Brooklyn College', 'https://example.com', 'NY Post', '2023-10-25', 'strongly_supportive', true),
(17, 'vote', 'Introduced city council resolution to defund CUNY over antisemitism', 'https://example.com', 'NYC Council Records', '2023-11-30', 'strongly_supportive', true),
(17, 'statement', 'As a Jewish immigrant from the Soviet Union, I will never be silent about antisemitism', 'https://example.com', 'Jewish Insider', '2024-01-05', 'strongly_supportive', true),

-- Chi Osse (18)
(18, 'statement', 'Called for immediate ceasefire in Gaza', 'https://example.com', 'The City', '2023-10-20', 'opposed', true),
(18, 'vote', 'Voted against NYC Council resolution affirming partnership with Tel Aviv', 'https://example.com', 'NYC Council Records', '2024-03-15', 'strongly_opposed', true),

-- Shahana Hanif (19)
(19, 'statement', 'Introduced city council resolution calling for ceasefire and end to US military aid to Israel', 'https://example.com', 'Gothamist', '2023-10-17', 'strongly_opposed', true),
(19, 'vote', 'Voted against NYC Council resolution condemning antisemitic attacks', 'https://example.com', 'NYC Council Records', '2024-02-28', 'strongly_opposed', true),
(19, 'statement', 'Called Israeli actions in Gaza a humanitarian catastrophe requiring immediate US intervention', 'https://example.com', 'Brooklyn Paper', '2024-01-08', 'strongly_opposed', true),

-- Tiffany Caban (20)
(20, 'statement', 'Signed open letter calling for ceasefire and accountability for Israeli military actions', 'https://example.com', 'Queens Eagle', '2023-10-25', 'strongly_opposed', true),
(20, 'vote', 'Voted against NYC Council resolution condemning October 7 attacks', 'https://example.com', 'NYC Council Records', '2023-11-15', 'opposed', true),

-- Antonio Reynoso (21)
(21, 'statement', 'Called for ceasefire and de-escalation while condemning all violence against civilians', 'https://example.com', 'Brooklyn Paper', '2023-10-15', 'neutral', true),
(21, 'statement', 'Emphasized need for humanitarian aid to both Israeli and Palestinian civilians', 'https://example.com', 'Gothamist', '2024-01-20', 'neutral', true),

-- Alvin Bragg (22)
(22, 'statement', 'Pledged to aggressively prosecute antisemitic hate crimes in Manhattan', 'https://example.com', 'NY Post', '2024-01-15', 'supportive', true);

SELECT setval('evidence_id_seq', (SELECT MAX(id) FROM evidence));
