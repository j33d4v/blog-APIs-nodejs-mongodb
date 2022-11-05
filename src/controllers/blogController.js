const { blogModel } = require("../model/blogs")
const {userModel} = require("../model/users")

async function createBlog(req, res) {
    const data = req.body;
    data.author = req.user.id

    try{
      const blog = await blogModel.create(data)
      const wpm = 225;
      const words = blog.body.trim().split(/\s+/).length;
      const time = Math.ceil(words / wpm);
        
      blog.reading_time = time
      blog.save()

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
    const {pageSize, page, author, title, tags, order_by } =req.query
    pageSize ?? 20
    page ?? 0

    const blogs = await blogModel.find({state: 'published'}).limit(pageSize).skip(pageSize * page);
        
        // author &&  blogs.$where(() => this.author.toLowercase == author.toLowercase)
        title && blogs.$where(() => this.title.toLowercase == title.toLowercase)

        // tags ?? blogs.$where(() => {
        //     tags.forEach(tag => {
                
        //     });
        //     this.title.toLowercase == title.toLowercase
        // })
   
    res.status(200).json({
        status: true,
        data: blogs
    })
}

async function publishBlogById(req, res) {
    const id = req.params.id;
    try{
        const blog = await blogModel.findById(id);
        if(!blog){
            return res.json({ status: false, err, message: 'No blog with this blog' })
        }
        if(blog.state != 'draft'){
            return res.status(400).json({
                msg: "Blog has already been published",
                status: false
            })
        }
        blog.state = "published"
        blog.save()
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
        const blog = await blogModel.findOne({ _id : blogId, state : 'published' })
        if(!blog || blog.length == 0){
            return res.status(400).json({
                status: false,
                msg: "No Published Blog By that Id found!"
            })
        }
        const author = await userModel.findOne({ id : blog.author})

        blog.read_count += 1
        blog.save()

        res.status(200).json({
            status: true,
            data: blog,
            author: author
        })

    }catch(err){
        return res.status(400).json({
            status: false,
            msg: "No Published Blog By that Id found!",
            err
        })
    }    


}

async function getAllUserBlog(req, res){
    const userId = req.user.id
    const {pageSize, page} =req.query
    pageSize ?? 20
    page ?? 0
    order_by ?? 'createdAt'
    try{
        const blogs = await blogModel.find({ author : userId}).limit(pageSize).skip(pageSize * page)
        if(!blogs || blogs.length == 0){
            return res.status(400).json({
                status: false,
                msg: "No Blog founded!"
            })
        }
        res.status(200).json({
            status: true,
            data: blogs
        })

    }catch(err){
        return res.status(400).json({
            status: false,
            msg: "No Blog found!",
            err
        })
    }    


}

module.exports = {
    createBlog,
    getAllBlog,
    getBlogById,
    publishBlogById,
    editBlogById,
    deleteBlogById,
    getAllUserBlog
}