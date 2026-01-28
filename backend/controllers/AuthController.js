const User = require("../models/UserModel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const sendEmail = require("../utils/emailService.js");
/**
 * @desc   Register a new user (Traditional Sign-Up)
 * @route  POST /api/auth/register
 * @access Public
 */
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name) return res.status(400).json({ message: "Name required" });

    if (!email) return res.status(400).json({ message: "Email required" });
    if (!validator.isEmail(email))
      return res.status(400).json({ message: "Invalid Email" });

    if (!email.endsWith("@gmail.com")) {
      return res.status(400).json({ message: "Invalid Email" });
    }

    if (!password)
      return res.status(400).json({ message: "Password required" });

    if (/^\d+$/.test(password)) {
      return res
        .status(400)
        .json({ message: "Password must include letters & numbers" });
    }

    if (password.length < 8)
      return res.status(400).json({ message: "Password Too Short" });

    if (!phone)
      return res.status(400).json({ message: "Phone number required" });
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(phone))
      return res.status(400).json({ message: "Invalid phone number" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
    });
    await newUser.save();

    // console.log("Signing JWT for:", newUser._id, newUser.email); // debugging logs-------------
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    //Set JWT in HTTP-only Cookie (Secure Authentication)
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    // 4️⃣ **Send Welcome Email** (Place it before sending response)
    if (!existingUser) {
      sendEmail(
        email,
        "Welcome to Zipserve! 🚀 | Your Trusted Professional Service Partner",
        `Dear ${name},
      
      Welcome to Zipserve, India's first platform that ensures complete transparency when booking professionals. We are thrilled to have you on board!
      
       Why Choose Zipserve?  
      ✅ Verified Professionals - Book only trusted and skilled service providers.\n  
      ✅ Transparent Pricing - No hidden charges, pay only what you see. \n 
      ✅ Seamless Booking - Quick, hassle-free, and secure service reservations.\n  
      ✅ Real-time Updates - Track your service requests effortlessly. \n 
      
       Next Steps:  
      👉 Explore Services: Browse through our vast range of professional services.  
      👉 Book a Professional: Select your required service and schedule a booking.  
      👉 Enjoy Seamless Service: Experience hassle-free and high-quality service delivery.  
      
      For any assistance, feel free to contact our support team:  
      📞 Customer Support: +91-6280620947  
      📧 Email: support@zipserve.com  
      
      Thank you for choosing Zipserve! We look forward to serving you.  
      
      Best Regards,  
      Team Zipserve 
      🚀 Empowering Smart Bookings`
      ).catch((error) => console.error("Email sending failed:", error));
    }

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
      },
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//--------Traditional Login for Users-------------------------------
//  http://localhost:8080/api/auth/login
//-------------------------------------------------------------------
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email required" });
    }

    if (!password) {
      return res.status(400).json({ message: "Password required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Compare Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT Token
    // console.log("Signing JWT for:", user._id, user.email);
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Set JWT in HTTP-only Cookie
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    //email--
    const loginTime = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
    });

    sendEmail(
      email,
      "New Login Alert 🛡️",
      `Hello ${user.name},\n\nYou just logged in to your account at: ${loginTime}.\n\nIf this wasn't you, please reset your password immediately.\n\nBest Regards,\nZipserve Team`
    ).catch((error) => console.error("Email sending failed:", error));

    // Send Response
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
//logout ----------------------------
exports.logoutUser = (req, res) => {
  res.cookie("authToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(0), // Expire immediately
  });
  res.status(200).json({ message: "Logged out successfully" });
};

//---------------------User Details-------------------
exports.getUserDetails = async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from middleware (authMiddleware)

    const user = await User.findById(userId).select("-password"); // Exclude password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("User Details Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
