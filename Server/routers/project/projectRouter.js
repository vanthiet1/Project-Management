const router = require('express').Router();
const ProjectController = require('../../controllers/projectController/project');

router.post('/',ProjectController.addProjectNew);
router.get('/',ProjectController.getAllProject);
router.get('/:id',ProjectController.getAnProject);

router.delete('/:id',ProjectController.deleteProject);
router.put('/cancel/:id',ProjectController.cancelProject);
router.put('/confirm/:id',ProjectController.confirmProject);
router.put('/:id',ProjectController.updateProject);


module.exports = router
