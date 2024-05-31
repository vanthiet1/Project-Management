const mongoose = require('mongoose');

const memberProjectSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User',
      required: true,  
    },
    employeeProjects: [
      { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Project',
        required: true,  
        // nhận đô là 1 mảng id của
      }
    ],
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const MemberProject = mongoose.model('MemberProject', memberProjectSchema);

module.exports = MemberProject;
