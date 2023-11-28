import bcrypt from 'bcrypt'

import UserCollection from '../../db/models/UserCollection.js'
import InfoCollection from '../../db/models/InfoCollection.js'
import { errorSender, checkReqBodyValidOrNot, genToken } from '../../middlewares/UtiltyFunctions.js'
import { createUsr, existInfoByUser, existUserByEmail, existUserById } from '../../middlewares/checkExists.js'




class userController {



    // this function is used for user create new account 
    // protections 
    // 1)   checking the credientials data valid or not 
    // 2)   checking if user is already exits or not 
    // 3)   converting the user password into the text to encrypted text
    // 4)   storing the user credientials into the database
    // 5)   generating the JWT token for user and sent it to in the resposne. 



    static signupUser = async (req, res) => {
        try {
            const { email, password, confirmpassword } = req.body;
            //1- checking user credientials 
            const checkIfValidOrNot = checkReqBodyValidOrNot([email, password, confirmpassword]);
            if (checkIfValidOrNot.includes(false)) {
                return res.status(404).json({ success: false, message: "Invilid credientials" })
            }
            else {
                //2-  checking if user is exists or not 
                const checkifExistsOrNot = await existUserByEmail(email);
                if (!checkifExistsOrNot) {
                    const encryptPass = await bcrypt.hash(confirmpassword, 5);
                    const addDatatoDb = await createUsr(email, encryptPass)
                    const token = genToken({ id: addDatatoDb._id, email: addDatatoDb.email })
                    return res.status(201).json({ success: true, message: "Account creted", token })
                }
                else {
                    return res.status(400).json({ success: false, message: "user of this email is already exists" })
                }
            }

        } catch (error) {
            console.log(error)
            // errorSender(error)
            res.status(500).json(error)
        }
    }



    // sign to user account 
    static signInUser = async (req, res) => {
        try {
            const { email, password } = req.body
            const checkValidorNot = checkReqBodyValidOrNot([email, password])
            if (checkValidorNot.includes(false)) return res.status(400).json({ success: false, message: "Invilid credientials" })
            else {
                const checkExists = await existUserByEmail(email);
                if (!checkExists) {
                    return res.status(400).json({ success: false, message: "User not exists" })
                }
                else {
                    const comparingPss = await bcrypt.compare(password, checkExists.password);
                    if (comparingPss) {
                        const token = genToken({ id: checkExists._id, email: checkExists.email })
                        
                        return res.status(200).json({ success: true, message: "confirmed .. ", token })
                    }
                    else {
                        return res.status(404).json({ success: false, message: "Email or password is incorrect" })
                    }
                }
            }

        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }



    static addInfo = async (req, res) => {
        try {
            const { fullname, phone, gender, role, dob, country } = req.body
            const checkValidorNot = checkReqBodyValidOrNot([fullname, phone, gender, role, dob, country])
            if (checkValidorNot.includes(false)) return res.status(404).json({ success: false, message: "Some field is invilid" })
            else {
                if (req.userId && req.userId !== undefined) {
                    const id = req.userId
                    const checkIsIexits = await existUserByEmail(req.userEmail);
                    if (!checkIsIexits) {
                        return res.status(401).json({ success: false, message: "User is not exists please try to signup" })
                    }
                    else {
                        const existingInfo = await existInfoByUser(checkIsIexits.id)
                        // console.log(existingInfo)
                        if (!existingInfo) {
                            const saveData = await (new InfoCollection({ fullname, phone, gender, role, dob, country, user: checkIsIexits._id })).save()
                            return res.status(201).json({ success: true, message: "Information has been added", data: saveData })
                        }
                        else {
                            return res.status(400).json({ success: false, message: "you information is already exists" })
                        }
                    }
                }
                else {
                    return res.status(401).json({ success: false, message: "unAuthorize user" })
                }
            }
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }

    



}

export default userController