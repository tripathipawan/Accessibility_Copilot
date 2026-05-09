import { X } from 'lucide-react'

interface PasteTabProps {
  code: string
  onChange: (val: string) => void
}

const PasteTab = ({ code, onChange }: PasteTabProps) => {
  return (
    <div className="relative">
      <textarea
        value={code}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`<!-- Paste your HTML or React/JSX code here -->\n<div>\n  <img src="logo.png" />\n  <button onclick="submit()">Submit</button>\n</div>`}
        className="w-full h-80 p-4 font-mono text-sm bg-transparent text-gray-800 dark:text-gray-200 resize-none outline-none placeholder-gray-400 dark:placeholder-gray-600"
        spellCheck={false}
      />
      {code && (
        <button
          onClick={() => onChange('')}
          className="absolute top-3 right-3 p-1 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-400"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  )
}

export default PasteTab