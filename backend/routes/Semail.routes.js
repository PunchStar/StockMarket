var semail = require("../controllers/Semail.Controller");
module.exports = (app) => {
    app.post("/addEmail", semail.register);
};