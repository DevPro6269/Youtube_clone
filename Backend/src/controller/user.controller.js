import exp from "constants";
import sendEmail from "../config/sendGrid.config.js";
import User from "../model/user.model.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import generateAccessToken from "../utils/genrateAccessToken.js";

const randomProfiles = [
  "https://cdn.iconscout.com/icon/premium/png-512-thumb/avatar-random-avatar-random-emotion-smiley-3-58875.png?f=webp&w=512",
  "https://cdn.iconscout.com/icon/premium/png-512-thumb/super-mario-10560121-8651071.png?f=webp&w=512",
  "https://cdn.iconscout.com/icon/premium/png-512-thumb/robot-2894150-2471737.png?f=webp&w=512",
  "https://cdn.iconscout.com/icon/premium/png-512-thumb/robot-2894122-2471709.png?f=webp&w=512",
  "https://cdn.iconscout.com/icon/premium/png-512-thumb/robot-2894130-2471717.png?f=webp&w=512"
]

function getRandomProfile() {
  const randomIndex = Math.floor(Math.random() * randomProfiles.length);
  return randomProfiles[randomIndex];
}


const otpStore = {};

export async function SignUp(req, res) {
  const { firstName, lastName, password, email } = req.body;
  if (!firstName || !lastName || !password || !email)
    return res
      .status(400)
      .json(new ApiError(400, "all fields must be required"));

  const user = await User.findOne({ email });

  if (user)
    return res
      .status(400)
      .json(new ApiError(400, "user is already registered with this email"));

  try {
    const { otp, otpExpiration } = await sendEmail(email);

    // Store OTP and expiration time temporarily (could be in memory or session)
    otpStore[email] = { otp, otpExpiration };

    // Respond to the user to inform them that OTP was sent
    return res.status(200).json(new ApiResponse(200,"otp has been set to your email"));
  } catch (error) {
    console.log(error);
    return res.status(500).json(new ApiError(500, "Error sending OTP"));
  }

  // const newUser = await User.create({
  //     firstName,
  //     lastName,
  //     email,
  //     password
  // })

  // if(!newUser)return res.status(400).json(400,"error while creating a new user")

  //     const token = generateAccessToken(newUser._id); // Use _id as userId

  //     // Send the token in an HTTP-only cookie
  //     res.cookie("accessToken", token, {
  //         httpOnly: true,
  //         maxAge: 3600000, // Token expiration time in ms (1 hour)
  //         secure: process.env.NODE_ENV === 'production', // Use secure cookie in production
  //         sameSite: 'Strict', // Prevent CSRF attacks
  //     });

  //  return res.status(201).json(new ApiResponse(201,newUser,"user sign up successfully"))
}
 
export async function verifyOtp(req, res) {
  const { email, otp } = req.body;
  console.log(req.body);

  if (!email || !otp) {
    return res
      .status(400)
      .json(new ApiError(400, "Email and OTP are required"));
  }

  if (!otpStore[email]) {
    return res.status(400).json(new ApiError(400, "OTP not found or expired"));
  }

  const { otp: storedOtp, otpExpiration } = otpStore[email];

  if (otpExpiration < Date.now()) {
    return res.status(400).json(new ApiError(400, "OTP has expired"));
  }

  if (storedOtp != otp) {
    return res.status(400).json(new ApiError(400, "Invalid OTP"));
  }

  try {
    const newUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email,
      password: req.body.password, // Make sure you hash the password before saving
      isVerified: true, // Mark as verified
      profile:getRandomProfile(),
    });

    const token = generateAccessToken(newUser._id); // Use _id as userId

    // Send the token in an HTTP-only cookie
    res.cookie("accessToken", token, {
      httpOnly: true,
      maxAge: 3600000, // Token expiration time in ms (1 hour)
      secure: process.env.NODE_ENV === "production", // Use secure cookie in production
      sameSite: "Strict", // Prevent CSRF attacks
    });

    delete otpStore[email];
    newUser.password=undefined;
    return res.status(201).json(new ApiResponse(201,newUser,"User created successfully and verified"));
  } catch (error) {
    return res.status(500).json(new ApiError(500, "Error creating user"));
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(400)
      .json(new ApiError(400, "email and password field is required"));

  const user = await User.findOne({ email });
  if (!user)
    return res
      .status(404)
      .json(new ApiError(404, "user is not registered with this email id"));

  const isValidPassword = user.comparePassword(password);
  if (!isValidPassword)
    return res.status(400).json(new ApiError(400, "user password is wrong"));

  const token = generateAccessToken(user._id);

  res.cookie("accessToken", token, {
    httpOnly: true,
    secure: false,
    maxAge: 3600000,
    sameSite: "Strict",
  });
  user.password=undefined;
  
  return res
    .status(200)
    .json(new ApiResponse(200, user, "user login succesfully"));
}

export async function logout(req, res) {
  const { user } = req;
  console.log("aa gyi ");
  
  if (!user)
    return res
      .status(404)
      .json(new ApiError(404, "no user find please login and try again"));

      res.clearCookie("accessToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Only set secure: true for production environment
        sameSite: 'strict', // Added sameSite for additional security
      });

  return res
    .status(200)
    .json(new ApiResponse(200, null, "user logout successfully"));
}

export async function profile(req,res) {
    const{user}=req;
    if(!user)return res.status(404).json(new ApiError(404,"user not found please login and try again"));
    
    return res.status(200).json(new ApiResponse(200,user,"user profile retrived successfully"))
}

export async function getCurrentUser(req,res) {
  const{user} = req ;
  if(!user) return res.status(400).json(new ApiError(400,"user not found please login and try again"))
  
    const currentUser = await User.findById(user._id).populate("channel")

    if(!currentUser)return res.status(404).json(new ApiError(400,"user does not exist"));

    return res.status(200).json(new ApiResponse(200,currentUser,"user fetch successfully"))
}

export async function updateProfile(req,res) {
    const{user}=req;

    if(!user)return res.status(404).json(new ApiError(404,"user not found please login and try again"));

    const{firstName,lastName}= req.body
    
    if (!firstName && !lastName) {
        return res.status(400).json(new ApiError(400, "At least one of 'firstName' or 'lastName' should be provided."));
     }

    if(firstName){
        user.firstName=firstName
    }
    if(lastName){
        user.lastName=lastName
    }
   
    const updatedUser = await user.save()
   if(!updatedUser)return res.status(500).json(new ApiError(500,"something went wrong"))
 updatedUser.password=undefined
    return res.status(200).json(new ApiResponse(200,updatedUser,"user details updated"))
}
