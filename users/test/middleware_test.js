const User = require("../src/user");
const BlogPost = require("../src/blogpost");
const assert = require("assert");

describe("Middleware", () => {
  let joe;
  beforeEach(async () => {
    joe = new User({ name: "joe" });
    blogPost = new BlogPost({
      title: "hello world",
      content: "most iconic phrase",
    });

    joe.blogPosts.push(blogPost);

    await Promise.all([joe.save(), blogPost.save()]);
  });

  it("users clean up dangling blogposts on remove", async () => {
    await joe.deleteOne();
    count = await BlogPost.countDocuments();
    assert(count === 0);
  });
});
