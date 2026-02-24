import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const verifyAccessToken = (req, res, next) => {
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ message: "Thiếu access token" });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Token không hợp lệ hoặc hết hạn", error: err.message });
  }
};
const requireAdmin = (req, res, next) => {
  const role = String(req.user?.role || "").toLowerCase();
  if (role !== "admin") {
    return res.status(403).json({ message: "Chỉ admin được phép" });
  }
  next();
};

export{verifyAccessToken, requireAdmin}