import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Middleware to set Cache-Control headers for .css files based on the referer
app.use((req, res, next) => {
  if (req.path.endsWith('.css')) {
    const referer = req.get('referer');
    if (referer) {
      if (referer.includes('with-no-cache.html')) {
        res.setHeader('Cache-Control', 'no-cache');
      } else if (referer.includes('with-no-store.html')) {
        res.setHeader('Cache-Control', 'no-store');
    } else if (referer.includes('with-max-age-0.html')) {
        res.setHeader('Cache-Control', 'private, max-age=0');
      } else {
        res.setHeader('Cache-Control', 'private, max-age=0');
      }
    } else {
      res.setHeader('Cache-Control', 'private, max-age=0');
    }
  }
  next();
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});