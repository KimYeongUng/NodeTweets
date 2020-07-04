const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelie = new Sequelize(
    config.database,config.username,config.password,config,
);

db.sequelize = sequelie;
db.Sequelize = Sequelize;
db.User = require('./user')(sequelie,Sequelize);
db.Post = require('./post')(sequelie,Sequelize);
db.HashTag = require('./hashtag')(sequelie,Sequelize);

db.User.hasMany(db.Post);
db.Post.belongsTo(db.User);
db.Post.belongsToMany(db.HashTag,{through:'PostHashtag'});
db.HashTag.belongsToMany(db.Post,{through:'PostHashtag'});

db.User.belongsToMany(db.User,{
   foreignKey:'followingId',
   as:'Follwers',
   through:'Follow',
});

db.User.belongsToMany(db.User,{
    foreignKey:'follwerId',
    as:'Followings',
    through:'Follow',
});

module.exports = db;