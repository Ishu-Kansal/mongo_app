const assert = require("assert");
const User = require("../src/user");

describe("Reading from DB", () => {
  let joe, alex, maria, zach;

  beforeEach(async () => {
    joe = new User({ name: "joe" });
    alex = new User({ name: "alex" });
    maria = new User({ name: "maria" });
    zach = new User({ name: "zach" });
    await Promise.all([joe.save(), alex.save(), maria.save(), zach.save()]);
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

  it("paginates with skip and limit", async () => {
    let mylist = await User.find({}).sort({ name: 1 }).skip(1).limit(2);
    assert(mylist[0].name === "joe");
    assert(mylist[1].name === "maria");
  });
});
