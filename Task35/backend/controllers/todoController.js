const service = require('../services/todoService');

exports.getTaks = async (req, res) => {
  try {
    const q = req.query.search;
    const data = await service.getAll(q);
    res.json(data);
  } catch (err) {
    res.status(500).json({ eror: "Get tasks failed" });
  }
};

exports.createTak = async (req, res) => {
  try {
    const { title } = req.body;
    const data = await service.add(title);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ eror: err.message });
  }
};

exports.updateTak = async (req, res) => {
  try {
    const data = await service.update(req.params.id, req.body.completed);
    res.json(data);
  } catch (err) {
    res.status(400).json({ eror: "Update failed" });
  }
};

exports.deleteTak = async (req, res) => {
  try {
    await service.remove(req.params.id);
    res.json({ status: "deleted" });
  } catch (err) {
    res.status(400).json({ eror: "Delete failed" });
  }
};
