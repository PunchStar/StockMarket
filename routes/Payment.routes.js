var payment = require("../controllers/Payment.Controller");
module.exports = (app) => {
    app.post("/payment/create", payment.create);
    app.post("/payment/update", payment.update);
    // app.get("/payment/findAll", payment.findAll);
    app.post("/payment/findAll", payment.findAll);
    app.post('/payment/search', payment.search);
    app.post('/payment/payment-detail', payment.paymentDetail);
    app.post("/api/checkout", payment.checkout);
    // app.get('/payment/getAllPayment', payment.getAllPayment);
    app.post('/payment/getAllPayment', payment.getAllPayment);
};