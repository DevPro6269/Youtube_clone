import exp from "constants";
import sendEmail from "../config/sendGrid.config.js"; // Config for sending emails (OTP)
import User from "../model/user.model.js"; // User model to interact with the database
import ApiError from "../utils/apiError.js"; // Custom error handler
import ApiResponse from "../utils/apiResponse.js"; // Custom response format
import generateAccessToken from "../utils/genrateAccessToken.js"; // Utility to generate JWT tokens

// Array of random profile pictures
const randomProfiles = [
  "https://cdn.iconscout.com/icon/premium/png-512-thumb/avatar-random-avatar-random-emotion-smiley-3-58875.png?f=webp&w=512",
  "https://cdn.iconscout.com/icon/premium/png-512-thumb/super-mario-10560121-8651071.png?f=webp&w=512",
  "https://cdn.iconscout.com/icon/premium/png-512-thumb/robot-2894150-2471737.png?f=webp&w=512",
  "https://cdn.iconscout.com/icon/premium/png-512-thumb/robot-2894122-2471709.png?f=webp&w=512",
  "https://cdn.iconscout.com/icon/premium/png-512-thumb/robot-2894130-2471717.png?f=webp&w=512"
];

// Function to return a random profile picture from the array
function getRandomProfile() {
  const randomIndex = Math.floor(Math.random() * randomProfiles.length);
  return randomProfiles[randomIndex];
}

// Temporary store for OTPs and expiration times
const otpStore = {};

// Sign-up function to register a new user and send an OTP
export async function SignUp(req, res) {
  const { firstName, lastName, password, email } = req.body;

  // Check if all required fields are provided
  if (!firstName || !lastName || !password || !email)
    return res.status(400).json(new ApiError(400, "all fields must be required"));

  // Check if user already exists
  const user = await User.findOne({ email });
  if (user)
    return res.status(400).json(new ApiError(400, "user is already registered with this email"));

  try {
    // Send OTP to email and get expiration time
    const { otp, otpExpiration } = await sendEmail(email);

    // Store OTP and expiration time temporarily
    otpStore[email] = { otp, otpExpiration };

    // Inform the user that OTP has been sent
    return res.status(200).json(new ApiResponse(200, "otp has been set to your email"));
  } catch (error) {
    console.log(error);
    return res.status(500).json(new ApiError(500, "Error sending OTP"));
  }
}

// Verify OTP function to confirm user email
export async function verifyOtp(req, res) {
  const { email, otp } = req.body;

  // Check if email and OTP are provided
  if (!email || !otp) {
    return res.status(400).json(new ApiError(400, "Email and OTP are required"));
  }

  // Check if OTP exists in the store
  if (!otpStore[email]) {
    return res.status(400).json(new ApiError(400, "OTP not found or expired"));
  }

  const { otp: storedOtp, otpExpiration } = otpStore[email];

  // Check if OTP has expired
  if (otpExpiration < Date.now()) {
    return res.status(400).json(new ApiError(400, "OTP has expired"));
  }

  // Check if OTP matches
  if (storedOtp != otp) {
    return res.status(400).json(new ApiError(400, "Invalid OTP"));
  }

  try {
    // Create a new user with verified email
    const newUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email,
      password: req.body.password, // Make sure to hash the password before saving it
      isVerified: true, // Mark user as verified
      profile: getRandomProfile(), // Assign a random profile picture
    });

    // Generate an access token for the new user
    const token = generateAccessToken(newUser._id);

    // Send the token in an HTTP-only cookie
    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: true,  // Enforce cookie over HTTPS
      maxAge: 3600000,
      sameSite: "None", // Ensure cross-origin requests are allowed
    });
    

    // Remove OTP from store after successful user creation
    delete otpStore[email];
    newUser.password = undefined; // Don't send the password in the response

    // Return the new user data
    return res.status(201).json(new ApiResponse(201, newUser, "User created successfully and verified"));
  } catch (error) {
    return res.status(500).json(new ApiError(500, "Error creating user"));
  }
}

// Login function to authenticate the user
export async function login(req, res) {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password)
    return res.status(400).json(new ApiError(400, "email and password field is required"));

  // Check if user exists in the database
  const user = await User.findOne({ email });
  if (!user)
    return res.status(404).json(new ApiError(404, "user is not registered with this email id"));

  // Validate the password
  const isValidPassword = user.comparePassword(password);
  if (!isValidPassword)
    return res.status(400).json(new ApiError(400, "user password is wrong"));

  // Generate an access token for the user
  const token = generateAccessToken(user._id);

  // Send the token in an HTTP-only cookie
  res.cookie("accessToken", token, {
    httpOnly: true,
    secure: true,  // Enforce cookie over HTTPS
    maxAge: 3600000,
    sameSite: "None", // Ensure cross-origin requests are allowed
  });
  

  user.password = undefined; // Don't send the password in the response

  // Return the logged-in user's details
  return res.status(200).json(new ApiResponse(200, user, "user login successfully"));
}

// Logout function to clear the authentication token
export async function logout(req, res) {
  const { user } = req;

  // Check if the user is logged in
  if (!user)
    return res.status(404).json(new ApiError(404, "no user found please login and try again"));

  // Clear the authentication token cookie
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Only set secure: true for production environment
    sameSite: "none", // Added sameSite for additional security
  });

  // Return success message
  return res.status(200).json(new ApiResponse(200, null, "user logout successfully"));
}

// Profile function to get the user's profile
export async function profile(req, res) {
  const { user } = req;

  // Check if the user is logged in
  if (!user)
    return res.status(404).json(new ApiError(404, "user not found please login and try again"));

  // Return the logged-in user's profile
  return res.status(200).json(new ApiResponse(200, user, "user profile retrieved successfully"));
}

// Get current user function to fetch details of the logged-in user
export async function getCurrentUser(req, res) {
  const { user } = req;

  // Check if the user is logged in
  if (!user) return res.status(400).json(new ApiError(400, "user not found please login and try again"));

  // Retrieve the user from the database and populate the associated channel
  const currentUser = await User.findById(user._id).populate("channel");

  // If the user does not exist, return an error
  if (!currentUser) return res.status(404).json(new ApiError(400, "user does not exist"));

  // Return the current user's details
  return res.status(200).json(new ApiResponse(200, currentUser, "user fetched successfully"));
}

// Update profile function to allow the user to update their details
export async function updateProfile(req, res) {
  const { user } = req;

  // Check if the user is logged in
  if (!user) return res.status(404).json(new ApiError(404, "user not found please login and try again"));

  const { firstName, lastName } = req.body;

  // Ensure at least one of firstName or lastName is provided
  if (!firstName && !lastName) {
    return res.status(400).json(new ApiError(400, "At least one of 'firstName' or 'lastName' should be provided."));
  }

  // Update the user's first and/or last name
  if (firstName) {
    user.firstName = firstName;
  }
  if (lastName) {
    user.lastName = lastName;
  }

  // Save the updated user
  const updatedUser = await user.save();

  // If update failed, return an error
  if (!updatedUser) return res.status(500).json(new ApiError(500, "something went wrong"));

  updatedUser.password = undefined; // Don't send the password in the response

  // Return the updated user details
  return res.status(200).json(new ApiResponse(200, updatedUser, "user details updated"));
}
