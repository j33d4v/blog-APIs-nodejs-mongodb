const { userModel } = require("../model/users")
const { hashPassword, validateUser } = require("../../config/helper")

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

    res.status(200).json({ 
                'msg': 'You are successfully logged in',
                'token': token
            })
}

const logoutUser = async (req, res) => {
    try {
        console.log(req.user)
        res.clearCookie('jwt')
        console.log('logout successful')

        await req.user.save()
        res.json({ status: true, msg: 'logout successful' })
    } catch (err) {
        res.status(500).send(err)
    }
}


module.exports = {
    createUser,
    loginUser,
    logoutUser
}