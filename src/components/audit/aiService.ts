import type { AuditResult } from './types'

// ─── API Keys ─────────────────────────────────────────────────────────────────
const GROQ_KEY_1 = import.meta.env.VITE_GROK_API_KEY1
const GROQ_KEY_2 = import.meta.env.VITE_GROK_API_KEY2

type AuditPayload = Omit<AuditResult, 'id' | 'date' | 'fileName' | 'originalCode'>

// ─── Prompt ───────────────────────────────────────────────────────────────────
function buildPrompt(code: string): string {
  return (
    'You are an expert web accessibility auditor. Analyze this HTML/React/JSX code for WCAG 2.1 issues.\n\n' +
    'Return ONLY a valid JSON object. No markdown, no backticks, no explanation. Just raw JSON.\n\n' +
    'Use exactly this structure:\n' +
    '{\n' +
    '  "score": 25,\n' +
    '  "fixedCode": "<div>\\n  <img src=\\"x\\" alt=\\"Banner\\">\\n</div>",\n' +
    '  "categories": {\n' +
    '    "semantic": 40,\n' +
    '    "images": 20,\n' +
    '    "forms": 30,\n' +
    '    "keyboard": 50,\n' +
    '    "aria": 10,\n' +
    '    "contrast": 60\n' +
    '  },\n' +
    '  "issues": [\n' +
    '    {\n' +
    '      "id": "issue-1",\n' +
    '      "type": "critical",\n' +
    '      "title": "Missing alt text",\n' +
    '      "description": "img element missing alt attribute",\n' +
    '      "element": "<img src=\\"x\\">",\n' +
    '      "line": 2,\n' +
    '      "fix": "Add alt attribute",\n' +
    '      "wcag": "WCAG 2.1 - 1.1.1 Non-text Content"\n' +
    '    }\n' +
    '  ]\n' +
    '}\n\n' +
    'IMPORTANT RULES:\n' +
    '- score must be a NUMBER (e.g. 25), NOT a word\n' +
    '- All category values must be NUMBERS\n' +
    '- fixedCode must be complete corrected HTML with proper indentation\n' +
    '- issues: minimum 5, mix of critical/warning/good\n' +
    '- good type = things already correctly implemented\n' +
    '- Specific WCAG criteria required\n\n' +
    'Code to analyze:\n' +
    code
  )
}

// ─── Response Parser ──────────────────────────────────────────────────────────
function parseResponse(raw: string): AuditPayload {
  const cleaned = raw
    .replace(/^```json\s*/im, '')
    .replace(/^```\s*/im, '')
    .replace(/\s*```$/im, '')
    .trim()
  return JSON.parse(cleaned)
}

// ─── Code Formatter ───────────────────────────────────────────────────────────
export function formatFixedCode(code: string): string {
  if (!code) return ''

  let result = code
    .replace(/\\n/g, '\n')
    .replace(/\\t/g, '  ')
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, '\\')
    .trim()

  if (!result.includes('\n')) {
    result = result.replace(/>\s*</g, '>\n<').trim()
  }

  const lines = result.split('\n')
  let indent = 0
  const selfClosing = /^<(input|img|br|hr|link|meta|area|base|col|embed|param|source|track|wbr)/i

  return lines
    .map((line) => {
      const t = line.trim()
      if (!t) return ''
      if (/^<\//.test(t)) indent = Math.max(0, indent - 1)
      const out = '  '.repeat(indent) + t
      if (/^<[^/!][^>]*[^/]>$/.test(t) && !selfClosing.test(t)) indent++
      return out
    })
    .filter(Boolean)
    .join('\n')
}

// ─── Groq API Call ────────────────────────────────────────────────────────────
async function callGroq(key: string, code: string): Promise<AuditPayload> {
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + key,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      temperature: 0.1,
      max_tokens: 4096,
      messages: [{ role: 'user', content: buildPrompt(code) }],
    }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.error?.message || 'Groq error ' + res.status)
  }

  const data = await res.json()
  const content = data.choices?.[0]?.message?.content || ''
  if (!content) throw new Error('Empty response from Groq')
  return parseResponse(content)
}

// ─── Main: Groq Key 1 → Groq Key 2 ──────────────────────────────────────────
export async function runAudit(code: string): Promise<AuditPayload> {
  const keys = [GROQ_KEY_1, GROQ_KEY_2].filter(Boolean)

  if (keys.length === 0) {
    throw new Error('No Groq API keys found. Add VITE_GROK_API_KEY and VITE_GROK_API_KEY2 to .env')
  }

  for (let i = 0; i < keys.length; i++) {
    try {
      console.log('🚀 Groq key ' + (i + 1) + ' trying...')
      const result = await callGroq(keys[i], code)
      console.log('✅ Groq key ' + (i + 1) + ' success!')
      return result
    } catch (err) {
      console.warn('⚠️ Groq key ' + (i + 1) + ' failed:', err)
      if (i < keys.length - 1) {
        console.log('🔄 Switching to Groq key ' + (i + 2) + '...')
      }
    }
  }

  throw new Error('Both Groq keys failed. Please wait a minute and try again.')
}

// Backward compat — purane imports bhi kaam karein
export const runGeminiAudit = runAudit