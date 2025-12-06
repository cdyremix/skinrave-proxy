export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const query = new URLSearchParams(req.query).toString();
  if (!query.includes('skip') || !query.includes('take') || !query.includes('order') || !query.includes('from') || !query.includes('to')) {
    return res.status(400).json({ error: 'Missing required params: skip, take, order, from, to' });
  }

  const apiUrl = `https://api.skinrave.gg/affiliates/public/applicants?token=1af8f105-cc07-4168-b092-6dcd8a47838e&${query}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
