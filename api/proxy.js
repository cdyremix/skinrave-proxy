module.exports = async (req, res) => {
  const { token, skip, take, order, from, to } = req.query;
  const apiUrl = `https://api.skinrave.gg/affiliates/public/applicants?token=${token}&skip=${skip}&take=${take}&order=${order}&from=${from}&to=${to}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Failed to fetch SkinRave data' });
  }
};
