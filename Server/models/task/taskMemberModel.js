const mongoose = require('mongoose');

const taskMeberSchema = new mongoose.Schema(
    {
        teamTask:[
            { 
               type: mongoose.Schema.Types.ObjectId, 
               ref: 'User' 
           }
         ],
          idProjects: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Project',
                required: true,
            }
        ],
        startDateDeadline:{
            type:Date,
            required:true,
         },
        contentTask: { type: String , required:true},
     
         statusTask: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const TaskMember = mongoose.model('TaskMember', taskMeberSchema);

module.exports = TaskMember;
