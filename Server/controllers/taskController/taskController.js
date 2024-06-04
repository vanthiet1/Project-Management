const TaskMember = require('../../models/task/taskMemberModel');
const ProjectModel = require('../../models/project/projectModel')

const taskMemberController = {
      addTask:async (req,res)=>{
         try {
            const {teamTask ,idProjects , contentTask , startDateDeadline} = req.body;

            const project = await ProjectModel.findById(idProjects);
            if (!project) {
              return res.status(404).json({ success: false, message: 'Không tìm thấy dự án' });
            }
            const isValidMembers = teamTask.every(member => project.teamProject.includes(member));
            if (!isValidMembers) {
              return res.status(400).json({ success: false, message: 'Thành viên không có trong dự án' });
            }

             const newTask = new TaskMember  ({
                teamTask,
                idProjects,
                contentTask,
                startDateDeadline
             })
             const savedTask = await newTask.save();
             await ProjectModel.updateMany(
                { _id: { $in: idProjects } },
                { $push: { tasks: savedTask._id } }
            );
    
            res.status(201).json({ success: true, message: 'Công việc được thêm thành công', savedTask });
         } catch (error) {
            res.status(500).json({message: error.message});
         }
      },
      deleteTask:async (req,res) =>{
         try {
              const {taskId} = req.params;
              const task = await TaskMember.findByIdAndDelete(taskId);
              if (!task) {
                  return res.status(404).json({ message: 'Task not found' });
              }
              await ProjectModel.updateMany(
                {tasks:taskId},
                {$pull: {tasks:taskId}}
              )
              res.status(200).json({ success: true, message: 'Task deleted and projects updated' });
         } catch (error) {
              res.status(500).json({message: error.message});
         }
      },
      getAllTask: async (req,res)=>{
        try {
             const tasks = await TaskMember.find()
             .populate('teamTask','fullname statusWorking')
             res.status(200).json(tasks)
        } catch (error) {
             res.status(500).json({message: error.message});
        }
      },
      getDetailTask: async (req,res)=>{
         try {
            const {id} = req.params
              const tasks = await TaskMember.findById(id)
               .populate('teamTask','fullname statusWorking')
              res.status(200).json(tasks)
         } catch (error) {
              res.status(500).json({message: error.message});
         }
       },
       confirmTaskSuccess: async(req,res)=>{
            try {
               const {id} = req.params;
                const updateStatusTask = await  TaskMember.findByIdAndUpdate(
                  id,
                  { statusTask: true },
                  { new: true }
                );
                if(!updateStatusTask){
                  return res.status(404).json({message: 'Không tìm thấy task'})
                }
                res.status(200).json({message: "Thành công",updateStatusTask})
            } catch (error) {
               res.status(500).json({message: error.message});
            }
       }
}
module.exports = taskMemberController