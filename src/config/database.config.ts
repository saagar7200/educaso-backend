import mongoose from "mongoose";
export function connectDatabase() {
  const dbURI:string = process.env.DB_URI ?? '';

  mongoose
    .connect(dbURI, {
    })
    .then(() => console.log("Connected to Database"))
    .catch((err) => console.error("Could not connect to MongoDB", err));
}
