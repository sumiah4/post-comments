
module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define("comments", {
        commentText : {
            type : DataTypes.STRING
        }
    })
    Comments.associate = (models) => {
        Comments.belongsTo(models.users, {
            foreignKey : 'userId'
        })
    }
    return Comments;
}