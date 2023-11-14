import express from "express";

const userRouter = express.Router();

// user controller imported
import userController from "../../controllers/user/userController.js";
import userActionController from "../../controllers/user/userActionsController.js";

import { authorization } from "../../middlewares/authorization.js";
// add new user 
userRouter.post("/signup", userController.signupUser)
    .post("/signin", userController.signInUser)
    .post("/userinfo", authorization, userController.addInfo);

    // for user actions (passwod update, upload image, or update any information )
    userRouter.put("/action/updatepassword", authorization, userActionController.updatePassword);
    userRouter.put("/action/updateinfo", authorization, userActionController.updateUserInfo);
    
export default userRouter