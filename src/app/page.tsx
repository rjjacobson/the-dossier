import { AddressInput } from '@/components/AddressInput';

export default function Home() {
  return (
    <div className="max-w-[720px] mx-auto px-4">
      <div className="text-center py-16 sm:py-24">
        <h1 className="text-[28px] font-bold text-gray-900 mb-2">
          Know Your Representatives
        </h1>
        <p className="text-[15px] text-gray-500 max-w-md mx-auto mb-8 leading-relaxed">
          Track where every New York elected official stands on Israel and Jewish issues.
          From your school board to the US Senate.
        </p>
        <AddressInput />
      </div>

      <div className="border-t border-gray-100 pt-5 pb-12">
        <h3 className="text-[13px] font-semibold text-gray-500 mb-3">
          Recent Activity
        </h3>
        <div className="space-y-0">
          <ActivityItem
            severity="red"
            text="City Council Member voted against Holocaust education funding amendment"
            date="Sample data"
          />
          <ActivityItem
            severity="yellow"
            text="State Senator co-sponsored BDS resolution in Albany"
            date="Sample data"
          />
          <ActivityItem
            severity="green"
            text="Assembly Member co-sponsored anti-hate crimes legislation"
            date="Sample data"
          />
        </div>
        <p className="text-[11px] text-gray-400 mt-3 italic">
          Activity shown is sample data. Connect to Supabase to see real entries.
        </p>
      </div>
    </div>
  );
}

function ActivityItem({ severity, text, date }: { severity: 'red' | 'yellow' | 'green'; text: string; date: string }) {
  const dotColor = {
    red: 'bg-red-500',
    yellow: 'bg-amber-500',
    green: 'bg-green-500',
  }[severity];

  return (
    <div className="flex items-start gap-2.5 py-2.5 border-b border-gray-50 last:border-0">
      <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${dotColor}`} />
      <div>
        <div className="text-[13px] text-gray-700 leading-snug">{text}</div>
        <div className="text-[11px] text-gray-400 mt-0.5">{date}</div>
      </div>
    </div>
  );
}
