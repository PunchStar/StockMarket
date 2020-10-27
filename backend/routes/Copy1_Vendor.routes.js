var vendor = require("../controllers/Vendor.Controller");
var VerifyToken = require('./middleware.js');
var upload = require('./upload.js');
module.exports = (app) => {
    app.post("/vendor/register", vendor.create);
    app.post("/vendor/login", vendor.login);
    // app.put("/auth/vendor/:id",VerifyToken,vendor.update);
    app.post("/search", vendor.search);
    app.post("/vendor/update", VerifyToken, vendor.update);
    app.post('/new-album', vendor.new_album);
    app.post('/addVideoUrl', vendor.addVideoUrl);
    app.post('/get-album', vendor.get_album);
    app.post('/getAllPhotos', vendor.getAllPhotos);
    app.post('/get-video', vendor.get_video);
    app.post('/get-photo', vendor.get_photo);
    app.delete("/auth/vendor/:id", VerifyToken, vendor.delete);
    // app.get("/auth/vendor/:id", VerifyToken, vendor.findById);
    // app.get("/vendor/getAll", vendor.getAll);
    app.post("/auth/vendor/:id", VerifyToken, vendor.findById);
    app.post("/vendor/getAll", vendor.getAll);
    app.post("/auth/vendor-detail", vendor.findByIdDetail);
    app.post("/auth/cpass", VerifyToken, vendor.cPass);
    app.post("/vendor/mainImg", vendor.setMainImg);
    app.post('/vendor/verify/phone', vendor.phoneverify);
    // app.post("/upload-img", upload.single('file'), vendor.uploadImg)
    app.post("/upload-imgs/:id", [VerifyToken, upload.array('files')], vendor.uploadImgs)
    app.post("/upload-imgs/:id", [VerifyToken, upload.array('files')], vendor.uploadImgs)

    app.post("/vendor/setStatus", vendor.setStatus);
    app.post("/vendor/setMembership", vendor.setMembership);
    app.post("/vendor/delVendor", vendor.delVendor);
    app.post("/vendor/verify/setPhone", vendor.setPhone);
    app.post("/vendor/verify/email", vendor.emailverify);
    app.post("/vendor/verify/setEmail", vendor.setEmail);
    app.post("/vendor/changeReview", vendor.changeReview);
    app.post("/vendor/reduceNum", vendor.reduceNum);

};