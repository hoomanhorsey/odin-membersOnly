#! /usr/bin/env node

const { Client } = require("pg");

const SQL = `

DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users ( 
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    firstName TEXT, 
    lastName TEXT,
    email TEXT UNIQUE NOT NULL,  
    password TEXT,
    membershipStatus BOOLEAN DEFAULT FALSE,
    adminStatus BOOLEAN DEFAULT FALSE
    );

CREATE TABLE messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id INTEGER NOT NULL,
    messagetitle TEXT,
    messageext TEXT NOT NULL,
    timeCreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
    );

INSERT INTO users (firstName, lastName, email, password, membershipStatus, adminStatus) 
VALUES
  ('Andrew','Ma', 'andrew@mail.com', 'Blankpassword', TRUE, TRUE);

  INSERT INTO messages (user_id, messageTitle, messageText) 
VALUES 
  (1, 'Hello World', 'First message on this app'),
  (1, 'Hellow world again', 'Second message how that')
  `;

async function main() {
  console.log("seeding...");

  const dbUrl = process.env.DATABASE_URL;

  if (!dbUrl) {
    throw new Error("DATABASE_URL is not set");
  }

  const client = new Client({
    connectionString: dbUrl,
  });

  await client.connect();
  await client.query(SQL);
  await client.end();

  console.log("done");
}

main();

// async function main() {
//   console.log("seeding...");
//   const client = new Client({
//     connectionString: "postgresql://dev_user@localhost:5432/members_only",
//   });
//   await client.connect();
//   await client.query(SQL);
//   await client.end();
//   console.log("done");
// }

// main();
