const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  website: {
    type: String,
  },
  location: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
  instruments: {
    type: [String],
    required: true,
  },
  bio: {
    type: String,
  },
  projects: [
    {
      title: {
        type: String,
        required: true,
      },
      genre: {
        type: String,
      },
      role: {
        type: String,
        required: true,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        defalut: false,
      },
      description: {
        type: String,
      },
    },
  ],
  education: [
    {
      school: {
        type: String,
        required: true,
      },
      areaofstudy: {
        type: String,
      },
      from: {
        type: Date,
        required: true,
      },
      current: {
        type: Boolean,
        defalut: false,
      },
      to: {
        type: Date,
      },
      description: {
        type: String,
      },
    },
  ],
  social: {
    youtube: {
      type: String,
    },
    facebook: {
      type: String,
    },
    instagram: {
      type: String,
    },
    twitter: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Profile = new mongoose.model("profile", profileSchema);
