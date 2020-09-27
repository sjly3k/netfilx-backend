import jwt from "jsonwebtoken";
import "./env"

export const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET); 