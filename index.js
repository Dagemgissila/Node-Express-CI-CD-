const express = require('express');
const app = express();

app.use(express.json());

// ─── Simple health check ───
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

// ─── Greeting endpoint ───
app.get('/greet', (req, res) => {
  const name = req.query.name || 'Guest';
  res.json({ message: `Hello ${name}! Welcome to CI/CD practice.` });
});

// ─── Simple calculator endpoint (for testing) ───
app.post('/add', (req, res) => {
  const { a, b } = req.body;
  
  if (typeof a !== 'number' || typeof b !== 'number') {
    return res.status(400).json({ error: 'Both a and b must be numbers' });
  }
  
  const result = a + b;
  res.json({ result });
});

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;   // important for testing!