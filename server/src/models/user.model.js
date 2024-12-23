import pool from "../../config/db/conection.db.js";
import bcrypt from "bcryptjs";

const createNewUser = async (email, lenguage, password, rol) => {
  const hashedPassword = bcrypt.hashSync(password);
  const SQLquery = {
    text: "INSERT INTO usuarios (email, lenguage, password, rol) VALUES ($1, $2, $3, $4) RETURNING *",
    values: [email, lenguage, hashedPassword, rol],
  };
  const user = await pool.query(SQLquery);
  return user.rows[0];
};

const byEmail = async (email) => {
  const SQLquery = {
    text: "SELECT * FROM usuarios WHERE email = $1",
    values: [email],
  };
  const user = await pool.query(SQLquery);
  
  return user.rows[0];
};

export { createNewUser, byEmail };
