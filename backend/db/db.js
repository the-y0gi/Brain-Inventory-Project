import mongoose from "mongoose";

//mongodb connection
const mongoDBConnected = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Database Connected"))
    .catch((err) => console.log("❌ DB Connection Error:", err));
};

export default mongoDBConnected;