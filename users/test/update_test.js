const assert = require("assert");
const User = require("../src/user");

describe("Updating Records", () => {
  let joe;

  beforeEach(async () => {
    joe = new User({ name: "joe", likes: 0 });
    await joe.save();
  });

  async function assertName(op) {
    await op;
    records = await User.find({});
    assert(records.length === 1);
    assert(records[0].name === "alex");
  }

  it("instance type using set and save", async () => {
    joe.set("name", "alex");
    await assertName(joe.save());
  });

  it("a model instance can update", async () => {
    await assertName(joe.updateOne({ name: "alex" }));
  });

  it("a model class can update", async () => {
    await assertName(User.updateMany({ name: "joe" }, { name: "alex" }));
  });

  it("a model class can update one record", async () => {
    await assertName(User.findOneAndUpdate({ name: "joe" }, { name: "alex" }));
  });

  it("a model class can find record by id and update", async () => {
    await assertName(User.findByIdAndUpdate(joe._id, { name: "alex" }));
  });

  it("a user can have their likes incremented by 1", async () => {
    await User.updateMany({ name: "joe" }, { $inc: { likes: 5 } });
    record = await User.findOne({ name: "joe" });
    assert(record.likes === 5);
  });
});
