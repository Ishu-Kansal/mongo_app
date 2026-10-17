const assert = require("assert");
const User = require("../src/user");

describe("Creating Records", () => {
  it("saves a user", async () => {
    const joe = new User({ name: "joe" });

    await joe.save();

    assert.strictEqual(joe.isNew, false);
  });
});
