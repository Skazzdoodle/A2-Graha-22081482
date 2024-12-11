const db = require("../models");
const Customers = db.customers;
const Items = db.items;
const Op = db.Sequelize.Op;

// Create a new customer
exports.create = (req, res) => {
    const customer = {
        customer_name: req.body.customer_name,
        customer_email: req.body.customer_email
    };

    Customers.create(customer)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the customer."
            });
        });
};

// Retrieve all customers
exports.findAll = (req, res) => {
    Customers.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving customers."
            });
        });
};

// Retrieve a single customer by ID
exports.findOne = (req, res) => {
    Customers.findOne({
        where: {
            customer_id: req.params.customerId
        }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: `Error retrieving Customer with id=${req.params.customerId}.`
            });
        });
};

// Update a customer by ID
exports.update = (req, res) => {
    const id = req.params.customerId;

    Customers.update(req.body, {
        where: { customer_id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Customer was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Customer with id=${id}. Maybe Customer was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error updating Customer with id=${id}.`
            });
        });
};

// Delete a customer by ID
exports.delete = (req, res) => {
    const id = req.params.customerId;

    Customers.destroy({
        where: { customer_id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Customer was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Customer with id=${id}. Maybe Customer was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Could not delete Customer with id=${id}.`
            });
        });
};