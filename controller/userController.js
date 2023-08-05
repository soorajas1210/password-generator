const asyncHandler = require("express-async-handler");
const generateTocken = require("../utils/generateTocken");
const User = require("../model/userModel");
const data = require("../model/passwordsModel");
const Data = require("../model/passwordsModel");

const userSignup = asyncHandler(async (req, res) => {
  console.log(req.body);
  try {
    const { firstName, lastName, email, mobileno, password } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(400);
      throw new Error("User Already Exists");
    }
    const user = await User.create({
      firstName,
      lastName,
      email,
      mobileno,
      password,
    });
    console.log("user", user);

    if (user) {
      res.status(200).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: generateTocken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Error Occured!");
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

const userSignin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: generateTocken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password!");
  }
});

const addData = asyncHandler(async (req, res) => {
  try {
    const { myValue,body} = req;

    console.log(myValue,body, "Hello");
    const myId = myValue.toString();
    const { name, handelText} = body;
    console.log(req.body)
    const userData = await User.findById(myId);

    console.log(userData);

    if (userData) {
      const dataCreated = await Data.create({
        userId: myId,
        name: name,
        password:handelText,
      });

      res.json(dataCreated);
    } else {
      throw new Error("No data found!");
    }
  } catch (error) {
    console.log("error:", error);
    throw new Error("No data found!");
  }
});

const userData = asyncHandler(async (req, res) => {
  try {
    const { myValue } = req;

    const myId = myValue.toString();

    const userData = await Data.find({ userId: myId }).populate("userId");

    console.log(userData);

    if (userData) {
      res.status(200).json(userData);
    } else {
      throw new Error("No data found!");
    }
  } catch (error) {
    console.log("error:", error);
    throw new Error("No data found!");
  }
});

module.exports = {
  userSignup,
  userSignin,
  userData,
  addData,
};
