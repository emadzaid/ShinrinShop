const bcrypt = require('bcrypt');

const users = [
    {
        name: 'admin',
        email: 'admin@gmail.com',
        password: bcrypt.hashSync("123456",10),
        isAdmin: true,

    },

    {
        name: 'emad',
        email: 'emad@gmail.com',
        password: bcrypt.hashSync("123",10),
        isAdmin: false,

    }
];

module.exports = users;