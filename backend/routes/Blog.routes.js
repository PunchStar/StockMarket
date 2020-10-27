var blog = require("../controllers/Blog.Controller");
const upload_blog = require('./upload_blog.js');
module.exports = (app) => {
    app.post("/blog/create", blog.create);
    app.post("/blog/update", blog.update);
    // app.get("/blog/findAll", blog.findAll);
    app.post("/blog/findAll", blog.findAll);
    app.post('/blog/findAllCategory', blog.findAllCategory);
    app.post('/blog/search', blog.search);
    app.post('/blog/blog-detail', blog.blogDetail);
    // app.post("/blog/uploads",  upload_blog.array('files'),blog.uploadImgs)
    app.post("/blog/add",  blog.add)

    app.post('/blog/createCategory',blog.createCategory);
    app.post('/blog/updateCategory',blog.updateCategory);
    app.post('/blog/removeCategory',blog.removeCategory);
    app.post('/blog/categorylist',blog.categoryList);
    app.post('/blog/delBlog',blog.delBlog);
};