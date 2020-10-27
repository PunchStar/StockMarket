var location = require("../controllers/Location.Controller");
module.exports = (app) => {
    app.post("/location/create", location.create);
    app.delete("/location/:id", location.delete);
    app.put("/location/:id", location.update);
    // app.get("/location", location.list);
    app.post("/location", location.list);
};