const assert = require("assert");
const User = require("../src/user");

describe("Validating Records", () => {
  it("can create a subdocument", async () => {
    const joe = new User({
      name: "joe",
      posts: [{ title: "hello world" }],
    });

    await joe.save();
    rec = await User.findOne({ name: "joe" });
    assert(rec.posts[0].title === "hello world");
  });

  it("can add a subdocument to existing user", async () => {
    const joe = new User({
      name: "joe",
      posts: [{ title: "hello world" }],
      postCount: 1,
    });

    await joe.save();
    rec = await User.findOne({ name: "joe" });
    rec.posts.push({ title: "my second post" });

    await User.updateOne({ name: "joe" }, rec);

    recFinal = await User.findOne({ name: "joe" });
    assert(recFinal.posts[1].title === "my second post");
  });

  it("can remove an existing subdocument from existing user", async () => {
    const joe = new User({
      name: "joe",
      posts: [{ title: "hello world" }],
      postCount: 1,
    });

    await joe.save();
    rec = await User.findOne({ name: "joe" });
    const post = rec.posts[0];
    rec.posts.pull(post._id);

    await rec.save();

    recFinal = await User.findOne({ name: "joe" });
    assert(recFinal.posts.length === 0);
  });
});
