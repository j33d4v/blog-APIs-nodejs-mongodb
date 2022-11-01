const { blogModel } = require("../model/blogs")
const { hashPassword, validateUser } = require("../config/helper")

const authenticate = require('../middleware/authenticate')

async function createBlog(req, res) {
    const data = req.body;
    data.author = req.user.id

    try{
      const blog = await blogModel.create(data)
        res.json({
            msg: "Blog created successfully!",
            data: blog
        })  
    }catch(err){
        return res.status(400).json({
            status: false,
            msg: (err.code === 11000) ? 'This title already exists, use another title!' : "An error occured when creating post. Try again!",
            err
        })
    }
    
};

async function getAllBlog(req, res) {
    const blogs = await blogModel.find({state: 'published'});
    res.status(200).json({
        status: true,
        data: blogs
    })
}

async function updateBlogById(req, res) {
    const id = req.params.id;

    try{
        const blog = await blogModel.findByIdAndUpdate(id, {state : 'published'}, { new: true });
        res.status(201).json({
            msg: "Blog Published Successfully",
            data: blog
        })
    }catch(err){
        return res.json({ status: false, err, message: 'Unable to update this blog' })
    }

};

async function deleteBlogById(req, res) {
    const id = req.params.id;

    const blog = await blogModel.findByIdAndDelete(id)
    if (!blog) {
        return res.status(404)
                .json({
                    status: false,
                    msg: "Can't delete, blog does not exist!"
                })
    }
    blog.delete()
    res.json({
        status: true,
        msg: "Blog deleted successfully!"
    })
}


async function editBlogById(req, res){
    const id = req.params.id;
    const update = req.body;
    try{
        const blog = await blogModel.findByIdAndUpdate(id, update, { new: true });
        res.status(201).json({
            msg: "Blog Updated Successfully",
            data: blog
        })
    }catch(err){
        return res.json({ status: false, err, message: 'Unable to update this blog' })
    }
}

async function getBlogById(req, res){
    const blogId = req.params.id
    try{
        const blog = await blogModel.find({ _id : blogId, state : 'published' } )
        if(!blog || blog.length == 0){
            return res.status(400).json({
                status: false,
                msg: "No Published Blog By that Id found!"
            })
        }
        res.status(200).json({
            status: true,
            data: blog
        })

    }catch(err){
        return res.status(400).json({
            status: false,
            msg: "No Published Blog By that Id found!",
            err
        })
    }    


}


module.exports = {
    createBlog,
    getAllBlog,
    getBlogById,
    updateBlogById,
    editBlogById,
    deleteBlogById
}