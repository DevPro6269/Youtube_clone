import sendEmail from "../config/sendGrid.config.js";
import User from "../model/user.model.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js"
import generateAccessToken from "../utils/genrateAccessToken.js"


const otpStore = {};

export async function SignUp(req,res){
   const{firstName,lastName,password,email}=req.body;
   if(!firstName||!lastName||!password||!email)return res.status(400).json(new ApiError(400,"all fields must be required"))

   const user = await User.findOne({email});

   if(user)return res.status(400).json(new ApiError(400,"user is already registered with this email"))
       
    try {
        const { otp, otpExpiration } = await sendEmail(email);
    
        // Store OTP and expiration time temporarily (could be in memory or session)
        otpStore[email] = { otp, otpExpiration };
    
        // Respond to the user to inform them that OTP was sent
        return res.status(200).json({
          message: 'OTP has been sent to your email for verification',
        });
      } catch (error) {
        console.log(error)
        return res.status(500).json(new ApiError(500, 'Error sending OTP'));
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

export async function verifyOtp(req,res){
    const { email, otp } = req.body;
    console.log(req.body);
    
    if (!email || !otp) {
        return res.status(400).json(new ApiError(400, 'Email and OTP are required'));
      }

      if (!otpStore[email]) {
        return res.status(400).json(new ApiError(400, 'OTP not found or expired'));
      }
       
      const { otp: storedOtp, otpExpiration } = otpStore[email];
       
      if (otpExpiration < Date.now()) {
        return res.status(400).json(new ApiError(400, 'OTP has expired'));
      }
      
      if (storedOtp != otp) {
        return res.status(400).json(new ApiError(400, 'Invalid OTP'));
      }

      try {
        const newUser = await User.create({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email,
          password: req.body.password,  // Make sure you hash the password before saving
          isVerified: true,  // Mark as verified
        });
        
        
        const token = generateAccessToken(newUser._id); // Use _id as userId

        // Send the token in an HTTP-only cookie
        res.cookie("accessToken", token, {
            httpOnly: true,
            maxAge: 3600000, // Token expiration time in ms (1 hour)
            secure: process.env.NODE_ENV === 'production', // Use secure cookie in production
            sameSite: 'Strict', // Prevent CSRF attacks
        });


        delete otpStore[email];
        return res.status(201).json({
            message: 'User created successfully and verified',
            user: newUser,
          });
        } catch (error) {
          return res.status(500).json(new ApiError(500, 'Error creating user'));
        }
}
