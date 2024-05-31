const router = require('express').Router();
const memberProjectController = require('../../controllers/projectController/memberProject');

router.get('/',memberProjectController.getAllProjectMember);
router.get('/:id',memberProjectController.getInforProjectMember);



module.exports = router
