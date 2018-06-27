const Database = require('./database');
const Validation = require('./validation');
const bcrypt = require('bcrypt');
let db = new Database();
db.users = [
    {
        email: "jerry@gmail.com",
        password: bcrypt.hashSync("CoolPass123", 10)
    },
    {
        email: "steve@gmail.com",
        password: bcrypt.hashSync("Neat203", 10)
    },
    {
        email: "bob@aol.com",
        password: bcrypt.hashSync("ItErAtIvE23", 10)
    }
];
let valid = new Validation(db);

test("Signup validation should return an object", () => {
    expect(typeof valid.validateSignup({
        email: "test@test.com", 
        password: "Coolpassword123", 
        retPassword:"Collpassword234"
    })).toBe('object');
});

test("Signup validation should return null", () => {
    expect(valid.validateSignup({
        email: "test@test.com", 
        password: "Coolpassword123", 
        retPassword:"Coolpassword123"
    })).toBeFalsy();
});

test("Login validation should return an object", () => {
    expect(typeof valid.validateLogin({
        email: "jerry@gmail.com", 
        password: "CoolPas123"
    })).toBe('object');
});

test("Login validation should return null", () => {
    expect(valid.validateLogin({
        email: "jerry@gmail.com", 
        password: "CoolPass123"
    })).toBeFalsy();
});
