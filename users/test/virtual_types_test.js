const assert = require("assert");
const User = require("../src/user");

describe("Virtualize Types", () => {
  it("postCount returns correct number of posts", async () => {
    const joe = new User({
      name: "joe",
      posts: [{ title: "hello world" }],
    });

    await joe.save();
    res = await User.findOne({ name: "joe" });
    assert(res.postCount === 1);
  });
});
