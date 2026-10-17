const assert = require("assert");
const User = require("../src/user");

describe("Reading from DB", () => {
  let joe;

  beforeEach(async () => {
    joe = new User({ name: "joe" });
    await joe.save();
  });

  it("finds all users with name joe", async () => {
    let records;
    records = await User.find({ name: "joe" });
    assert(records[0]._id.toString() === joe._id.toString());
  });

  it("finds joe", async () => {
    let record;
    record = await User.findOne({ name: "joe", _id: joe._id });
    assert(record.name === joe.name);
  });
});
