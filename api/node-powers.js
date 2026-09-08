const { nodePowers } = require('../lib/core');

module.exports = async (req, res) => {
  try {
    res.status(200).json(await nodePowers());
  } catch {
    res.status(500).json({ error: 'Node probe nepavyko' });
  }
};
