const fetch = require('node-fetch'); // Vercel includes this by default, or add it via npm

module.exports = async (req, res) => {
  const { skip, take, order, from, to } = req.query; // Extract params from query string
  const token = '1af8f105-cc07-4168-b092-6dcd8a47838e'; // Hardcode your token (keep it secret in production!)

  const apiUrl = `https://api.skinrave.gg/affiliates/public/applicants?token=${token}&skip=${skip}&take=${take}&order=${order}&from=${from}&to=${to}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Add CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*'); // Or restrict to 'https://yosoykush.fun'
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    res.status(response.status).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Failed to fetch SkinRave data' });
  }
};
