const User = require("../models/UserModel");
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleLogin = async (req, res) => {
  try {
    console.log("Received Google login request");

    const { token } = req.body;
    if (!token) {
      console.error("Token not provided");
      return res.status(400).json({ message: "Token required" });
    }

    // console.log("Verifying Google token...");
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    // console.log("Google token verified successfully", payload);

    const { email, name, picture, sub } = payload;
    if (!email) {
      console.error("No email found in Google payload");
      return res
        .status(400)
        .json({ message: "Google account must have an email" });
    }

    // console.log("Checking if user exists in database...");
    let user = await User.findOne({ email });

    if (user) {
      //   console.log("User found in database", user);
      if (!user.googleId) {
        user.googleId = sub;
        await user.save();
        console.log("Updated user with Google ID");
      }
    } else {
      console.log("User not found, creating new user...");
      user = new User({
        name,
        email,
        password: null,
        phone: "",
        googleId: sub,
        userImage: picture || "default-image-url",
        coins: 0.0,
        wallet: 256,
        address: "",
        age: 18,
        dob: null,
        favouriteWorkers: [],
      });
      await user.save();
      //   console.log("New user created successfully");
    }

    console.log("Generating JWT token...");
    const authToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    console.log("JWT token generated");

    // console.log("Setting auth token in HTTP-only cookie...");
    res.cookie("authToken", authToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    console.log("Sending response with user details");
    res.status(200).json({
      message: "Login successful",
      token: authToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        userImage: user.userImage,
        coins: user.coins,
        wallet: user.wallet,
        address: user.address,
      },
    });
  } catch (error) {
    console.error("Google Login Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
