import userModel from "../models/user.model.js";
import { sendEmailToUser } from "../services/mail.service.js";
import { createUser } from "../services/user.service.js";
import { validationResult } from "express-validator";
import crypto from "crypto";

export const userRegister = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    // Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json("all filed are required");
    }

    // Check if user already exists
    const isUserAlready = await userModel.findOne({ email });

    if (isUserAlready) {
      return res.status(400).json({ message: "User already exist" });
    }

    // Image upload logic
    let imageUrl;
    if (req.file && req.file.path) {
      imageUrl = req.file.path;
    } else {
      return res.status(400).json({ error: "Profile image is required." });
    }

    //hash password
    const hashedPassword = await userModel.hashPassword(password);

    //user are created
    const userCreated = await createUser({
      username,
      email,
      password: hashedPassword,
      imageUrl,
    });

    if (!userCreated) {
      return res.status(500).json("failed to create user");
    }

    //verification code are generated.
    const verificationToken = crypto.randomBytes(32).toString("hex");

    // Save token to user document
    userCreated.verificationToken = verificationToken;
    await userCreated.save();

    // token are generated
    const token = userCreated.generateAuthToken();

    const fullUrl = `${req.protocol}://${req.get('host')}`;

    // Email Sent to user
    const sentMail = await sendEmailToUser({
      email,
      username,
      verificationToken: userCreated.verificationToken,
      fullUrl
    });

    if (!sentMail) {
      return res
        .status(500)
        .json({ message: "Failed to send email to the user." });
    }

    const userObject = userCreated.toObject();
    const {
      password: _pass,
      verificationToken: _vt,
      __v,
      _id,
      ...safeUser
    } = userObject;

 
    res.status(201).json({
      user: safeUser,
      message: "User mail was successfully sent",
    });
  } catch (error) {
    // Error handling for user registration
    console.error("user register issue: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const verifyEmail = async (req, res) => {
  try {


    const { token } = req.query;

    if (!token) {
      return res
        .status(400)
        .json({ message: "Verification token is missing." });
    }

    const user = await userModel.findOne({ verificationToken: token });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired verification token." });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.status(200).json({ message: "Email successfully verified." });

  } catch (error) {
    console.error("Email verification error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
