var crypto = require('crypto');

//PASSWORD UTILS
//CREATE FUNCTION TO RANDOM SALT

var genRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length/2))
    .toString('hex')
    .slice(0,length);

}

var sha512 = function(password, salt){
    var hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    var value = hash.digest('hex');
    return{
        salt:salt,
        passwordHash:value
    };

};

function saltHashPassword(userPassword){

    var salt = genRandomString(16);
    var passwordData = sha512(userPassword, salt);
    return passwordData;
};

function checkHashPassword(userPassword, salt){
    var passwordData = sha512(userPassword, salt);
    return passwordData;
};

module.exports = {
    genRandomString,
    sha512,
    saltHashPassword,
    checkHashPassword
}