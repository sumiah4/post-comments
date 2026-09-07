module.exports = (sequelize, Datatypes) => {
    const Auth = sequelize.define("users", {
        username: {
            type: Datatypes.STRING,
            allowNull: false
        },
        password: {
            type: Datatypes.STRING,
            allowNull: false
        },
        fullname: {
            type: Datatypes.STRING,
            allowNull: false
        },
        country: {
            type: Datatypes.STRING,
            allowNull: false,
            validate: {
                is: /^[A-Za-z\s]+$/, // letters and spaces only, no digits
            }
        }
    })

    Auth.associate = (models) => {
        Auth.hasMany(models.comments, {
            foreignKey: 'userId',
            onDelete : "cascade"
        })

        Auth.hasMany(models.likes, {
            onDelete : "cascade"
        })
    }
    return Auth;
}