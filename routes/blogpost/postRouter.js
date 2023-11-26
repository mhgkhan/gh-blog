import express from "express"

const postRouter = express.Router();
import { authorization } from "../../middlewares/authorization.js";
// controler imported
import blogpostcontroller from "../../controllers/blogpost/blogpostController.js";
import getBlogController from "../../controllers/blogpost/getBlogController.js";
import { uploadImg } from "../../middlewares/uploadScript.js";

// add new blog 
postRouter.post("/create", authorization,  blogpostcontroller.addBlog);
// update blog
postRouter.put("/action/update", authorization, blogpostcontroller.updateBlog)
// delelte blog 
postRouter.delete("/action/delete/:slug", authorization, blogpostcontroller.delteBlog)

// get blogs (single,all,or single user blogs)
postRouter.get("/open/:slug", getBlogController.getBlog)
postRouter.get("/getuserblogs/:id", getBlogController.getBlogsAllById);
postRouter.get("/getblogsall/", getBlogController.getBlogsAll);


export default postRouter