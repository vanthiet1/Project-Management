const router = require("express").Router();
const userController = require('../../controllers/authController/auth');
const authMiddleware = require('../../middlewares/authMiddleware');
router.get("/", authMiddleware, userController.getUserInfo);
router.get("/list/user", userController.getAllUser);
router.put("/role/:id", userController.updateRole);



// router.get("/:id", userController.getUserByid);


module.exports = router;