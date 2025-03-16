const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(403).json({ mensaje: "Acceso denegado" });

    try {
        const verified = jwt.verify(token, process.env.SECRET_KEY);
        req.usuario = verified;
        next();
    } catch (error) {
        res.status(401).json({ mensaje: "Token inválido" });
    }
};
