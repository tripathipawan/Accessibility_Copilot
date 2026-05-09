import { useRef } from 'react'
import { Upload } from 'lucide-react'

interface UploadTabProps {
  code: string
  fileName: string
  onFileLoad: (code: string, fileName: string) => void
}

const UploadTab = ({ code, fileName, onFileLoad }: UploadTabProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => onFileLoad(ev.target?.result as string, file.name)
    reader.readAsText(file)
  }

  return (
    <div
      onClick={() => fileInputRef.current?.click()}
      className="h-80 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors p-8"
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".html,.htm,.jsx,.tsx,.js,.ts"
        onChange={handleFileChange}
        className="hidden"
      />
      <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center">
        <Upload className="w-7 h-7 text-blue-500" />
      </div>
      {code ? (
        <div className="text-center">
          <p className="font-medium text-gray-900 dark:text-white">{fileName}</p>
          <p className="text-sm text-green-500">{code.split('\n').length} lines loaded</p>
          <p className="text-xs text-gray-400 mt-1">Click to change file</p>
        </div>
      ) : (
        <div className="text-center">
          <p className="font-medium text-gray-700 dark:text-gray-300">Drop file or click to browse</p>
          <p className="text-sm text-gray-400">.html, .jsx, .tsx, .js files supported</p>
        </div>
      )}
    </div>
  )
}

export default UploadTab