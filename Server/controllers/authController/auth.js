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
    },
    getAnUser: async (req, res) => {
        try {
            const { id } = req.params
            const detailUser = await UserModel.find(id);
            res.status(200).json(detailUser)
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    updateRole: async (req, res) => {
        try {
          const {id} = req.params;
          const updatedUser = await UserModel.findByIdAndUpdate(id, {
            roles: ["admin"],
            new: true,
            runValidators: true
          });
      
          if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
          }
      
          res.status(200).json({ success: true, message: "User role updated successfully" });
        } catch (error) {
          console.error(error); // Log the actual error for debugging
          res.status(500).json({ message: "Internal server error" });
        }
      }
      

}
module.exports = authController;