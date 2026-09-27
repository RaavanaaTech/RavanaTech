import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import {
  RECEPTIONIST_SYSTEM_INSTRUCTION,
  generateHeuristicProposal,
  type AIProposalResponse
} from './src/lib/geminiKnowledgeBase.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getPort(): number {
  const portArgIdx = process.argv.indexOf('--port');
  if (portArgIdx !== -1 && process.argv[portArgIdx + 1]) {
    const val = Number(process.argv[portArgIdx + 1]);
    if (!isNaN(val)) return val;
  }
  const pArgIdx = process.argv.indexOf('-p');
  if (pArgIdx !== -1 && process.argv[pArgIdx + 1]) {
    const val = Number(process.argv[pArgIdx + 1]);
    if (!isNaN(val)) return val;
  }
  return Number(process.env.PORT) || 3000;
}

function getHost(): string {
  const hostArgIdx = process.argv.indexOf('--host');
  if (hostArgIdx !== -1 && process.argv[hostArgIdx + 1]) {
    return process.argv[hostArgIdx + 1];
  }
  return process.env.HOST || '0.0.0.0';
}

async function startServer() {
  const app = express();
  const PORT = getPort();
  const HOST = getHost();

  app.use(express.json());

  // Initialize server-side Gemini client
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }

  // AI Proposal generation endpoint
  app.post('/api/ai/proposal', async (req, res) => {
    try {
      const { prompt, language = 'en', region = 'lk' } = req.body;

      if (!prompt || typeof prompt !== 'string') {
        res.status(400).json({ error: 'Prompt is required' });
        return;
      }

      // If Gemini client is initialized, call gemini-3.8-flash
      if (ai) {
        try {
          const contents = `User business requirement/inquiry: "${prompt.trim()}". User selected language: "${language}". User geographical region: "${region}". Generate a high-conversion, professional proposal according to the System Instructions. Return JSON only.`;

          const response = await ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents,
            config: {
              systemInstruction: RECEPTIONIST_SYSTEM_INSTRUCTION,
              responseMimeType: 'application/json',
            },
          });

          const responseText = response.text?.trim() || '';
          if (responseText) {
            try {
              const parsed = JSON.parse(responseText) as AIProposalResponse;
              res.json({
                success: true,
                proposal: parsed,
                source: 'gemini-3.8-flash'
              });
              return;
            } catch (jsonErr) {
              console.warn('Failed to parse Gemini JSON output, falling back to rule engine', jsonErr);
            }
          }
        } catch (apiErr: any) {
          console.warn('Gemini API call warning, using resilient fallback:', apiErr?.message || apiErr);
        }
      }

      // Resilient fallback rule engine
      const fallbackProposal = generateHeuristicProposal(
        prompt,
        language === 'si' ? 'si' : 'en',
        region === 'global' ? 'global' : 'lk'
      );

      res.json({
        success: true,
        proposal: fallbackProposal,
        source: 'resilient-engine'
      });
    } catch (err: any) {
      console.error('Server proposal error:', err);
      res.status(500).json({
        error: 'Failed to generate proposal',
        message: err?.message || 'Internal server error'
      });
    }
  });

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Vite middleware in dev or static files in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, HOST, () => {
    console.log(`Server listening on http://${HOST}:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
