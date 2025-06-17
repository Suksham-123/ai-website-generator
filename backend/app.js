const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const templatesDir = path.join(__dirname, 'templates');
const validTemplates = ['blog', 'landing', 'portfolio'];  // only allowed templates

app.post('/generate-template', (req, res) => {
  const { template } = req.body;

  if (!validTemplates.includes(template)) {
    return res.status(400).json({ error: 'Invalid template selected.' });
  }

  const filePath = path.join(templatesDir, `${template}.html`);

  fs.readFile(filePath, 'utf8', (err, html) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading template file.' });
    }
    res.json({ html });
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
