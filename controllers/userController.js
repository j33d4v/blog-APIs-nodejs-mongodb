const { userModel } = require("../model/users")
var passport = require("passport")
const { body, validationResult } = require("express-validator")
const { hashPassword, validateUser } = require("../config/helper")

const authenticate = require('../middleware/authenticate')

async function createUser(req, res) {
    const { first_name, last_name, email, password, phone_number } = req.body;
    userExist = await userModel.findOne({ email: email })
    
    if (userExist) {
        return res.status(409).send("This user already exist!")
    }

    const newUser = {
        first_name,
        last_name,
        email,
        password,
        phone_number
    }
    const hashedPassword = await hashPassword(newUser.password)
    newUser.password = hashedPassword
    const user = await userModel.create(newUser)
    res.json({
        msg: "Registration successful!",
        data: user
    })
};

const loginUser = async (req, res) => {
    const { email, password } = req.body
    const user = await validateUser(email, password)
    if (!user) {
        return res.status(401).send("Invalid crendentials!")
    }
    var token = authenticate.getToken({ _id: user._id })

    res.status(200)
        .json({ 'success': true, 
                'token': token, 
                'status': 'You are successfully logged in' 
            })
}

const logoutUser = async (req, res) => {
    try {
        console.log(req.user)
        res.clearCookie('jwt')
        console.log('logout successful')

        await req.user.save()
        res.json({ status: true, message: 'logout successful' })
    } catch (err) {
        res.status(500).send(err)
    }
}

async function getAllUser(req, res) {
    const user = await userModel.find({});
    res.status(200).json({
        msg: "all users",
        data: user
    })
}

async function getOneUser(req, res) {
    const userId = req.params.id
    const user = await userModel.findById(userId)
    if (!user) {
        return res.status(404).send("User with this id does not exist!")
    }
    res.status(200).send(user)
}

async function updateUserById(req, res) {
    const id = req.params.id;
    const bodyToUpdate = req.body;

    let user = await userModel.findByIdAndUpdate(id, bodyToUpdate, { new: true });

    if (!user) {
        return res.status(404).send("User does not exit")
    }
    res.status(201).json({
        msg: "User updated Successfully",
        data: user
    })
};

async function deleteUserById(req, res) {
    const id = req.params.id;

    const user = await userModel.findByIdAndDelete(id)
    if (!user) {
        return res.status(404).send("Can't delete! user does not exist!")
    }
    user.delete()
    res.json({
        status: 200,
        msg: "User deleted successfully!"
    })
}


async function getSellers(req, res, next){
    const sellers = await userModel.aggregate([
        {
            $match: {
                usertype: "business"
            }
        }
    ])
    res.status(200).json({status:true, sellers:sellers})
}

async function getSellerById(req, res){
    const sellerId = req.params.id
    const seller = await userModel.findOne({_id: sellerId, usertype: "business"})

    res.status(200).json({
        status: true,
        seller: seller
    })
}


module.exports = {
    createUser,
    loginUser,
    logoutUser,
    updateUserById,
    deleteUserById,
    getAllUser,
    getOneUser,
    getSellers,
    getSellerById
}