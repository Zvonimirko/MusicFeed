const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const { check, validationResult } = require("express-validator");

// @route   POST api/profile
// @desc    Create profile
// @access  Private

router.post(
  "/",
  [
    [
      check("status", "Status is required").not().isEmpty(),
      check("instruments", "Instruments are required").not().isEmpty(),
    ],
    auth,
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      status,
      website,
      location,
      artisticName,
      instruments,
      bio,
      youtube,
      facebook,
      instagram,
      twitter,
    } = req.body;

    // Build profile object

    const profileFields = {};
    profileFields.user = req.user.id;
    if (artisticName) profileFields.artisticName = artisticName;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (instruments) {
      profileFields.instruments = instruments
        .split(",")
        .map((instrument) => instrument.trim());
    }

    // Build socail object

    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (facebook) profileFields.social.facebook = facebook;
    if (instagram) profileFields.social.instagram = instagram;
    if (twitter) profileFields.social.twitter = twitter;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        // Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      // Create
      profile = new Profile(profileFields);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }
);

// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private

router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }
    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(400).send("Server Error");
  }
});

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public

router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);

    res.json(profiles);
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user id
// @access  Public

router.get(`/user/:user_id`, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({ msg: "Profile not found" });
    }

    res.json(profile);
  } catch (error) {
    if (err.kind === "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   DELETE api/profile/
// @desc    Delete profile, user and posts
// @access  Private

router.delete("/", auth, async (req, res) => {
  try {
    // @todo - remove users posts

    // Delete profile

    await Profile.findOneAndDelete({ user: req.user.id });

    // Delete user

    await User.findOneAndDelete({ _id: req.user.id });

    res.json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   PUT api/profile/projects
// @desc    Add projects to profile
// @access  Private

router.put(
  "/projects",
  [
    [
      check("title", "Title is required").not().isEmpty(),
      check("type", "Type is required").not().isEmpty(),
      check("role", "Your role is required").not().isEmpty(),
      check("from", "From date is required").not().isEmpty(),
    ],
    auth,
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      type,
      role,
      author,
      location,
      from,
      to,
      current,
      description,
    } = req.body;

    const newProjects = {
      title,
      type,
      role,
      author,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.projects.unshift(newProjects);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   DELETE api/profile/projects/:proj_id
// @desc    Delete a project from profile
// @access  Private

router.delete("/projects/:proj_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.projects = profile.projects.filter(
      (project) => project._id.toString() !== req.params.proj_id
    );

    await profile.save();

    res.send("Profile Deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   PUT api/profile/education/
// @desc    Add education to profile
// @access  Private

router.put(
  "/education",
  [
    [
      check("school", "School is required").not().isEmpty(),
      check("fieldofstudy", "Field of study is required").not().isEmpty(),
      check("from", "Starting time is required").not().isEmpty(),
    ],
    auth,
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      school,
      instrument,
      fieldofstudy,
      from,
      to,
      description,
    } = req.body;

    const newEdu = {
      school,
      instrument,
      fieldofstudy,
      from,
      to,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(newEdu);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server errror");
    }
  }
);

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete a education from profile
// @access  Private

router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    profile.education = profile.education.filter(
      (edu) => edu._id.toString() !== req.params.edu_id
    );

    await profile.save();
    res.send(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
