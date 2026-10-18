const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

before(async () => {
  await mongoose.connect("mongodb://127.0.0.1:27018/users_test");

  console.log("Good to go!");
});

beforeEach(async () => {
  const { users, comments, blogposts } = mongoose.connection.collections;

  if (users) {
    await users.deleteMany({});
  }

  if (comments) {
    await comments.deleteMany({});
  }

  if (blogposts) {
    await blogposts.deleteMany({});
  }
});

after(async () => {
  await mongoose.connection.close();
});
