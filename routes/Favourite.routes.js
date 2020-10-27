var favourite = require("../controllers/Favourite.Controller");
module.exports = (app) => {
    app.post("/favourite/create", favourite.create);
    app.post("/favourite/update", favourite.update);
    // app.get("/favourite/findAll", favourite.findAll);
    app.post("/favourite/findAll", favourite.findAll);
    app.post('/favourite/search', favourite.search);
    app.post('/favourite/favourite-detail', favourite.favouriteDetail);
    app.post('/favourite/favourite-details', favourite.favouriteDetails);
    app.post('/favourite/delFavourite', favourite.delFavourite);
};