// backend/index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const archiver = require('archiver');
require('dotenv').config();
const OpenAI = require('openai');

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://ai-website-generator.vercel.app', 
];

app.use(cors({
  origin: allowedOrigins,
}));

app.use(bodyParser.json());

// Map of template filenames
const templateMap = {
  landing: 'landing.html',
  portfolio: 'portfolio.html',
  blog: 'blog.html',
};

// Classify prompt into one of the three templates (supports English + Hindi)
function classifyPrompt(prompt) {
  const text = prompt.toLowerCase();
  const landingKeywords = ['landing','business','startup','ब्रांड','लैंडिंग'];
  const portfolioKeywords = ['portfolio','resume','प्रोफाइल','designer'];
  const blogKeywords = ['blog','article','ब्लॉग','news'];
  if (portfolioKeywords.some(k=>text.includes(k))) return 'portfolio';
  if (blogKeywords.some(k=>text.includes(k))) return 'blog';
  return 'landing';
}

// Serve static templates folder
app.use('/static', express.static(path.join(__dirname, 'templates')));

// 1) Custom template generation
app.post('/api/generate-custom', (req, res) => {
  const { prompt } = req.body;
  const type = classifyPrompt(prompt);
  const fileName = templateMap[type];
  const filePath = path.join(__dirname, 'templates', fileName);

  fs.readFile(filePath, 'utf-8', (err, html) => {
    if (err) return res.status(500).json({ error: 'Failed to load template' });
    res.send(html);
  });
});

// 2) Download edited site as ZIP
app.post('/api/download-custom', (req, res) => {
  const { html = '', css = '', js = '', type = 'website' } = req.body;
  const tempDir = path.join(__dirname, 'temp', Date.now().toString());
  fs.mkdirSync(tempDir, { recursive: true });

  fs.writeFileSync(path.join(tempDir, 'index.html'), html, 'utf-8');
  fs.writeFileSync(path.join(tempDir, 'style.css'), css, 'utf-8');
  fs.writeFileSync(path.join(tempDir, 'script.js'), js, 'utf-8');

  res.setHeader('Content-Disposition', `attachment; filename=${type}.zip`);
  res.setHeader('Content-Type', 'application/zip');

  const archive = archiver('zip');
  archive.pipe(res);
  archive.file(path.join(tempDir, 'index.html'), { name: 'index.html' });
  archive.file(path.join(tempDir, 'style.css'), { name: 'style.css' });
  archive.file(path.join(tempDir, 'script.js'), { name: 'script.js' });
  archive.finalize().then(() => {
    setTimeout(() => fs.rmSync(tempDir, { recursive: true, force: true }), 10000);
  });
});

// 3) OpenAI-powered generation (optional, if you set OPENAI_API_KEY)
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || '' });
app.post('/api/generate-openai', async (req, res) => {
  if (!openai.apiKey) return res.status(403).json({ error: 'API key not set' });
  const { prompt } = req.body;
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'Generate a full HTML5 + Tailwind CSS website.' },
        { role: 'user', content: prompt },
      ],
    });
    res.json({ code: completion.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: 'OpenAI failed', detail: err.message });
  }
});

app.listen(PORT, () => console.log(`✅ Backend listening on http://localhost:${PORT}`));
