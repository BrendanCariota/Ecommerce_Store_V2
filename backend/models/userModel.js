import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Adds a method to users that allows us to compare the text password entered with the hashed password stored in the database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Before we save a user encrypt the password
userSchema.pre("save", async function (next) {
  // All part of mongoose

  // This will check to see if the password has been modified
  // If it hasen't been modified it will just skip and move on
  if (!this.isModified("password")) {
    next();
  }

  // This will run of the password has been sent or modified
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
