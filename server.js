import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const distPath = path.join(__dirname, 'dist');

// Health check endpoint for Cloud Run
app.get('/healthz', (req, res) => {
  res.status(200).send('OK');
});

// Serve static assets from Vite build output if exists
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
}

// SPA fallback: any request that does not match a static file serves index.html
app.get('*', (req, res) => {
  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(200).send('<!doctype html><html><body><h1>Application Loading...</h1><script>setTimeout(() => location.reload(), 2000);</script></body></html>');
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Application server running on http://0.0.0.0:${PORT}`);
});
