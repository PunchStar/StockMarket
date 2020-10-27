var review = require("../controllers/Review.Controller");
module.exports = (app) => {
    app.post("/review/create", review.create);
    app.post("/review/update", review.update);
    app.post('/review/findAll', review.findAll);
    app.post('/review/findAllVendor', review.findAllVendor);
    app.post('/review/delReview', review.delReview);
};