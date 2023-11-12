import PostCollection from "../../db/models/PostCollection.js";

export default class getBlogController {
    static getBlog = async (req, res) => {
        try {
            const slug = req.params.slug;
            console.log(slug)
            const thisBlog = await PostCollection.findOne({ slug: slug }).select({ _id: false, user: 0 })
            return res.status(200).json({ success: true, message: thisBlog })
        } catch (error) {
            return res.status(500).json({ success: false, message: error })
        }
    }
    static getBlogsAll = async (req, res) => {
        try {
            const blogs = await PostCollection.find({}).select({ _id: false, user: false })
            return res.status(200).json({ success: true, message: blogs })
        } catch (error) {
            return res.status(500).json({ success: false, message: error })
        }
    }
    static getBlogsAllById = async (req, res) => {
        try {
            const id = req.params.id
            const blogs = await PostCollection.find({user:id})
            return res.status(200).json({ success: true, message: blogs })
        } catch (error) {
            return res.status(500).json({ success: false, message: error })
        }
    }
}