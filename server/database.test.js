const Database = require('./database');
const bcrypt = require('bcrypt');

let db = new Database();
db.userIdCounter = 2;
db.users = [
    {
        id: 0,
        email: 'jimbo@aol.com',
        password: bcrypt.hashSync("ImJjimbo!", 10),
        token: "e8jf34k2mdki34"
    }, 
    {
        id: 1,
        email: 'steve@gmail.com',
        password: bcrypt.hashSync("SuPeRcOoL23", 10),
        token: "kfj89374y3jl3mf"
    }, 
    {
        id: 2,
        email: 'bob@yahoo.com',
        password: bcrypt.hashSync("Bobbster231", 10),
        token: 'df094k83njfk3fd'
    }
];

db.transactions = [
    {
        id: 0,
        userId: 0,
        balance: 344.34,
        amount: "+$45.45",
        date: "2/3/18"
    },
    {
        id: 1,
        userId: 1,
        balance: 344.34,
        amount: "+$45.45",
        date: "2/3/18"
    },
    {
        id: 2,
        userId: 1,
        balance: 344.34,
        amount: "+$45.45",
        date: "2/3/18"
    },
]

test("email check should return false", () => {
    expect(db.checkUser("test@test.com")).toBe(false);
});

test("email check should return true", () => {
    expect(db.checkUser("steve@gmail.com")).toBe(true);
});

test("hashed password comparision should return true", () => {
    expect(db.checkPassword("bob@yahoo.com", "Bobbster231")).toBe(true);
});

test("hashed password comparision should return false", () => {
    expect(db.checkPassword("bob@yahoo.com", "Bobbster123")).toBe(false);
});

test("User insert should return modified user", () => {
    let userInsert = {
        email: "linda@hotmail.com",
        password: "IronMan332",
    }
    expect(typeof db.insertUser(userInsert)).toBe("object");
});

test("Get transactions should be array", () => {
    expect(Array.isArray(db.getTransactions(1))).toBe(true);
});

test("Should return a transaction object", () => {
    expect(typeof db.insertTransaction({id: 2, balance: 34.00}, 334, true)).toBe("object");
});

test("Token check should return a user object", () => {
    expect(typeof db.checkToken(2, "df094k83njfk3fd")).toBe('object');
});

test("Token check wrong token should return null", () => {
    expect(db.checkToken(2, "test")).toBeFalsy();
});

test("Token check wrong id should return return null", () => {
    expect(db.checkToken(4, "343")).toBeFalsy();
});

test("Assign token should return an object", () => {
    expect(typeof db.assignToken("steve@gmail.com")).toBe('object');
});



