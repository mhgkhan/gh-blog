import PostCollection from "../../db/models/PostCollection.js";
import { checkReqBodyValidOrNot } from "../../middlewares/UtiltyFunctions.js"
import { createBlog, existUserByEmail, findPostBySlugAndId } from "../../middlewares/checkExists.js";
import path from 'path'
import bcrypt from 'bcrypt'

export default class blogpostcontroller {

    static addBlog = async (req, res) => {

        try {
            const { title, description, content, category } = req.body
            const checkValid = checkReqBodyValidOrNot([title, description, content, category]);
            if (checkValid.includes(false)) return res.status(401).json({ success: false, message: "Invilid Credientials" })
            else {
                //  checking if file is comming or not 
                if (!req.file) return res.status(400).json({ success: false, message: "cover image is requried" })
                else {
                    // console.log(req.file)
                    const image = req.file?.filename; // else undefiend
                    const userEmail = req.userEmail;
                    const imagewithpath = image == undefined ? image : `${path.join(process.cwd(), `./temp/images/blog/${image}`)}`
                    // checking if user is exists or not 
                    const checkUserExists = await existUserByEmail(userEmail);
                    if (!checkUserExists) return res.status(400).json({ success: false, message: "Please first signup then try to post a blog" })
                    else {
                        const user = checkUserExists._id
                        const createedBlog = await createBlog(title, description, content, image, category, user, imagewithpath)
                        if (createedBlog.user == checkUserExists._id) return res.status(201).json({ success: true, message: "Blog has been posted." })
                        else return res.status(500).json({ success: false, message: "some went wrong." })
                    }
                }
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({ success: false, message: error })
        }
    }


    static updateBlog = async (req, res) => {
        try {

            const { description, content, category, slug } = req.body
            // checking if user blog data is valid or not 
            const checkValidation = checkReqBodyValidOrNot([description, content, category, slug])
            if (checkValidation.includes(false)) return res.status(401).json({ success: false, message: "Invilid Credientials" })
            else {
                // checking if user is exists or not 
                const userEmail = req.userEmail
                const checkUser = await existUserByEmail(userEmail);
                if (!checkUser) return res.status(400).json({ success: false, message: "Please first signup then try to post a blog" })
                else {
                    // checking if post is exists or not 
                    const existBlog = await findPostBySlugAndId(slug, checkUser._id);
                    // console.log(existBlog)
                    if (!existBlog) return res.status(400).json({ success: false, message: "No blog to update on this credientails" })
                    else {
                        let bloguser = existBlog.user
                        // console.log(existBlog.user == checkUser._id)
                        // updaing the blog 
                        try {
                            const updatingBlog = await PostCollection.findOneAndUpdate({ _id: existBlog._id }, {
                                $set: {
                                    description, content, category
                                }
                            })
                            if (!updatingBlog) return res.status(500).json({ success: false, message: "There is no blog to update " })
                            else {
                                return res.status(200).json({ success: true, message: updatingBlog })
                            }
                        } catch (error) {
                            console.log(error)
                            return res.status(500).json({ success: false, message: error })
                        }
                    }
                }
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({ success: false, message: error })
        }
    }




    static delteBlog = async (req, res) => {
        try {
            if (req.header('userpassword')) {
                const password = req.header('userpassword');
                const slug = req.params.slug;
                const email = req.userEmail;
                // checking if user is exists or not and checking the user password is correct or not 
                const checkUser = await existUserByEmail(email);
                if (!checkUser) return res.status(401).json({ success: false, message: "User is not exits" })
                else {
                    // checking the password is correct or not 
                    const backPass = await bcrypt.compare(password, checkUser.password)
                    if (backPass) {
                        // delte blog finally 
                        try {
                            const deletionBlog = await PostCollection.findOneAndDelete({ slug: slug, user: checkUser._id },)
                            if (!deletionBlog) return res.status(500).json({ success: false, message: "There is no blog to delete" })
                            else return res.status(200).json({ success: true, message: deletionBlog })
                        } catch (error) {
                            console.log(error)
                            return res.status(500).json({ success: false, message: error })
                        }
                    }
                    else {
                        return res.status(401).json({ success: false, message: "Incorrect password" })
                    }
                }
            }
            else {
                return res.status(400).json({ success: false, message: "Password is requried" })
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({ success: false, message: error })
        }
    }
}


