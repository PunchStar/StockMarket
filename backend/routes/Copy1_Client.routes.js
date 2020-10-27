var client = require("../controllers/Client.Controller");
var VerifyToken = require('./middleware.js');
module.exports = (app) => {
    app.post("/client/register", client.register);
    app.post("/client/login", client.login);
    // app.post("/ login", client.login);
    // app.get("/auth/client/google", client.google);
    // app.get("/auth/client/google/callback", client.google_callback);
    app.post('/client/google', client.google_auth);
    app.put("/auth/client/:id", VerifyToken, client.update);
    app.post("/client/updateClientVendor", client.updateClientVendor);
    app.post("/client/profile", client.updateProfile);
    app.delete("/auth/client/:id", VerifyToken, client.delete);
    // app.get("/auth/client/:id", VerifyToken, client.findById);
    // app.get("/client/getAll", client.getAll);
    app.post("/auth/client/:id", VerifyToken, client.findById);
    app.post("/client/getAll", client.getAll);
    app.post("/client/delClient", client.delClient);
};