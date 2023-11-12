import InfoCollection from '../db/models/InfoCollection.js'
import UserCollection from '../db/models/UserCollection.js'
import PostCollection from '../db/models/PostCollection.js'



export const createUsr = async (email, password) => {
    try {
        const createdUser = await (new UserCollection({ email, password })).save()
        return createdUser
    } catch (error) {
        return error
    }
}

export const createBlog = async (title, description, content, image, category, user, imagewithpath) => {
    try {
        const slug = `${title.split(" ").join("-")}_${Date.now()}_${Math.floor(Math.random() * 3847397483e3)}`
        const saveData = await (new PostCollection({ title, description, content, image, user, slug, category, imagewithpath })).save();
        return saveData
    } catch (error) {
        return error
    }
}

export const existUserByEmail = async (email) => {
    try {
        const checkUser = await UserCollection.findOne({ email: email });
        // console.log(checkUser)
        return checkUser ? checkUser.email === email ? checkUser : false : false

    } catch (error) {
        console.log(error)
        throw new Error().message = "Mongodb Error: 01"
    }
}

export const existUserById = async (id) => {
    try {
        const checkUser = await UserCollection.findOne({ _id: id });
        // console.log(checkUser)
        return checkUser ? checkUser._id === id ? checkUser : false : false

    } catch (error) {
        console.log(error)
        throw new Error().message = "Mongodb Error: 01"
    }
}

export const existInfoByUser = async (thisuser) => {
    try {
        // console.log(thisuser)
        const checkInfo = await InfoCollection.findOne({ user: thisuser });
        // console.log('the check info is from middleware is ', checkInfo)
        return checkInfo ? checkInfo.user == thisuser ? checkInfo : false : false

    } catch (error) {
        console.log(error)
        throw new Error().message = "Mongodb Error: 01"
    }
}



export const existUserInfo = async (id) => {
    try {
        const checkUserInfo = await InfoCollection.findOne({ user: id });

        checkUserInfo.user ? checkUserInfo : false

        // if (checkUserInfo.user) {
        //     return checkUserInfo
        // }
        // else {
        //     return false
        // }

    } catch (error) {
        console.log(error)
        throw new Error().message = "Mongodb Error: 02"
    }
}



export const findPostBySlugAndId = async (slug,id) => {
    try {
        const thisBlog = await PostCollection.findOne({ slug: slug, user: id });
        console.log(thisBlog)
        return thisBlog ? thisBlog.slug === slug ? thisBlog : false : false

    } catch (error) {
        console.log(error)
        throw new Error().message = "Mongodb Error: 03"
    }
}