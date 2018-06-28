const bcrypt = require('bcrypt');
const UIDGenerator = require('uid-generator');

module.exports = function() {
    let uid = new UIDGenerator();
    this.users = []; // Acts as a users table.
    this.transactions = []; // Acts as a transaction table.
    this.userIdCounter = 0;
    this.transactionIdCounter = 0;

    /**
     * Checks the users array for email matches. Returns false if no match is found.
     * @param {string} email - Email to be compared.
     */
    this.checkUser = function(email) {
        return !this.users.every(user => user.email !== email);
    }

    /**
     * Finds a user given an email, and checks whether the password passed in 
     * matches the hashed password for the user. Returns true if a match is found.
     * @param {string} email - Email to be used in finding user.
     * @param {string} password - Password to be checked.
     */
    this.checkPassword = function(email, password) {
        let user = this.users.find(item => item.email === email);
        return bcrypt.compareSync(password, user.password);
    }

    /**
     * Finds a user given an id, and checks whether that specific user's token matches the
     * one passed in. Returns the user if the tokens match, otherwise returns null if the
     * user doesn't exist or the token doesn't match.
     * @param {number} id - user to be used in the search.
     * @param {string} token - token to be matched.
     */
    this.checkToken = function(id, token) {
        let user = this.users.find(item => item.id === id);
        if (!user) return null;
        return user.token === token ? user : null;
    }

    /**
     * Finds a user, assigns a token, and returns an object containing the token and id.
     * @param {string} email - Request body email
     */
    this.assignToken = function(email) {   
        let user = this.users.find(item => item.email === email);
        if (!user) return null;
        user.token = uid.generateSync();
        return { token: user.token, id: user.id };
    }

    /**
     * Creates and inserts a transaction in the the transactions table. Takes in a user object,
     * the amount of the transaction, and whether the transaction is a withrawl or
     * deposit. Returns a transaction object.
     * @param {object} user - A user object.
     * @param {number} changeAmount - Amount of the transaction.
     * @param {boolean} isWithdraw - Deposit or withdrawl.
     */
    this.insertTransaction = function(user, changeAmount, isWithdraw) {
        let today = new Date();
        transaction = {
            id: this.transactionIdCounter++,
            userId: user.id,
            balance: user.balance,
            amount: isWithdraw ? changeAmount * -1 : changeAmount,
            date: (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear()
            
        };

        this.transactions.push(transaction);
        return transaction;
    }

    /**
     * Finds all of the transactions for a particular user and returns them.
     * @param {number} userId - Id of the user.
     */
    this.getTransactions = function(userId) {
        return this.transactions.filter(item => item.userId === userId);
    }
    
    /**
     * Inserts a user into the users table. Encrypts password,
     * assigns ID, and returns the new user.
     * @param {object} body - Request body for user creation. 
     */
    this.insertUser = function(body) {
        let insertable = {
            id: this.userIdCounter++,
            email: body.email,
            password: bcrypt.hashSync(body.password, 10),
            token: uid.generateSync(),
            balance: 0
        }

        this.users.push(insertable);
        return insertable;
    }

}