const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  image: {
    type: String,
    required: true
  },
  likes: [
    {
      user: { type: Schema.Types.ObjectId, ref: "users" },
      name: { type: String, required: true }
    }
  ],
  name: { type: String, required: true },
  avatar: { type: String, required: true },
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      name: { type: String, required: true },
      avatar: { type: String },
      text: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now()
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Post = mongoose.model("posts", postsSchema);
