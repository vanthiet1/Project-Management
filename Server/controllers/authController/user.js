const UserModel = require('../../models/auth/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const UserController = {
    registerUser: async (req, res) => {
        try {
            const { email, fullname, password, phoneNumber } = req.body;
            if (!req.body.email || !req.body.password) {
                return res.status(400).json({ message: "Vui lòng cung cấp địa chỉ email và mật khẩu" });
            }
            const existingUser = await UserModel.findOne({ email });
            if (existingUser !== null) {
                return res.status(400).json({ message: "Email này đã được đăng ký" });
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const newUser = new UserModel({
                email,
                password: hashedPassword,
                fullname,
                phoneNumber,
            })
            const user = await newUser.save();
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await UserModel.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: 'Người dùng chưa đăng ký' });
            }
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(401).json({ message: 'Sai mật khẩu' });
            }
            const accessToken = jwt.sign(
                { userId: user._id, roles: user.roles },
                process.env.accessTokenSecret,
                { expiresIn: '120m' }
            );
            const refreshToken = jwt.sign(
                { userId: user._id, roles: user.roles },
                process.env.refreshTokenSecret,
                { expiresIn: '7d' }
            );
            res.json({
                accessToken,
                refreshToken
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

}
module.exports = UserController;