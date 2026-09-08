const { deleteNote } = require('../../db');

module.exports = async (req, res) => {
  if (req.method !== 'DELETE') return res.status(405).json({ error: 'Metodas neleidžiamas' });
  try {
    const found = await deleteNote(req.query.id);
    if (!found) return res.status(404).json({ error: 'Užrašas nerastas' });
    return res.status(204).end();
  } catch { return res.status(500).json({ error: 'Nepavyko ištrinti užrašo' }); }
};
