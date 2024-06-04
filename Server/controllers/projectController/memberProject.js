const MemberProject = require('../../models/project/memberProject');
const ProjectModel = require('../../models/project/projectModel');


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
    },
    leaveProject: async(req,res)=>{
         try {
            const { userId, projectId } = req.params;
            const memberProject = await MemberProject.findOne({ employeeId: userId });
            if (!memberProject) {
                return res.status(404).json({ message: 'User not found in projects' });
              }
              memberProject.employeeProjects = memberProject.employeeProjects.filter(
                (project) => project.toString() !== projectId
              ); 
              
            await memberProject.save();
          

              await ProjectModel.findByIdAndUpdate(projectId, {
                $pull: { teamProject: memberProject.employeeId }
              });
              res.status(200).json({ message: 'Successfully left project' });
         } catch (error) {
            res.status(500).json({ message: error.message });
         }
    },
      // update status working


}
module.exports = memberProjectController;
