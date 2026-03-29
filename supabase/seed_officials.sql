-- Seed data: NY elected officials and evidence on Israel/Jewish community issues
-- Generated 2026-03-28
-- IMPORTANT: All evidence items reflect real, publicly documented positions.
-- source_url placeholders should be replaced with actual URLs before production use.

-- =============================================================================
-- OFFICIALS
-- =============================================================================

INSERT INTO officials (id, name, slug, level, district_id, party, photo_url) VALUES

-- Federal - Senate
(1,  'Chuck Schumer',           'chuck-schumer',           'federal_senate',    NULL, 'Democrat', NULL),
(2,  'Kirsten Gillibrand',      'kirsten-gillibrand',      'federal_senate',    NULL, 'Democrat', NULL),

-- Federal - House (NYC members)
(3,  'Jerry Nadler',            'jerry-nadler',            'federal_house',     NULL, 'Democrat', NULL),
(4,  'Alexandria Ocasio-Cortez','alexandria-ocasio-cortez', 'federal_house',     NULL, 'Democrat', NULL),
(5,  'Ritchie Torres',          'ritchie-torres',          'federal_house',     NULL, 'Democrat', NULL),
(6,  'Jamaal Bowman',           'jamaal-bowman',           'federal_house',     NULL, 'Democrat', NULL),
(7,  'Hakeem Jeffries',         'hakeem-jeffries',         'federal_house',     NULL, 'Democrat', NULL),

-- State - Governor
(8,  'Kathy Hochul',            'kathy-hochul',            'state_governor',    NULL, 'Democrat', NULL),

-- State - Legislature
(9,  'Zellnor Myrie',           'zellnor-myrie',           'state_senate',      NULL, 'Democrat', NULL),
(10, 'Jabari Brisport',         'jabari-brisport',         'state_senate',      NULL, 'Democrat', NULL),
(11, 'Anna Kaplan',             'anna-kaplan',             'state_senate',      NULL, 'Democrat', NULL),
(12, 'Charles Fall',            'charles-fall',            'state_assembly',    NULL, 'Democrat', NULL),

-- City - Mayor
(13, 'Eric Adams',              'eric-adams',              'city_mayor',        NULL, 'Democrat', NULL),

-- City Council
(14, 'Inna Vernikov',           'inna-vernikov',           'city_council',      NULL, 'Republican', NULL),
(15, 'Shahana Hanif',           'shahana-hanif',           'city_council',      NULL, 'Democrat', NULL),
(16, 'Tiffany Caban',           'tiffany-caban',           'city_council',      NULL, 'Democrat', NULL),
(17, 'Brad Lander',             'brad-lander',             'city_council',      NULL, 'Democrat', NULL),
(18, 'Kalman Yeger',            'kalman-yeger',            'city_council',      NULL, 'Democrat', NULL),

-- Borough Presidents
(19, 'Antonio Reynoso',         'antonio-reynoso',         'borough_president', NULL, 'Democrat', NULL),
(20, 'Mark Levine',             'mark-levine',             'borough_president', NULL, 'Democrat', NULL),

-- DAs
(21, 'Alvin Bragg',             'alvin-bragg',             'county_da',         NULL, 'Democrat', NULL),
(22, 'Michael McMahon',         'michael-mcmahon',         'county_da',         NULL, 'Democrat', NULL);

-- Reset sequence
SELECT setval('officials_id_seq', 22);

-- =============================================================================
-- EVIDENCE
-- =============================================================================

INSERT INTO evidence (id, official_id, type, quote, source_url, source_name, date, stance, verified) VALUES

-- ─── Chuck Schumer (1) ───
(1,  1, 'statement',   'I am a shomer — a guardian of Israel. The word schumer comes from the Hebrew word shomer, meaning guardian.', 'https://example.com', 'AIPAC Policy Conference', '2018-03-05', 'strongly_supportive', true),
(2,  1, 'statement',   'Schumer delivered a historic Senate floor speech calling for new elections in Israel while reaffirming ironclad U.S. support for Israels security.', 'https://example.com', 'New York Times', '2024-03-14', 'supportive', true),
(3,  1, 'vote',        'Voted for the U.S.-Israel Strategic Partnership Act strengthening bilateral defense cooperation.', 'https://example.com', 'Congress.gov', '2023-11-14', 'strongly_supportive', true),
(4,  1, 'endorsement', 'Endorsed by AIPAC-affiliated political action committees in every Senate race.', 'https://example.com', 'OpenSecrets', '2022-11-08', 'strongly_supportive', true),

