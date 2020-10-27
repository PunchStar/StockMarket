var client = require("../controllers/User.Controller");
var VerifyToken = require('./middleware.js');
module.exports = (app) => {
    app.post("/client/register", client.register);
    app.post("/client/login", client.login);
    app.post("/client/getUserByToken", VerifyToken, client.userToken);
    // app.post("/ login", client.login);
    // app.get("/auth/client/google", client.google);
    // app.get("/auth/client/google/callback", client.google_callback);
    // app.post('/client/google', client.google_auth);
    // app.post('/client/facebook', client.facebook_auth);
    app.put("/auth/client/:id", VerifyToken, client.update);
    // app.post("/client/updateClientVendor", client.updateClientVendor);
    app.post("/client/profile", client.updateProfile);
    app.post("/client/hash", client.updateHash);
    app.delete("/auth/client/:id",  client.delete);
    // app.delete("/auth/client/:id", VerifyToken, client.delete);
    // app.get("/auth/client/:id", VerifyToken, client.findById);
    // app.get("/client/getAll", client.getAll);
    app.post("/auth/client/:id", VerifyToken, client.findById);
    app.post("/authnum/client/:id", VerifyToken, client.findByIdNum);
    app.post("/client/getAll", client.getAll);
    // app.post("/client/delClient", client.delClient);

    // app.post('/client/verify/phone', client.phoneverify);
    // app.post("/client/verify/setPhone", client.setPhone);
    // app.post("/client/verify/setPhoneEmail", client.setPhoneEmail);
    app.post("/client/verify/email", client.emailverify);
    app.post("/client/verify/setEmail", client.setEmail);

    // app.post("/client/addMulti", client.addMulti);
    app.post('/bank/getAll', client.getAllBank);
    app.post("/bank/create",client.createBank);
    app.post("/bank/update",client.updateBank);
    app.post("/bank/find/:id",client.findBank);
    app.delete("/bank/:id",  client.removeBank);
    app.post("/bank/delete",  client.removeMultiBank);

    app.post('/request/getAll', client.getAllRequest);
    app.post('/request/getAllId', client.getAllRequestId);
    app.post("/request/create",client.addRequest);
    app.post("/request/update",client.updateRequest);
    app.post("/request/find/:id",client.findRequest);
    app.delete("/request/:id",  client.removeRequest);
    app.post('/upload',client.upload)
    app.post('/addFile',client.addFiles)
    app.post('/getFiles',client.getFiles)
    app.post('/getAllFiles',client.getAllFiles)
    app.post('/forgot/:email',client.forgotPassword)
    app.post('/delFile',client.delFile);
    // app.post("/requests/delete",  client.removeMultiRequest);

};