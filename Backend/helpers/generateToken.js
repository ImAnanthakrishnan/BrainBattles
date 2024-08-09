import jwt from "jsonwebtoken";

class Token {
  constructor(user) {
    this.user = user;
  }
  generateToken() {
    return jwt.sign({ id: this.user._id }, process.env.JWT_SECRET, {
      expiresIn: "1hr",
    });
  }
}

export default Token;