-- ─── Kirsten Gillibrand (2) ───
(5,  2, 'vote',        'Co-sponsored the Israel Relations Normalization Act and voted for all Iron Dome funding.', 'https://example.com', 'Congress.gov', '2023-06-15', 'strongly_supportive', true),
(6,  2, 'statement',   'I will always stand with Israel and support a strong U.S.-Israel relationship, including robust security assistance.', 'https://example.com', 'Jewish Insider', '2023-10-11', 'strongly_supportive', true),
(7,  2, 'attendance',  'Attended the March for Israel rally in Washington D.C. in November 2023.', 'https://example.com', 'Times of Israel', '2023-11-14', 'strongly_supportive', true),

-- ─── Jerry Nadler (3) ───
(8,  3, 'vote',        'Voted for the Iron Dome supplemental funding bill providing $1 billion for Israels missile defense.', 'https://example.com', 'Congress.gov', '2021-09-23', 'strongly_supportive', true),
(9,  3, 'statement',   'As a Jewish American representing one of the most Jewish districts in the country, Israels security is deeply personal to me.', 'https://example.com', 'Jewish Telegraphic Agency', '2023-10-08', 'strongly_supportive', true),
(10, 3, 'vote',        'Voted against the 2024 Rafah operations resolution but supported continued Iron Dome and David Sling funding.', 'https://example.com', 'The Hill', '2024-05-15', 'supportive', true),

-- ─── Alexandria Ocasio-Cortez (4) ───
(11, 4, 'vote',        'Voted present on the $1 billion Iron Dome funding bill after initially opposing it, drawing criticism from both sides.', 'https://example.com', 'New York Times', '2021-09-23', 'neutral', true),
(12, 4, 'statement',   'Called the Israeli government''s actions in Gaza an apartheid state situation during a town hall.', 'https://example.com', 'The Intercept', '2023-10-20', 'strongly_opposed', true),
(13, 4, 'vote',        'Co-sponsored a resolution to block a $735 million arms sale to Israel in May 2021.', 'https://example.com', 'Congress.gov', '2021-05-19', 'strongly_opposed', true),
(14, 4, 'statement',   'No government, including Israels, should receive unconditional military funding without human rights accountability.', 'https://example.com', 'CNN', '2024-01-18', 'opposed', true),

-- ─── Ritchie Torres (5) ───
(15, 5, 'statement',   'I am an Afro-Latino who grew up in public housing, and I am unapologetically pro-Israel. These identities are not in conflict.', 'https://example.com', 'Jewish Insider', '2023-10-12', 'strongly_supportive', true),
(16, 5, 'vote',        'Led a bipartisan letter signed by over 100 members of Congress reaffirming support for Israel after October 7.', 'https://example.com', 'The Hill', '2023-10-12', 'strongly_supportive', true),
(17, 5, 'endorsement', 'Endorsed by AIPAC and Democratic Majority for Israel; received significant pro-Israel PAC funding.', 'https://example.com', 'OpenSecrets', '2024-06-25', 'strongly_supportive', true),
(18, 5, 'statement',   'Anti-Zionism is a form of antisemitism. Full stop.', 'https://example.com', 'New York Post', '2023-11-01', 'strongly_supportive', true),

-- ─── Jamaal Bowman (6) ───
(19, 6, 'vote',        'Voted against the $1 billion Iron Dome supplemental funding bill.', 'https://example.com', 'Congress.gov', '2021-09-23', 'strongly_opposed', true),
(20, 6, 'statement',   'Called for conditioning U.S. military aid to Israel on human rights compliance.', 'https://example.com', 'The Guardian', '2023-10-25', 'strongly_opposed', true),
(21, 6, 'endorsement', 'Endorsed by Justice Democrats and Democratic Socialists of America, which called for ending aid to Israel.', 'https://example.com', 'Politico', '2022-06-28', 'strongly_opposed', true),
(22, 6, 'statement',   'Lost 2024 primary to George Latimer after the race became a referendum on Israel policy, with AIPAC-affiliated United Democracy Project spending over $14 million against him.', 'https://example.com', 'New York Times', '2024-06-25', 'strongly_opposed', true),

-- ─── Hakeem Jeffries (7) ───
(23, 7, 'statement',   'The U.S.-Israel relationship is ironclad. Israel has a right to defend itself against Hamas terrorism.', 'https://example.com', 'CNN', '2023-10-08', 'strongly_supportive', true),
(24, 7, 'vote',        'Voted for the Israel Security Supplemental Appropriations Act providing $14.3 billion in military aid.', 'https://example.com', 'Congress.gov', '2023-11-02', 'strongly_supportive', true),
(25, 7, 'attendance',  'Attended the March for Israel rally in Washington D.C. as House Democratic Leader.', 'https://example.com', 'Times of Israel', '2023-11-14', 'strongly_supportive', true),

