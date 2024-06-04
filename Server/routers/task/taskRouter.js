const router = require('express').Router()
const taskMemberController = require('../../controllers/taskController/taskController');


router.get('/',taskMemberController.getAllTask)
router.get('/:id',taskMemberController.getDetailTask)


router.post('/addtask',taskMemberController.addTask);
router.delete('/:taskId',taskMemberController.deleteTask)
router.put('/confirm/success/:id',taskMemberController.confirmTaskSuccess)


module.exports = router