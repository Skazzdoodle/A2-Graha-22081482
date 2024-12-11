const db = require("../models");
const Orders = db.orders;
const Customers = db.customers;
const Items = db.items;
const Op = db.Sequelize.Op;

// Create a new order
exports.create = (req, res) => {
    const order = {
        order_date: req.body.order_date || new Date(),
        customer_id: req.body.customer_id,
        item_id: req.body.item_id
    };

    Orders.create(order)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the order."
            });
        });
};

// Retrieve all orders
exports.findAll = (req, res) => {
    Orders.findAll({
        include: [
            { model: Customers, as: "customer", attributes: ["customer_name", "customer_email"] },
            { model: Items, as: "item", attributes: ["item_name", "item_price"] }
        ]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving orders."
            });
        });
};

// Retrieve a single order by ID
exports.findOne = (req, res) => {
    Orders.findOne({
        where: { order_id: req.params.orderId },
        include: [
            { model: Customers, as: "customer", attributes: ["customer_name", "customer_email"] },
            { model: Items, as: "item", attributes: ["item_name", "item_price"] }
        ]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: `Error retrieving Order with id=${req.params.orderId}.`
            });
        });
};

// Update an order by ID
exports.update = (req, res) => {
    const id = req.params.orderId;

    Orders.update(req.body, {
        where: { order_id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Order was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Order with id=${id}. Maybe Order was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error updating Order with id=${id}.`
            });
        });
};

// Delete an order by ID
exports.delete = (req, res) => {
    const id = req.params.orderId;

    Orders.destroy({
        where: { order_id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Order was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Order with id=${id}. Maybe Order was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Could not delete Order with id=${id}.`
            });
        });
};