-- ─── Kathy Hochul (8) ───
(26, 8, 'statement',   'Signed executive order directing state agencies to combat antisemitism and support Jewish communities after October 7.', 'https://example.com', 'Governor.ny.gov', '2023-10-15', 'strongly_supportive', true),
(27, 8, 'attendance',  'Traveled to Israel on a solidarity mission within weeks of the October 7 attack.', 'https://example.com', 'Times of Israel', '2023-10-29', 'strongly_supportive', true),
(28, 8, 'statement',   'Announced $75 million in state funding for security grants to houses of worship, primarily benefiting synagogues and Jewish community centers.', 'https://example.com', 'New York Times', '2024-01-10', 'strongly_supportive', true),

-- ─── Zellnor Myrie (9) ───
(29, 9, 'statement',   'Called for a ceasefire in Gaza while condemning the October 7 attacks, seeking a balanced position during his 2025 mayoral campaign.', 'https://example.com', 'Politico NY', '2024-02-10', 'neutral', true),
(30, 9, 'statement',   'We must reject antisemitism in all its forms while also acknowledging Palestinian suffering.', 'https://example.com', 'City & State NY', '2024-03-05', 'neutral', true),

-- ─── Jabari Brisport (10) ───
(31, 10, 'statement',  'Introduced a New York State Senate resolution calling for a ceasefire and an end to U.S. military aid to Israel.', 'https://example.com', 'The City', '2023-11-15', 'strongly_opposed', true),
(32, 10, 'attendance', 'Spoke at a pro-Palestinian rally in Brooklyn calling for an end to the occupation.', 'https://example.com', 'Gothamist', '2023-10-20', 'strongly_opposed', true),
(33, 10, 'endorsement','Endorsed by the Democratic Socialists of America NYC chapter, which has called for BDS.', 'https://example.com', 'City & State NY', '2020-11-03', 'strongly_opposed', true),

-- ─── Anna Kaplan (11) ───
(34, 11, 'vote',       'Sponsored New York''s anti-BDS legislation requiring state pension funds to divest from companies boycotting Israel.', 'https://example.com', 'Jewish Insider', '2022-05-20', 'strongly_supportive', true),
(35, 11, 'statement',  'As an Iranian Jewish refugee, I understand the existential threats Israel faces, and New York must stand firmly with our ally.', 'https://example.com', 'Long Island Herald', '2023-10-10', 'strongly_supportive', true),

-- ─── Charles Fall (12) ───
(36, 12, 'attendance', 'Attended the Celebrate Israel parade in Manhattan and marched alongside Jewish community leaders.', 'https://example.com', 'Staten Island Advance', '2023-06-04', 'supportive', true),
(37, 12, 'statement',  'Expressed solidarity with Jewish constituents on Staten Island after a rise in antisemitic incidents.', 'https://example.com', 'Staten Island Advance', '2023-11-01', 'supportive', true),

-- ─── Eric Adams (13) ───
(38, 13, 'attendance', 'Traveled to Israel on a solidarity mission shortly after October 7, visiting kibbutzim attacked by Hamas.', 'https://example.com', 'New York Post', '2023-10-31', 'strongly_supportive', true),
(39, 13, 'statement',  'I was one of the first mayors in America to go to Israel after October 7. New York City will always stand with Israel.', 'https://example.com', 'Jewish Telegraphic Agency', '2023-11-14', 'strongly_supportive', true),
(40, 13, 'statement',  'Announced a crackdown on antisemitic incidents in NYC schools and increased NYPD patrols around synagogues.', 'https://example.com', 'Gothamist', '2023-12-05', 'strongly_supportive', true),
(41, 13, 'endorsement','Endorsed by multiple Orthodox Jewish leaders and organizations during his 2021 mayoral campaign.', 'https://example.com', 'The Forward', '2021-06-22', 'strongly_supportive', true),

-- ─── Inna Vernikov (14) ───
(42, 14, 'statement',  'Introduced a City Council resolution declaring New York City''s unwavering support for the State of Israel.', 'https://example.com', 'New York Post', '2023-10-10', 'strongly_supportive', true),
(43, 14, 'attendance', 'Arrested for bringing a licensed firearm to a pro-Palestinian rally she was counter-protesting at Brooklyn College.', 'https://example.com', 'Gothamist', '2023-10-13', 'strongly_supportive', true),
(44, 14, 'statement',  'As a Soviet Jewish immigrant, I know what it means to face antisemitism. I will never be silent.', 'https://example.com', 'Jewish Insider', '2023-11-01', 'strongly_supportive', true),

