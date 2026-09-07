module.exports = (sequelize, DataTypes) => { 
    const Likes = sequelize.define('likes', {
    });

    Likes.associate = (models) => {
        Likes.belongsTo(models.users, {
            foreignKey : 'userId'
        })
    }
    Likes.associate = (models) => {
        Likes.belongsTo(models.posts, {
            foreignKey : 'postId'
        })
    }
    return Likes;
}