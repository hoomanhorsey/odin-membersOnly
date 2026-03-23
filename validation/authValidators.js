const { body, validationResult, matchedData } = require("express-validator");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";

const validateUser = [
  body("firstName")
    .trim()
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`First name ${lengthErr}`),
  body("lastName")
    .trim()
    .isAlpha()
    .withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Last name ${lengthErr}`),

  body("email")
    .trim()

    .isLength({ min: 1, max: 20 })
    .withMessage(`Email ${lengthErr}`),
  body("passwordhash")
    .trim()
    .isAlpha()
    .withMessage(`passwordhash ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`passwordhash ${lengthErr}`),
];

// We can pass an entire array of middleware validations to our controller.
exports.usersCreatePost = [
  validateUser,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("createUser", {
        title: "Create user",
        errors: errors.array(),
      });
    }

    // PLACEHOLDER IN THE EXAMPLE WHEN THERE WA NO DATABASE. ADAPT TO EXISTING DATABASE.
    const { firstName, lastName } = matchedData(req);
    usersStorage.addUser({ firstName, lastName });
    res.redirect("/");
  },
];

module.exports = { validateUser };
