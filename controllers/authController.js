const jwt = require("jsonwebtoken");

let users = [
  {
    email: "dc@gmail.com",
    password: "123456",
  },
];

let refreshTokens = [];

const login = (req, res) => {
  const user = users.find(
    (x) => x.email === req.body.email && x.password === req.body.password
  );

  if (user) {
    const accessToken = generateAccessToken(req.body.email);
    const refreshToken = generateRefreshToken(req.body.email);

    refreshTokens.push(refreshToken);

    res.status(200).json({ token: accessToken, refreshToken: refreshToken });
  } else res.status(401).json({ message: "YOU! SHALL NOT PASS!!" });
};

const refreshToken = (req, res) => {
  console.log("API callled");

  if (!req.body.token) return res.status(401).json();

  if (refreshTokens.includes(req.body.token)) {
    jwt.verify(req.body.token, process.env.REFRESH_TOKEN_SECRET, (err, obj) => {
      if (err) return res.statusCode(401);

      const newToken = generateAccessToken(obj.email);

      return res.status(200).json(newToken);
    });
    res.status(200).json();
  }
  res.status(401).json();
};

const createUser = (req, res) => {
  users.push({ email: req.body.email, password: req.body.password });
  res.status(201).json(users);
  // res.json(req.body);
};

const logout = (req, res) => {
  refreshTokens.filter((token) => token !== req.body.token);
  res.statusCode(204);
};

// Middleware

const authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "YOU! SHALL NOT PASS!!" });
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(500).json(err);
    next();
  });
};

// Exports
module.exports = {
  login,
  refreshToken,
  createUser,
  authenticate,
  logout,
};

// Private functions

const generateAccessToken = (user) => {
  return jwt.sign({ email: user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "2m",
    issuer: "DC",
    subject: "NOTHING",
  });
};
const generateRefreshToken = (user) => {
  return jwt.sign({ email: user }, process.env.REFRESH_TOKEN_SECRET);
};
