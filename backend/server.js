import dotenv from 'dotenv';
dotenv.config();
import app from "./app.js";

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