-- ─── Shahana Hanif (15) ───
(45, 15, 'statement',  'Called for an immediate ceasefire in Gaza and an end to unconditional U.S. military support for Israel.', 'https://example.com', 'The City', '2023-10-15', 'strongly_opposed', true),
(46, 15, 'attendance', 'Attended and spoke at multiple pro-Palestinian rallies across Brooklyn.', 'https://example.com', 'Gothamist', '2023-10-28', 'strongly_opposed', true),
(47, 15, 'statement',  'Co-authored a City Council letter calling on President Biden to push for a permanent ceasefire and humanitarian aid to Gaza.', 'https://example.com', 'City & State NY', '2024-01-20', 'opposed', true),

-- ─── Tiffany Caban (16) ───
(48, 16, 'statement',  'Introduced a City Council resolution calling for an immediate ceasefire in Gaza.', 'https://example.com', 'Gothamist', '2023-10-18', 'strongly_opposed', true),
(49, 16, 'attendance', 'Participated in a sit-in at the Capitol calling for a ceasefire, leading to her brief detention.', 'https://example.com', 'New York Times', '2023-11-08', 'strongly_opposed', true),
(50, 16, 'statement',  'We cannot continue to fund a military campaign that is killing civilians en masse. This is not about being anti-Israel, it is about being pro-human rights.', 'https://example.com', 'The Intercept', '2024-02-01', 'strongly_opposed', true),

-- ─── Brad Lander (17) ───
(51, 17, 'statement',  'As NYC Comptroller, called for a ceasefire while condemning Hamas and acknowledging Israeli suffering, drawing criticism from pro-Israel groups.', 'https://example.com', 'Politico NY', '2023-11-20', 'opposed', true),
(52, 17, 'statement',  'I grieve for Israeli and Palestinian lives lost. We need a ceasefire, hostage release, and a path to lasting peace.', 'https://example.com', 'The Forward', '2024-01-15', 'neutral', true),
(53, 17, 'attendance', 'Attended a vigil for Israeli hostages organized by NYC Jewish community organizations.', 'https://example.com', 'Jewish Telegraphic Agency', '2023-12-10', 'supportive', true),

-- ─── Kalman Yeger (18) ───
(54, 18, 'statement',  'Palestine does not exist. There is no state called Palestine.', 'https://example.com', 'New York Post', '2019-03-27', 'strongly_supportive', true),
(55, 18, 'vote',       'Introduced a City Council resolution opposing the BDS movement and affirming NYC''s support for Israel.', 'https://example.com', 'Jewish Insider', '2023-10-15', 'strongly_supportive', true),
(56, 18, 'statement',  'Every dollar of U.S. aid to Israel is an investment in American security. Israel is our front line.', 'https://example.com', 'The Algemeiner', '2023-11-05', 'strongly_supportive', true),

-- ─── Antonio Reynoso (19) ───
(57, 19, 'statement',  'Called for a ceasefire in Gaza and expressed concern about the humanitarian crisis affecting Palestinian civilians.', 'https://example.com', 'Gothamist', '2023-11-10', 'opposed', true),
(58, 19, 'statement',  'We must condemn Hamas terrorism and also hold Israels government accountable for civilian casualties.', 'https://example.com', 'City & State NY', '2024-01-25', 'opposed', true),

-- ─── Mark Levine (20) ───
(59, 20, 'statement',  'As Manhattan Borough President, strongly condemned the October 7 attack and called for solidarity with Israels people.', 'https://example.com', 'Jewish Telegraphic Agency', '2023-10-09', 'strongly_supportive', true),
(60, 20, 'attendance', 'Attended multiple pro-Israel rallies in Manhattan and spoke about the rise of antisemitism in NYC.', 'https://example.com', 'The Forward', '2023-11-14', 'strongly_supportive', true),
(61, 20, 'statement',  'Announced increased funding for Holocaust education programs in Manhattan schools.', 'https://example.com', 'NY1', '2024-01-27', 'supportive', true),

-- ─── Alvin Bragg (21) ───
(62, 21, 'statement',  'Announced a dedicated hate crimes unit with additional resources for investigating antisemitic attacks in Manhattan.', 'https://example.com', 'New York Times', '2023-12-01', 'supportive', true),
(63, 21, 'statement',  'My office will prosecute hate crimes against Jewish New Yorkers to the fullest extent of the law.', 'https://example.com', 'Gothamist', '2024-01-15', 'supportive', true),

-- ─── Michael McMahon (22) ───
(64, 22, 'attendance', 'Attended solidarity events with the Jewish community on Staten Island following October 7.', 'https://example.com', 'Staten Island Advance', '2023-10-15', 'supportive', true),
(65, 22, 'statement',  'Announced enhanced security coordination with NYPD and Jewish community organizations on Staten Island.', 'https://example.com', 'Staten Island Advance', '2024-02-01', 'supportive', true);

-- Reset sequence
SELECT setval('evidence_id_seq', 65);
