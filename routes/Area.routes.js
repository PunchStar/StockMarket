var area = require("../controllers/Area.Controller");
module.exports = (app) => {
    app.post("/area/create", area.create);
    app.post("/area/update", area.update);
    app.delete("/area/:id", area.delete);
    // app.put("/area/:id", area.update);
    // app.get("/location", location.list);
    app.post("/area", area.list);
    app.post("/area/remove", area.remove);
};