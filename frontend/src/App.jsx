import React, { useState } from 'react';
import axios from 'axios';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-javascript';
import { Copy, Zap, Code2, TestTube } from 'lucide-react';

const API_BASE = 'http://localhost:5000/api';

export default function App() {
  const [description, setDescription] = useState('');
  const [language, setLanguage] = useState('Python');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(null);

  const handleGenerate = async (e) => {
    e.preventDefault();

    if (!description.trim()) {
      alert('Please enter a code description');
      return;
    }

    try {
      setLoading(true);
      setResult(null);
      const res = await axios.post(`${API_BASE}/generate`, {
        description,
        language
      });
      setResult(res.data);
    } catch (err) {
      alert('Error: ' + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const highlightCode = (code, lang) => {
    try {
      const langMap = {
        Python: 'python',
        JavaScript: 'javascript',
        JS: 'javascript'
      };
      const prismLang = langMap[lang] || 'javascript';
      return Prism.highlight(code, Prism.languages[prismLang], prismLang);
    } catch (e) {
      return code;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 text-slate-100">
      {/* Header */}
      <div className="bg-slate-900/80 backdrop-blur-md border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-8 h-8 text-yellow-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              AI Code Generator
            </h1>
          </div>
          <p className="text-slate-400">Describe what you want. AI generates production-ready code with tests.</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800 p-8 rounded-lg border border-slate-700 sticky top-24">
              <h2 className="text-2xl font-bold mb-6 text-blue-400">✨ Generate Code</h2>

              <form onSubmit={handleGenerate} className="space-y-4">
                {/* Language Selection */}
                <div>
                  <label className="block text-sm font-medium mb-2">Language</label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option>Python</option>
                    <option>JavaScript</option>
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium mb-2">What do you want to code?</label>
                  <textarea
                    placeholder="e.g., Create a function that checks if a number is prime..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="6"
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none resize-none"
                  />
                </div>

                {/* Generate Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-bold hover:shadow-lg disabled:opacity-50 transition-all"
                >
                  {loading ? '⏳ Generating... (this takes ~4-5 mins, please wait!)' : '🚀 Generate Code'}
                </button>
              </form>

              {result && (
                <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <p className="text-green-400 font-medium">✅ Code generated successfully!</p>
                </div>
              )}
            </div>
          </div>

          {/* Results Section */}
          {result && (
            <div className="lg:col-span-2 space-y-6">
              {/* Generated Code */}
              <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
                <div className="bg-slate-900 px-6 py-4 border-b border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-blue-400" />
                    <h3 className="text-xl font-bold">Generated Code</h3>
                  </div>
                  <button
                    onClick={() => copyToClipboard(result.code, 'code')}
                    className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded hover:bg-blue-500/30 transition-colors flex items-center gap-1"
                  >
                    <Copy className="w-4 h-4" />
                    {copied === 'code' ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <pre className="p-6 overflow-x-auto max-h-96">
                  <code
                    className="language-python"
                    dangerouslySetInnerHTML={{
                      __html: highlightCode(result.code, result.language)
                    }}
                  />
                </pre>
              </div>

              {/* Generated Tests */}
              <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
                <div className="bg-slate-900 px-6 py-4 border-b border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TestTube className="w-5 h-5 text-green-400" />
                    <h3 className="text-xl font-bold">Test Cases</h3>
                  </div>
                  <button
                    onClick={() => copyToClipboard(result.tests, 'tests')}
                    className="px-3 py-1 bg-green-500/20 text-green-300 rounded hover:bg-green-500/30 transition-colors flex items-center gap-1"
                  >
                    <Copy className="w-4 h-4" />
                    {copied === 'tests' ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <pre className="p-6 overflow-x-auto max-h-96">
                  <code
                    className="language-python"
                    dangerouslySetInnerHTML={{
                      __html: highlightCode(result.tests, result.language)
                    }}
                  />
                </pre>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!result && !loading && (
            <div className="lg:col-span-2 flex items-center justify-center min-h-96">
              <div className="text-center">
                <Code2 className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400 text-lg">
                  Describe your code requirement and AI will generate production-ready code with tests
                </p>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="lg:col-span-2 flex items-center justify-center min-h-96">
              <div className="text-center">
                <div className="inline-block">
                  <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mb-4"></div>
                </div>
                <p className="text-slate-300 text-lg font-medium">Generating your code...</p>
                <p className="text-slate-500 mt-2">This typically takes 4-5 minutes. Please be patient!</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-700 mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500">
          <p>⚡ AI Code Generator | Powered by Ollama + Mistral</p>
        </div>
      </footer>
    </div>
  );
}
