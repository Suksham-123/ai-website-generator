const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const archiver = require('archiver');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const templateMap = {
  'landing': 'landing.html',
  'portfolio': 'portfolio.html',
  'blog': 'blog.html',
};

// Serve static files
app.use('/static', express.static(path.join(__dirname, 'templates')));

// =======================================
// Utility: Classify prompt (supports Hindi + English)
// =======================================
function classifyPrompt(prompt) {
  const input = prompt.toLowerCase();

  const landingKeywords = ['business', 'landing', 'company', 'startup', 'brand', 'लैंडिंग', 'स्टार्टअप'];
  const portfolioKeywords = ['portfolio', 'developer', 'designer', 'resume', 'cv', 'प्रोफाइल', 'डिज़ाइन'];
  const blogKeywords = ['blog', 'article', 'news', 'post', 'ब्लॉग', 'लेख', 'समाचार'];

  if (landingKeywords.some(word => input.includes(word))) return 'landing';
  if (portfolioKeywords.some(word => input.includes(word))) return 'portfolio';
  if (blogKeywords.some(word => input.includes(word))) return 'blog';

  return 'landing'; // default fallback
}

// =======================================
// Prompt-based Custom Template Endpoint
// =======================================
app.post('/api/generate-custom', (req, res) => {
  const { prompt } = req.body;

  const type = classifyPrompt(prompt);
  const fileName = templateMap[type];

  if (!fileName) return res.status(404).json({ error: 'Template not found' });

  const filePath = path.join(__dirname, 'templates', fileName);
  fs.readFile(filePath, 'utf-8', (err, html) => {
    if (err) return res.status(500).json({ error: 'Failed to load template' });
    res.send(html);
  });
});

// =======================================
// Download as ZIP
// =======================================
app.post('/api/download-custom', (req, res) => {
  const { type, html = '', css = '', js = '' } = req.body;

  const tempDir = path.join(__dirname, 'temp', Date.now().toString());
  fs.mkdirSync(tempDir, { recursive: true });

  fs.writeFileSync(path.join(tempDir, 'index.html'), html, 'utf-8');
  fs.writeFileSync(path.join(tempDir, 'style.css'), css, 'utf-8');
  fs.writeFileSync(path.join(tempDir, 'script.js'), js, 'utf-8');

  res.setHeader('Content-Disposition', `attachment; filename=${type}.zip`);
  res.setHeader('Content-Type', 'application/zip');

  const archive = archiver('zip', { zlib: { level: 9 } });
  archive.on('error', err => res.status(500).json({ error: 'Archive error' }));
  archive.pipe(res);

  archive.file(path.join(tempDir, 'index.html'), { name: 'index.html' });
  archive.file(path.join(tempDir, 'style.css'), { name: 'style.css' });
  archive.file(path.join(tempDir, 'script.js'), { name: 'script.js' });

  archive.finalize().then(() => {
    setTimeout(() => {
      fs.rm(tempDir, { recursive: true, force: true }, () => {});
    }, 10000);
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
