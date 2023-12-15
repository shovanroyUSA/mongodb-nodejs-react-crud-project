const express = require("express");
const { getAllBlogs,  createBlog,   getBlogById,   updateBlog,   deleteBlog, } 
            = require("../controllers/BlogController");

const router = express.Router();

router.route("/").get(getAllBlogs).post(createBlog); 
//GET and POST methods for the root path ("/") of the router. 
//These routes are associated with the getAllBlogs and createBlog controller methods respectively.
router.route("/:id").get(getBlogById).put(updateBlog).delete(deleteBlog); 
//GET, PUT, and DELETE methods for the path "/:id", where :id is a dynamic parameter representing the blog ID. 
//These routes are associated with the getBlogById, updateBlog, and deleteBlog controller functions, respectively.


module.exports = router;
