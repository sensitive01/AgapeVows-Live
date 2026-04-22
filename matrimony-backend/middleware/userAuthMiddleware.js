
const userAuthMiddleware = (req, res, next) => {
  const userId = req.headers["user-id"];

  if (!userId) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized: User ID missing" });
  }

  req.userId = userId;
  next();
};

export default userAuthMiddleware;
