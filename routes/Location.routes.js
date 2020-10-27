var location = require("../controllers/Location.Controller");
module.exports = (app) => {
    app.post("/location/create", location.create);
    app.post("/location/remove", location.remove);
    app.post("/location/update", location.update);
    app.delete("/location/:id", location.delete);
    // app.put("/location/:id", location.update);
    // app.get("/location", location.list);
    app.post("/location", location.list);
};