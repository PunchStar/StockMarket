var owner = require("../controllers/Owner.Controller");
var VerifyToken = require('./middleware.js');
module.exports = (app) => {
    app.post("/owner/login", owner.login);
    app.post("/owner/cpass", VerifyToken, owner.cPass);
    // app.post("/owner/register", owner.register);

};