const jwt = require('jsonwebtoken');
const UserModel = require('../../models/auth/userModel');
require('dotenv').config()

const authController = {
    getUserInfo: async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.accessTokenSecret);
            const userId = decoded.userId;
            const user = await UserModel.findById(userId).select('-password');
            if (!user) {
                return res.status(404).json({ message: 'Không tìm thấy người dùng' });
            }
            // Hiển thị tên người dùng
            res.status(200).json(user);

        } catch (error) {
            console.error('Đã xảy ra lỗi:', error);
            res.status(500).json({ message: 'Đã xảy ra lỗi trong quá trình lấy thông tin người dùng' });
        }
    },

    getAllUser: async (req, res) => {
        try {
            const allUser = await UserModel.find({});
            res.status(200).json(allUser)
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

}
module.exports = authController;