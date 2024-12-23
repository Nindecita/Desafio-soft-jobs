import { byEmail, createNewUser } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  try {
    const { email, lenguage, password, rol } = req.body;
    const user = await createNewUser(email, lenguage, password, rol);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await byEmail(email);
    if (!user) {
      return res.status(400).json({ message: "el usuario no existe" });
    }

    const passwordValid = bcrypt.compareSync(password, user.password);
    if (!passwordValid) {
      return res.status(400).json({ message: "Password incorrecto" });
    }
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json(error);
  }
};

const findUser = async (req, res) => {
  try {
    const { email } = req.user;
    const user = await byEmail(email);
    res.status(200).json([user]);
  } catch (error) {
    res.status(500).json(error);
  }
};
export { registerUser, loginUser, findUser };
