// @ts-nocheck

import mongoose from "mongoose";
import bcryptService from "../utils/bcrypt.service";
import { admins } from "../constants/admin";
import { AdminModel } from "../models/user/admin.model";

// MongoDB connection string
const mongoURI = process.env.DB_URI ?? '';

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", async () => {
  console.log("Connected to MongoDB");

  try {
    // Define your User schema and model if not already defined
;

    for (const el of admins) {
      const user = new AdminModel(el);

      user.password = await bcryptService.hash(el.password as string);
      await user.save();
      console.info("Admin seed completed");
    }
  } catch (err) {
    console.error(err);
  } finally {
    db.close();
  }
});