const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const { skip, take, order, from, to } = req.query;
  const token = '1af8f105-cc07-4168-b092-6dcd8a47838e';

  const apiUrl = `https://api.skinrave.gg/affiliates/public/applicants?token=${token}&skip=${skip}&take=${take}&order=${order}&from=${from}&to=${to}`;

  // Always set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Failed to fetch SkinRave data', details: error.message });
  }
};
