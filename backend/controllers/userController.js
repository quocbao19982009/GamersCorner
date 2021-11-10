import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// Desc: Auth User & get Token
// Route: POST /api/users/login
// Access: Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // To access infomation being sent into URL, use request.body
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

// Desc: GET user profile
// Route: GET /api/users/profile
// Access: Private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
  // const user = await User.findById(req.user._id)
});

// Desc: create new user profile
// Route: POST /api/users/
// Access: Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exites");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

// Desc: Update user profile
// Route: PUT /api/users/profile
// Access: Private

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password || user.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
  // const user = await User.findById(req.user._id)
});

// Desc: GET all users
// Route: GET /api/users/
// Access: Private/Admin

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});

  res.json(users);
});

// Desc: DELETE all users
// Route: DELETE /api/users/
// Access: Private/Admin

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "User Removed!" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// Desc: Get user by ID
// Route: GET /api/users/:id
// Access: Private/Admin

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// Desc: Update User
// Route: PUT /api/users/:id
// Access: Private/Admin

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
  // const user = await User.findById(req.user._id)
});
// The flow of the document will be: User login (Based only on Username, passowrd) -> Being check with data base -> Getting a token
// Token will be saved in the req in Headers (which cannot see?)
// then => Token will be user again to collect the infomation of the user(name, order...)
//
export {
  authUser,
  deleteUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  getUserById,
  updateUser,
};
