module.exports = app => {
    const orders = require("../controllers/order.controller.js");

    var router = require("express").Router();

    // Create a new order
    router.post("/orders", orders.create);

    // Retrieve all orders
    router.get("/orders", orders.findAll);

    // Retrieve a single order by ID
    router.get("/orders/:orderId", orders.findOne);

    // Update an order by ID
    router.put("/orders/:orderId", orders.update);

    // Delete an order by ID
    router.delete("/orders/:orderId", orders.delete);

    app.use('/api', router);
};