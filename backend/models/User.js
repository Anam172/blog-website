import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, 
    googleId: { type: String, unique: true, sparse: true }, // ✅ Prevents duplicate Google users
    profilePic: {
      type: String,
      default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT79-tMffOqIXeX4EPdTMbuFsFhReGuavAnow&s", // ✅ Default avatar
    },
  },
  { timestamps: true }
);

// ✅ Hash password before saving (Only if it exists & is modified)
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) return next();

  // Prevent double hashing
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

// ✅ Add method to compare passwords
UserSchema.methods.matchPassword = async function (enteredPassword) {
  const user = await this.constructor.findById(this._id).select("+password");
  return user ? bcrypt.compare(enteredPassword, user.password) : false;
};

export default mongoose.model("User", UserSchema);


// Drop the existing index on `username` if it exists
UserSchema.set("autoIndex", false); // Disable automatic index creation

async function removeUsernameIndex() {
  try {
    await mongoose.connection.db.collection("users").dropIndex("username_1");
    console.log("✅ Dropped existing 'username' unique index!");
  } catch (error) {
    if (error.code === 27) {
      console.log("ℹ️ Index does not exist, skipping...");
    } else {
      console.error("❌ Error removing index:", error);
    }
  }
}

// Call function after model is created
removeUsernameIndex();
