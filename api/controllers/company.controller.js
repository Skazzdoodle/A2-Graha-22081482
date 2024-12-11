const db = require("../models");
const Companies = db.companies;
const Op = db.Sequelize.Op;

// Create company
exports.create = (req, res) => {
    const company = {
        company_name: req.body.company_name,
        company_address: req.body.company_address,
        contact_id: parseInt(req.params.contactId),
    };

    Companies.create(company)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred"
            });
        });
};

// Get all company
exports.findAll = (req, res) => {

    Companies.findAll({
        where: {
            contact_id: parseInt(req.params.contactId),
        },
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred"
            });
        });
};

// Get one company by id
exports.findOne = (req, res) => {
    Companies.findOne({
        where: {
            contact_id: req.params.contactId,
            company_id: req.params.companyId,
        },
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred"
            });
        });
};

// Update one company by id
exports.update = (req, res) => {
    const companyId = parseInt(req.params.companyId);

    Companies.update(req.body, {
        where: {
            company_id: companyId,
            contact_id: req.params.contactId,
        },
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "company was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update company`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating company with id=" + companyId
            });
        });
};

// Delete one company by id
exports.delete = (req, res) => {
    const companyId = parseInt(req.params.companyId);

    Companies.destroy({
        where: {
            company_id: companyId,
            contact_id: req.params.contactId,
        },
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "company was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete company`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete company with id=" + companyId
            });
        });
};