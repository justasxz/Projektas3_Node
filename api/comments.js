const { listComments, createComment } = require('../db');

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    try { return res.status(200).json(await listComments()); }
    catch { return res.status(500).json({ error: 'Nepavyko gauti komentarų' }); }
  }
  if (req.method === 'POST') {
    const text = req.body?.text?.trim();
    if (!text) return res.status(400).json({ error: 'Tekstas privalomas' });
    try {
      const comment = await createComment(text);
      return res.status(201).json(comment);
    } catch { return res.status(500).json({ error: 'Nepavyko išsaugoti komentaro' }); }
  }
  res.status(405).json({ error: 'Metodas neleidžiamas' });
};
