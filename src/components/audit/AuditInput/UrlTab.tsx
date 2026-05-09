import { Info } from "lucide-react";

interface UrlTabProps {
  url: string;
  onChange: (val: string) => void;
}

const UrlTab = ({ url, onChange }: UrlTabProps) => {
  return (
    <div className="h-80 flex flex-col justify-center gap-4 p-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Website URL
        </label>
        <input
          type="url"
          value={url}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://example.com"
          className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white"
        />
      </div>
      <div className="rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 flex gap-2">
        <Info className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-amber-700 dark:text-amber-300">
          URL fetching requires a backend proxy due to CORS. Paste the page
          source manually for now.
        </p>
      </div>
    </div>
  );
};

export default UrlTab;
