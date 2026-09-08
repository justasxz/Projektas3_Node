const { listNotes, createNote } = require('../db');

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    try { return res.status(200).json(await listNotes()); }
    catch { return res.status(500).json({ error: 'Nepavyko gauti užrašų' }); }
  }
  if (req.method === 'POST') {
    const text = req.body?.text?.trim();
    if (!text) return res.status(400).json({ error: 'Tekstas privalomas' });
    try {
      const note = await createNote(text);
      return res.status(201).json(note);
    } catch { return res.status(500).json({ error: 'Nepavyko išsaugoti užrašo' }); }
  }
  res.status(405).json({ error: 'Metodas neleidžiamas' });
};
