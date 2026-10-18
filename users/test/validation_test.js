const assert = require("assert");
const User = require("../src/user");

describe("Validating Records", () => {
  it("requires a user name", async () => {
    const newUser = new User({ name: undefined });
    const validationRes = newUser.validateSync();
    const message = validationRes.errors.name.message;
    assert(message === "Name is required");
  });

  it("requires a user name longer than 2 characters", async () => {
    const newUser = new User({ name: "li" });
    const validationRes = newUser.validateSync();
    const message = validationRes.errors.name.message;
    assert(message === "Name must be longer than 2 characters");
  });

  it("requires a user name longer than 2 characters", async () => {
    try {
      const newUser = new User({ name: "li" });
      res = await newUser.save();
    } catch (error) {
      const message = error.errors.name.message;
      assert(message === "Name must be longer than 2 characters");
    }
  });
});
