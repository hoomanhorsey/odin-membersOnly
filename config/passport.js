console.log("Passport config loaded");

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const pool = require("../db/pool");
const bcrypt = require("bcryptjs");

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        console.log(email, password);
        const { rows } = await pool.query(
          "SELECT * FROM users WHERE email = $1",
          [email],
        );
        const user = rows[0];
        console.log("user from database, ", user);
        if (!user) {
          console.log(
            "incorrect, email but it isnt showing up in the website, just console",
          );

          return done(null, false, { message: "Incorrect email" });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          // passwords do not match!
          return done(null, false, { message: "Incorrect password" });

          // if (user.password !== password) {
          //   console.log(
          //     "incorrect, password but it isnt showing up in the website, just console",
          //   );
          return done(null, false, { message: "Incorrect password" });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    const user = rows[0];

    done(null, user);
  } catch (err) {
    done(err);
  }
});
