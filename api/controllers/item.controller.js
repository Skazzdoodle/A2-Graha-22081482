const db = require("../models");
const Items = db.items;
const Op = db.Sequelize.Op;

exports.getAllItems = async (req, res) => {
    try {
      const items = await Item.findAll();
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.createItem = async (req, res) => {
    try {
      const { item_name, item_price } = req.body;
      const newItem = await Item.create({ item_name, item_price });
      res.status(201).json(newItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.updateItem = async (req, res) => {
    try {
      const { id } = req.params;
      const { item_name, item_price } = req.body;
      const updatedItem = await Item.update({ item_name, item_price }, { where: { item_id: id } });
      res.status(200).json(updatedItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.deleteItem = async (req, res) => {
    try {
      const { id } = req.params;
      await Item.destroy({ where: { item_id: id } });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };