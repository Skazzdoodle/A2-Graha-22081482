const Customer = require('./customers');
const Item = require('./items');
module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define('Order', {
        order_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        order_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW,
        },
        customer_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Customer,
                key: 'customer_id',
            },
        },
        item_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Item,
                key: 'item_id',
            },
        },
    });

module.exports = Order;
}