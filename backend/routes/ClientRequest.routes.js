var clientrequest = require("../controllers/ClientRequest.Controller");
module.exports = (app) => {
    app.post("/req/create", clientrequest.create);
    app.post("/req/update", clientrequest.update);
    app.post("/req/findAll", clientrequest.findAll);
    app.post('/req/findAllClient', clientrequest.findAllClient);
    app.post('/req/setStatusLeadsVendor', clientrequest.setStatusLeadsVendor);
    app.post('/req/delLeadVendor', clientrequest.delLeadVendor);
    app.post('/req/delLeadVendorId', clientrequest.delLeadVendorId);

};