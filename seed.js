// stuff to seed fake data to MongoDB

const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");

require("dotenv").config();

const { DB_HOST } = process.env;

const positions = require("./helpers/abz-test.positions.json");

const User = require("./models/user");

const connectDB = async () => {
  try {
    await mongoose.connect(DB_HOST);
    console.log("connected to db");
  } catch (error) {
    console.error(error);
  }
};
connectDB();

const randomDate = () => {
  const start = new Date(2012, 0, 1);
  const end = new Date();
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

const generateUsers = (number) => {
  const users = [];

  for (let index = 0; index < number; index++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const name = firstName + " " + lastName;
    const email = faker.internet.email({
      firstName,
      lastName,
    });
    const uniqueEmail = users.find((el) => el.email === email)
      ? faker.internet.email({ firstName, lastName: lastName + index })
      : email;
    const phone =
      "+380" + faker.string.numeric({ length: 9, allowLeadingZeros: false });
    const random = Math.floor(Math.random() * positions.length);
    const randomPosition = positions[random];
    const position = randomPosition.title;
    const position_id = randomPosition._id.$oid;
    const password = faker.internet.password({ length: 6 });
    const avatarBaseUrl = "https://eu.ui-avatars.com/api/";
    const avatarSettings = "&size=250&rounded=true";
    const photo =
      avatarBaseUrl + `?name=${name.replace(/ /g, "+")}` + avatarSettings;
    const createdAt = randomDate();

    users.push({
      name,
      email: uniqueEmail,
      phone,
      position,
      position_id,
      password,
      photo,
      createdAt,
    });
  }
  return users;
};

const usersData = generateUsers(40);

User.insertMany(usersData)
  .then((docs) =>
    console.log(`${docs.length} users have been inserted into the database.`)
  )
  .catch((error) => {
    console.error(error);
    console.error(
      `${
        err.writeErrors?.length ?? 0
      } errors occurred during the insertMany operation.`
    );
  });
