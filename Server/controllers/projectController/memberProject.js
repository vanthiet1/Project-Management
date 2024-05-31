const MemberProject = require('../../models/project/memberProject');

const memberProjectController = {

    getAllProjectMember: async (req, res) => {
        try {
            const getAllProject = await MemberProject.find()
                .populate('employeeId', 'fullname statusWorking role')
                .populate('employeeProjects', 'nameProject statusProject dayStart ');
            res.status(200).json(getAllProject)
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },



    getInforProjectMember: async (req, res) => {
        try {
            const { id } = req.params;
            const projectMemberInfo = await MemberProject.findOne({ employeeId: id })
                .populate('employeeId', 'fullname statusWorking role')
                .populate('employeeProjects', 'nameProject statusProject dayStart');
            if (!projectMemberInfo) {
                return res.status(404).json({ message: 'Employee not found' });
            }
            res.status(200).json(projectMemberInfo);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
module.exports = memberProjectController;
