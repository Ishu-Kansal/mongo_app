const mongoose = require("mongoose");
const User = require("../src/user");
const Comment = require("../src/comment");
const BlogPost = require("../src/blogpost");
const assert = require("assert");

describe("Associations", () => {
  let joe, blogPost, comment;

  beforeEach(async () => {
    joe = new User({ name: "joe" });
    blogPost = new BlogPost({
      title: "hello world",
      content: "most iconic phrase",
    });
    comment = new Comment({ content: "robots rule" });

    joe.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.author = joe;

    await Promise.all([joe.save(), blogPost.save(), comment.save()]);
  });

  it("saves a relation between user and blogpost", async () => {
    userRec = await User.findOne({ name: "joe" }).populate("blogPosts");
    assert(userRec.blogPosts[0].title === "hello world");
  });

  it("saves the full document recursively", async () => {
    doc = await User.findOne({ name: "joe" }).populate({
      path: "blogPosts",
      populate: {
        path: "comments",
        model: "comment",
        populate: {
          path: "author",
          model: "user",
        },
      },
    });

    assert(doc.name === "joe");
    assert(doc.blogPosts[0].title === "hello world");
    assert(doc.blogPosts[0].comments[0].content === "robots rule");
    assert(doc.blogPosts[0].comments[0].author.name === "joe");
  });
});
