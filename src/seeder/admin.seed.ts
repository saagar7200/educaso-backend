
import mongoose from "mongoose";
import bcryptService from "../utils/bcrypt.service";
import { admins } from "../constants/admin";
import { AdminModel } from "../models/user/admin.model";
import DotenvConfiguration from "../config/env.config";

const mongoURI:string = DotenvConfiguration.DATABASE_URI ?? '';

mongoose.connect(mongoURI, {
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", async () => {
  console.log("Connected to MongoDB");

  try {
    // Iterate over the admin data
    for (const el of admins) {
      const hashedPassword = await bcryptService.hash(el.password as string);

      // Find the admin by a unique identifier, e.g., username or email
      await AdminModel.findOneAndUpdate(
        { email: el.email }, // Change to the unique identifier you use
        {
          ...el,
          password: hashedPassword
        },
        {
          upsert: true, // Create the document if it doesn't exist
          new: true, // Return the updated document
          setDefaultsOnInsert: true // Apply default values if creating a new document
        }
      );

      console.info("Admin seed completed for:", el.email);
    }
  } catch (err) {
    console.error(err);
  } finally {
    db.close();
  }
});