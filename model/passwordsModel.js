const mongoose = require('mongoose')


const passwordSchema = mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Data = mongoose.model("Data", passwordSchema)

module.exports = Data;