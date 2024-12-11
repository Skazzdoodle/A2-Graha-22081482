module.exports = app => {
    const customers = require("../controllers/customer.controller.js");

    var router = require("express").Router();

    // Create a new customer
    router.post("/customers", customers.create);

    // Retrieve all customers
    router.get("/customers", customers.findAll);

    // Retrieve a single customer by ID
    router.get("/customers/:customerId", customers.findOne);

    // Update a customer by ID
    router.put("/customers/:customerId", customers.update);

    // Delete a customer by ID
    router.delete("/customers/:customerId", customers.delete);

    app.use('/api', router);
};