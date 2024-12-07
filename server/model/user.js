import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: [100, "max name length is 100 letters"],
      trim: true,
    },
    email: {
      type: String,
      required: true,
      maxLength: 100,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      maxLength: 200,
      trim: true,
    },
    avatar: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

userSchema.set("toJSON", { virtual: true });
userSchema.set("toObject", { virtual: true });

const User = mongoose.model("User", userSchema);

export default User;
