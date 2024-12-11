module.exports = (sequelize, Sequelize) => {
    const Customer = sequelize.define('Customer', {
        customer_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        customer_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        customer_email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
            },
        },
    });
    
    module.exports = Customer;
};