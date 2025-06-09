const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ mensaje: "Token requerido" });

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), "clave_secreta");
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ mensaje: "Token inválido" });
  }
};

module.exports = verificarToken;
