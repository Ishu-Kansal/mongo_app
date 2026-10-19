const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PostSchema = require("./post");

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => {
        return name.length > 2;
      },
      message: "Name must be longer than 2 characters",
    },
    required: [true, "Name is required"],
  },
  posts: [PostSchema],
  likes: Number,
  blogPosts: [
    {
      type: Schema.Types.ObjectId,
      ref: "blogPost",
    },
  ],
});

UserSchema.virtual("postCount").get(function () {
  return this.posts.length;
});

UserSchema.pre("deleteOne", { document: true }, async function () {
  const BlogPost = mongoose.model("blogPost");
  await BlogPost.deleteMany({ _id: { $in: this.blogPosts } });
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
