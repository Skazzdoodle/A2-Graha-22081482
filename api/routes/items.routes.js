module.exports = app => {
    const items = require("../controllers/item.controller.js");
  
    var router = require("express").Router();
  
    // Create a new item
    router.post("/items", items.create);
  
    // Retrieve all items
    router.get("/items", items.findAll);
  
    // Retrieve a single item by ID
    router.get("/items/:itemId", items.findOne);
  
    // Update an item by ID
    router.put("/items/:itemId", items.update);
  
    // Delete an item by ID
    router.delete("/items/:itemId", items.delete);
  
    app.use('/api', router);
};
