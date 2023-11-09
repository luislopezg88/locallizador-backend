const express = require("express");
const User = require("../schema/user");
const { jsonResponse } = require("../lib/jsonResponse");
const getUserInfo = require("../lib/getUserInfo");
const router = express.Router();

router.post("/", async function (req, res, next) {
  const { email, password } = req.body;

  //console.log('data recibida', { email, password })

  try {
    let user = new User();
    const userExists = await user.usernameExists(email);
    //console.log('userExists', userExists)

    if (userExists) {
      user = await User.findOne({ email: email });
      //console.log('user', user)

      const passwordCorrect = await user.isCorrectPassword(
        password,
        user.password
      );

      //console.log('passwordCorrect', passwordCorrect)

      if (passwordCorrect) {
        const accessToken = user.createAccessToken();
        const refreshToken = await user.createRefreshToken();

        //console.log('todo ok')
        return res.json(
          jsonResponse(200, {
            accessToken,
            refreshToken,
            user: getUserInfo(user),
          })
        );
      } else {
        //res.status(401).json({ error: "email and/or password incorrect" });

        //console.log('email and/or password incorrect')
        return res.status(401).json(
          jsonResponse(401, {
            error: "email y/o clave incorrecta",
          })
        );
      }
    } else {
      //console.log("email does not exist");
      return res.status(401).json(
        jsonResponse(401, {
          error: "email no existe",
        })
      );
    }
  } catch (err) {
    //console.log("err",err);
  }
});

module.exports = router;
