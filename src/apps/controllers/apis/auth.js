const UserModel = require("../../models/user");
const jwt = require("jsonwebtoken");

exports.signin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email);
  try {
    const data = await UserModel.find({
      email,
    });
    if (!data.length) {
      return res.status(400).json({
        message: "No user using this email!",
      });
    }
    console.log(data);
    if (data[0].password !== password) {
      return res.status(400).json({
        message: "Wrong Password!",
      });
    }
    const accessToken = jwt.sign(
      {
        username: data[0].name,
        email: data[0].name.email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "10m",
      }
    );
    // Creating refresh token not that expiry of refresh
    //token is greater than the access token

    const refreshToken = jwt.sign(
      {
        username: data[0].name.username,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    req.session.accessToken = accessToken;
    // Assigning refresh token in http-only cookie
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.json({ accessToken });
  } catch (e) {
    console.log("err", e);
  }
  //   console.log(email, password);
  //   res.send("OK");
};

exports.refresh = (req, res) => {
  console.log(req.cookies?.jwt);
  console.log(req.session?.accessToken);
  if (req.cookies?.jwt) {
    // Destructuring refreshToken from cookie
    const refreshToken = req.cookies.jwt;

    // Verifying refresh token
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) {
          // Wrong Refesh Token
          return res.status(406).json({ message: "Unauthorized" });
        } else {
          // Correct token we send a new access token
          console.log(new Date(decoded.exp));
          const accessToken = jwt.sign(
            {
              username: "Tung",
              email: decoded.body.email,
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
              expiresIn: "10m",
            }
          );
          req.sesion.accessToken = accessToken;
          return res.json({ accessToken });
          // return res.json("OK");
        }
      }
    );
  } else {
    return res.status(406).json({ message: "Unauthorized" });
  }
};
