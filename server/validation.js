module.exports = function(db) {
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;
    /**
     * Validates the body of a signup request. Returns an object of errors
     * if validation fails, retuns null if validation passes.
     * @param {object} body 
     */
    this.validateSignup = function(body) {
        let errors = {
            emailFormatFails: !emailRegex.test(body.email),
            emailIsEmpty: body.email.length === 0,
            emailAlreadyExists: db.checkUser(body.email),
            passwordFormatFails: !passwordRegex.test(body.password),
            passwordIsEmpty: body.password.length === 0,
            retPasswordDoesntMatch: body.retPassword !== body.password
        };
    
        for (let item in errors) {
            if (errors[item] === true) return errors;
        }
    
        return null;
    }
    
    /**
     * Validates the body of a login request. Returns an object of errors
     * if validation fails, retuns null if validation passes.
     * @param {object} body 
     */
    this.validateLogin = function(body) {
        let errors = {
            emailFormatFails: !emailRegex.test(body.email),
            emailIsEmpty: body.email.length === 0,
            emailDoesntExist: !db.checkUser(body.email),
            passwordIsEmpty: body.password.length === 0,
            passwordDoesntMatch: false
        };
    
        if (!errors.emailDoesntExist) {
            errors.passwordDoesntMatch = !db.checkPassword(body.email, body.password);
        }
    
        for (let item in errors) {
            if (errors[item] === true) return errors;
        }
    
        return null;
    }
}
