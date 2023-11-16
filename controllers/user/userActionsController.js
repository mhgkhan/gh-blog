import bcrypt from 'bcrypt'
import { checkReqBodyValidOrNot } from "../../middlewares/UtiltyFunctions.js";
import { existInfoByUser, existUserByEmail } from "../../middlewares/checkExists.js";
import UserCollection from '../../db/models/UserCollection.js';
import InfoCollection from '../../db/models/InfoCollection.js';

export default class userActionController {

    // updating password of user 
    static updatePassword = async (req, res) => {
        try {
            const { previusPass, newPass, confirmNewPass } = req.body;
            // checking if valid or not 
            const checkIfValidOrNot = checkReqBodyValidOrNot([previusPass, newPass, confirmNewPass]);
            // console.log(checkIfValidOrNot)
            if (checkIfValidOrNot.includes(false)) return res.status(401).json({ success: false, message: "invilid credientials" })
            else {
                const userEmail = req.userEmail
                // checking if user is exists or not 
                const checkExists = await existUserByEmail(userEmail);
                if (!checkExists) return res.status(401).json({ success: false, message: "unAuthorize user" })
                else {
                    // comparing the passwod 
                    const comparePass = await bcrypt.compare(previusPass, checkExists.password);
                    if (!comparePass) return res.status(401).json({ success: false, message: "Password is incorrect" })
                    else {
                        // converting the new pasword to hash 
                        const newPassHashed = await bcrypt.hash(confirmNewPass, 6);
                        // updating the password 
                        try {
                            await UserCollection.findOneAndUpdate({ email: userEmail }, { $set: { password: newPassHashed } })
                            return res.status(201).json({ success: true, message: "password has been updated" })
                        } catch (error) {
                            console.log(error);
                            return res.status(500).json({ success: false, message: error })
                        }
                    }
                }
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: error })
        }
    }



    static updateUserInfo = async (req, res) => {
        try {
            // checking if data is valid or not 
            const checkValidation = checkReqBodyValidOrNot(Object.values(req.body));
            if (checkValidation.includes(false)) return res.status(401).json({ success: false, message: "invilid credientials" })
            else {
                // this userEmail is comming form middleware of authorization
                const userEmail = req.userEmail
                // checking if user of this userEmail is exists or not 
                const checkExists = await existUserByEmail(userEmail);
                if (!checkExists) return res.status(401).json({ success: false, message: "unAuthorize user" })
                else {
                    // checking if user information of this user is exists or not 
                    const existingInfo = await existInfoByUser(checkExists.id)
                    if (!existingInfo) return res.status(401).json({ success: false, message: "please first add your information then update" })
                    else {
                        // updating the user information 
                        try {
                            await InfoCollection.findOneAndUpdate({ user: checkExists._id }, { $set: { ...req.body } })
                            return res.status(201).json({ success: true, message: "Information has been updated." })
                        } catch (error) {
                            console.log(error);
                            return res.status(500).json({ success: false, message: error })
                        }
                    }
                }
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: error })
        }
    }


    


}