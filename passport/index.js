const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const{User} = require('../models');

module.exports = (passport)=>{
    passport.serializeUser((user,done)=>{
        console.log("passport session saved as ",user.id);
       return done(null,user.id);
    });

    passport.deserializeUser((id,done)=>{
        console.log('passport session get id: ', id);
        User.findOne({where:{id}})
           .then(user=>done(null,user))
           .catch(err=>done(err));
    });

    local(passport);
    kakao(passport);
};
