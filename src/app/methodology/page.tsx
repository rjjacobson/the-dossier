import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Methodology | The Dossier',
  description: 'How we evaluate elected officials on Israel and Jewish issues.',
};

export default function MethodologyPage() {
  return (
    <div className="max-w-[720px] mx-auto px-4 py-8">
      <h1 className="text-[28px] font-bold text-gray-900 mb-6">Methodology</h1>

      <div className="prose prose-sm prose-gray max-w-none space-y-6">
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Editorial Lens</h2>
          <p className="text-[15px] text-gray-600 leading-relaxed">
            This tracker evaluates elected officials&apos; positions on Israel and Jewish community
            issues from a pro-Israel, pro-Jewish perspective. We believe transparency about where
            officials stand on these issues serves the public interest.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">What Counts as Evidence</h2>
          <ul className="text-[15px] text-gray-600 space-y-1 list-disc pl-5">
            <li><strong>Votes</strong> on legislation related to Israel, antisemitism, BDS, or Jewish community interests</li>
            <li><strong>Public statements</strong> with verifiable source (news articles, press releases, social media posts)</li>
            <li><strong>Endorsements</strong> from or of organizations with clear positions on Israel/Jewish issues</li>
            <li><strong>Event attendance</strong> at Jewish community events, pro-Israel rallies, or related gatherings</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Scoring</h2>
          <p className="text-[15px] text-gray-600 leading-relaxed mb-2">
            Each verified evidence item is scored on a scale from -2 to +2:
          </p>
          <ul className="text-[15px] text-gray-600 space-y-1 list-disc pl-5">
            <li><strong>+2</strong> Strongly supportive (e.g., sponsoring pro-Israel legislation)</li>
            <li><strong>+1</strong> Supportive (e.g., attending Jewish community events)</li>
            <li><strong>0</strong> Neutral (e.g., balanced public statements)</li>
            <li><strong>-1</strong> Opposed (e.g., voting against antisemitism measures)</li>
            <li><strong>-2</strong> Strongly opposed (e.g., sponsoring BDS resolutions)</li>
          </ul>
          <p className="text-[15px] text-gray-600 leading-relaxed mt-2">
            The grade is the simple average of all verified evidence scores, mapped to letter grades:
            A (1.5+), B (0.75+), C (-0.25+), D (-1.0+), F (below -1.0).
            Officials with fewer than 2 verified evidence items are marked N/R (Not Yet Rated).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Verification</h2>
          <p className="text-[15px] text-gray-600 leading-relaxed">
            Every evidence item must include a direct source URL. For statements attributed to
            officials, we require at least one independent corroboration (a second news source,
            video evidence, or official record). Only verified evidence is displayed and affects
            grades.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Corrections &amp; Disputes</h2>
          <p className="text-[15px] text-gray-600 leading-relaxed">
            If you believe any evidence item is inaccurate, missing context, or improperly scored,
            please contact us. We take accuracy seriously and will review all disputes promptly.
          </p>
        </section>
      </div>
    </div>
  );
}
