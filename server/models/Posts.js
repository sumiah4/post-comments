module.exports = (sequelize, DataTypes) => { 
    const Posts = sequelize.define('posts', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Posts.associate = (models) => {
        Posts.hasMany(models.comments, {
            onDelete : "cascade"
        }),

        Posts.hasMany(models.likes, {
            onDelete : "cascade"
        })
    }
    return Posts;
};