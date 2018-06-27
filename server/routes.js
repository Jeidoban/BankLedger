const Database = require('./database');
var _ = require('lodash');
let db = new Database();
let Validation = require('./validation')
let valid = new Validation(db);

module.exports = function (app) {
    
    let amountRegex = /^[0-9]\d*(()?(\.\d{0,2})?)$/;

    // The user creation endpoint. Inserts in users table given validation passes.
    app.post('/api/createUser', (req, res) => {
        let result = valid.validateSignup(req.body);
        if (result) return res.status(400).send(result);
        db.insertUser(req.body)
        res.status(201).send({ message: "User Creation Successful" });
    });

    // The login endpoint. Returns a token and user id given validation passes.
    app.post('/api/login', (req, res) => {
        let result = valid.validateLogin(req.body);
        if (result) return res.status(400).send(result);
        res.status(200).send(db.assignToken(req.body.email));
    });

    // Gets the balance and transactions for a user given token validation passes.
    app.post('/api/getBalance', (req, res) => {
        let user = db.checkToken(req.body.id, req.body.token);
        if (!user) return res.status(400).send({ message: "Invalid token" });
        return res.status(200).send({ balance: user.balance, transactions: db.getTransactions(user.id) });
    });

    // Inserts a deposit transaction into the transaction table given token validation passes.
    app.put('/api/makeDeposit', (req, res) => {
        let user = db.checkToken(req.body.id, req.body.token);
        if (!amountRegex.test(req.body.depositAmount) || !user) return res.status(400).send({ message: "Invalid token or format!" });
        user.balance = Math.round((user.balance + parseFloat(req.body.depositAmount)) * 100) / 100;
        return res.status(200).send(db.insertTransaction(user, parseFloat(req.body.depositAmount), false));
    });
        
    // Inserts a withdraw transaction into the transaction table given token validation passes.
    app.put('/api/makeWithdrawl', (req, res) => {
        let user = db.checkToken(req.body.id, req.body.token);
        if (!amountRegex.test(req.body.withdrawAmount) || !user) return res.status(400).send({ message: "Invalid token or format!" });
        user.balance = Math.round((user.balance - parseFloat(req.body.withdrawAmount)) * 100) / 100;
        return res.status(200).send(db.insertTransaction(user, parseFloat(req.body.withdrawAmount), true));
    });
}