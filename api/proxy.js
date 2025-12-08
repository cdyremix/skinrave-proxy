const SKINRAVE_BASE = 'https://api.skinrave.gg/affiliates/public/applicants';
const TOKEN = '1af8f105-cc07-4168-b092-6dcd8a47838e'; // Hardcode your token here (rotate if needed)

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { skip, take, order, from, to } = req.query;
  if (!from || !to) {
    return res.status(400).json({ error: 'Missing from/to params' });
  }
  const apiUrl = `${SKINRAVE_BASE}?token=${TOKEN}&skip=${skip || 0}&take=${take || 10}&order=${order || 'DESC'}&from=${from}&to=${to}`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Content-Type', 'application/json');
    res.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Proxy failed', details: error.message });
  }
}
