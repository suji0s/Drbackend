import jwt from "jsonwebtoken";
const chekToken = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(403).json({ message: "you are not authorized" });
    }
    const ogToken = token.split(" ")[1];
    const isValid = jwt.verify(ogToken, process.env.USER_SECRET_KEY);

    console.log(isValid);
    next();
  } catch (e) {
    return res.status(403).json({ message: "you are not authorized" });
  }
};
export default chekToken;
