// For skinrave-proxy /api/proxy.js
module.exports = async (req, res) => {
  try {
    const { skip, take, order, from, to } = req.query;
    const token = '1af8f105-cc07-4168-b092-6dcd8a47838e'; // Hardcoded
    const apiUrl = `https://api.skinrave.gg/affiliates/public/applicants?token=${token}&skip=${skip}&take=${take}&order=${order}&from=${from}&to=${to}`;
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      res.status(response.status).json({ error: `API error: ${response.statusText}` });
      return;
    }
    const data = await response.json();
    // Add CORS headers
    res.setHeader('Access-Control-Allow-Origin', 'https://yosoykush.fun');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: `Proxy error: ${error.message}` });
  }
};
