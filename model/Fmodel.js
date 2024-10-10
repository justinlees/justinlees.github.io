const mongoose = require("mongoose");

const freelancerData = new mongoose.Schema({
  FirstName: String,
  LastName: String,
  DOB: Date,
  UserName: String,
  Password: String,
  MobileNo: Number,
  userType: { type: String, default: "Freelancer" },
  qualification: {
    type: String,
    default: "Empty",
  },
  email: String,
  profilePic: String,
  Rating: {
    type: Number,
    default: 0,
  },
  Skill: String,
  currAmount: Number,
  amountSpent: Number,
  amountSaved: Number,
  bufferRequests: [
    {
      clientIds: { type: String, default: null },
      taskName: { type: String, default: null },
      taskDescription: { type: String, default: null },
    },
  ],
  tasksAssigned: [
    {
      clientId: { type: String, default: null },
      taskName: { type: String, default: null },
      taskDescription: { type: String, default: null },
      taskDate: { type: Date, default: null },
      taskAmount: { type: Number, default: 0 },
    },
  ],
  finishedTasks: {
    type: Number,
    default: 0,
  },
});

const collectionF = mongoose.model("freelancers", freelancerData);

module.exports = collectionF;
