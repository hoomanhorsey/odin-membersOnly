const { body, validationResult, matchedData } = require("express-validator");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 20 characters.";

const validateUser = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage(`First name cannot be empty`)
    .bail()
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 20 })
    .withMessage(`First name ${lengthErr}`),
  body("lastName")
    .trim()
    .notEmpty()
    .withMessage(`Last name cannot be empty`)
    .bail()
    .isAlpha()
    .withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 20 })
    .withMessage(`Last name ${lengthErr}`),
  body("email")
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage(`Email ${lengthErr}`)
    .isEmail()
    .withMessage("Invalid email")
    .normalizeEmail(),
  body("password")
    .trim()
    .notEmpty()
    .withMessage(`Password cannot be empty`)
    .bail()
    .isLength({ min: 1, max: 20 })
    .withMessage(`password ${lengthErr}`)
    .matches(/\d/)
    .withMessage("Password must include a number")
    .matches(/[A-Z]/)
    .withMessage("Password must include an uppercase letter")
    .matches(/[^A-Za-z0-9]/)
    .withMessage("Password must include a symbol"),
  body("confirmPassword")
    .trim()
    .notEmpty()
    .withMessage("Confirm password cannot be empty")
    .bail()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
  // checkbox: converts "1" to true, missing → omitted
  body("adminstatus").optional().toBoolean(),
];

module.exports = { validateUser };
