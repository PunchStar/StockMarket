var lead = require("../controllers/Lead.Controller");
module.exports = (app) => {
    app.post("/lead/create", lead.create);
    app.post("/lead/update", lead.update);
    app.post("/lead/findAll", lead.findAll);
    app.post("/lead/findAllClient", lead.findAllClient);
    app.post("/lead/get-client", lead.getClient);
    app.post('/lead/setStatusLeadsVendor', lead.setStatusLeadsVendor);
    app.post('/lead/delLeadVendor', lead.delLeadVendor);
    app.post('/lead/delLeadVendorId', lead.delLeadVendorId);
};