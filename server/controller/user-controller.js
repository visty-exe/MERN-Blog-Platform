import User from "../model/user.js"
import bcrypt from "bcrypt"
import Token from "../model/token.js"
import jwt from "jsonwebtoken"
// Signup API

export const signupUser = async (req, res) => {
    try {
        const { name, password, username } = req.body;
        const hashPass = await bcrypt.hash(password, 10)
        const find = await User.findOne({ username })
        if (find) {
            return res.status(409).json({
                success: false,
                message: "Username already exists"

            })
        }
        const newUser = await User.create({
            name,
            username,
            password: hashPass
        })
        // Send to Frontend 

        return res.status(200).json({
            success: true,
            message: "Signup Successfull"

        })
    } catch (error) {
        console.error("Error: ", error)
        return res.status(500).json({
            success: false,
            message: "Error while signup the user"

        })
    }
}

export const loginUser = async (req, res) => {
    let { username, password } = req.body
    let user = await User.findOne({
        username
    })
    if (!user) {
        return res.status(400).json({
            success: "false",
            message: "Username or Password is wrong"
        })
    }
    try {
        let match = await bcrypt.compare(password, user.password)
        if (match) {
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_KEY, { expiresIn: '7D' })
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_TOKEN_KEY)

            const newToken = new Token({ token: refreshToken })
            await newToken.save();

            return res.status(200).json({
                success: "true",
                message: "Login Successfull",
                accessToken: accessToken,
                refreshToken: refreshToken,
                name: user.name,
                username: user.username
            })
        } else {
            return res.status(400).json({
                success: "false",
                message: "Username or Password is wrong"
            })
        }
    } catch (error) {
        console.error("Error: ", error)
        return res.status(500).json({
            success: false,
            message: "Error while login the user"

        })
    }
}