const ProjectModel = require('../../models/project/projectModel');

const projectController = {
    // get all
    getAllProject: async (req, res) => {
        try {
            const allProject = await ProjectModel.find({});
            res.status(200).json(allProject);
        } catch (error) {
            res.status(500).json({ message: "lỗi server" });
        }
    },
    // get an
  
    getAnProject: async(req, res)=> {
        try {
            const {id} = req.params;
            if(!id){
                return res.status(403).json({message: "không tìm thấy id dự án"})
            }
           const anProject = await  ProjectModel.findById(id);
           res.status(200).json({success:true ,message:"success" , anProject})
        } catch (error) {
            res.status(500).json({ success:false,message:error.message})}
        },
    
    // add
    addProjectNew: async (req, res) => {
        try {
            const { nameProject, dayStart, sizeTeam, teamProject } = req.body;
            const newProject = new ProjectModel(
                {
                    nameProject: nameProject,
                    dayStart: dayStart,
                    sizeTeam: sizeTeam,
                    teamProject: teamProject
                }
            )
            console.log(newProject);
            const saveProject = await newProject.save();
            res.status(201).json({ success: true, message: 'Thêm dự án thành công', saveProject })
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    },
    // edit
    updateProject: async (req, res) => {
        try {
          const { id } = req.params;
          const { nameProject, dayStart, sizeTeam, teamProject } = req.body;
      
          const updateProject = await ProjectModel.findByIdAndUpdate(
            id,
            { nameProject, dayStart: new Date(dayStart), sizeTeam, teamProject: teamProject },
            { new: true }
          );
      
          if (!updateProject) {
            return res.status(404).json({ success: false, message: "Project not found" });
          }
      
          res.status(200).json({ success: true, message: 'Dự án cập nhật thành công', updateProject });
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      },

    // delete
    deleteProject: async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(403).json({ message: "Không tm  thấy id dự án" })
            }
            await ProjectModel.findByIdAndDelete(id)
            res.status(200).json({ success:true , message: "Xóa thàh công" })
        } catch (error) {
            res.status(500).json({ success:false , message: error.message });
        }
    },

    // cancel
    cancelProject: async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(404).json({ message: "id order not found" })
            }
            const updateStatusProject = await ProjectModel.findByIdAndUpdate(
                id,
                { statusProject: false },
                { new: true }
            )
            if (!updateStatusProject) {
                return { message: "Không tìm thấy dự án" }
            }
            res.status(200).json(updateStatusProject)

        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    confirmProject: async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(404).json({ message: "id order not found" })
            }
            const updateStatusProject = await ProjectModel.findByIdAndUpdate(
                id,
                { statusProject: true },
                { new: true }
            )
            if (!updateStatusProject) {
                return { message: "Không tìm thấy dự án" }
            }
            res.status(200).json(updateStatusProject)

        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }




}
module.exports = projectController;