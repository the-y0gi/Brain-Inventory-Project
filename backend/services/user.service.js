import UserModel from "../models/user.model.js";

export const createUser = async ({ username, email, password, imageUrl }) => {
  try {
    if (!username || !email || !password || !imageUrl) {
     return  res.status(400).json({ message: "All fields are required" }); 
    }

    //user created
    const user = await UserModel.create({
      username,
      email,
      password,
      image: imageUrl,
    });

    return user;
  } catch (error) {
    console.log("user created issue : ", error.message);
    return "User Created ", error.message;
  }
};
