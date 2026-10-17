const assert = require("assert");
const User = require("../src/user");

describe("Deleting Records", () => {
  let joe;

  beforeEach(async () => {
    joe = new User({ name: "joe" });
    await joe.save();
  });

  it("model instance remove", async () => {
    await joe.deleteOne();
    records = await User.findOne({ name: "joe" });
    assert(records === null);
  });

  it("class method remove", async () => {
    await User.deleteMany({ name: "joe" });
    records = await User.findOne({ name: "joe" });
    assert(records === null);
  });

  it("class method find one and remove", async () => {
    await User.findOneAndDelete({ name: "joe" });
    records = await User.findOne({ name: "joe" });
    assert(records === null);
  });

  it("class method find by id and remove", async () => {
    await User.findByIdAndDelete(joe._id);
    records = await User.findOne({ name: "joe" });
    assert(records === null);
  });
});
