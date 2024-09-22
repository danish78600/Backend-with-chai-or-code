import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {ApiResponse} from '../utils/ApiResponse.js'

const registerUser = asyncHandler(async (req, res) => {
  //get user data from frontend
  //validation - not empty
  //check if user already exists : username,email
  //check or images , check for avtar
  //upload them to cloudinary
  //create user object - create entry in db
  //remove password and refresh token field from response
  //check for user creation
  //return response

  const { fullName, email, username, password } = req.body;
  console.log(username);

  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are complusary ");
  }

  const existedUser = User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw ApiError(409, "User with email or username already exists");
  }

  const avtarLocalPath = req.files?.avtar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avtarLocalPath) {
    throw new ApiError(400, "Avtar File is Required");
  }

  const avtar = await uploadOnCloudinary(avtarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avtar) {
    throw new ApiError(400, "Avtar File is Required");
  }

  const user = await User.create({
    fullName,
    avtar: avtar.url,
    coverImage: coverImage.url?.url || "",
    email,
    password,
    username: username.toLoweCase,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if(!createdUser)
  {
    throw new ApiError(500,"Something went wrong while registering user")
  }

  return res.status(201).json(
    new ApiResponse(200,createdUser,"User registered Successfully")
  )
});

export { registerUser };
