const User = require("../models/User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const user = await User.create({
    name: req.body.name,

    email: req.body.email,

    password: hashedPassword,
  });

  res.json(user);
};

exports.login = async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    return res.status(401).json({
      message: "Invalid Email",
    });
  }

  const valid = await bcrypt.compare(req.body.password, user.password);

  if (!valid) {
    return res.status(401).json({
      message: "Invalid Password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },

    process.env.JWT_SECRET,

    {
      expiresIn: "7d",
    },
  );

  res.json({
    token,
  });
};
