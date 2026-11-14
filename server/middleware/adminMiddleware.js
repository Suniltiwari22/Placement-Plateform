const adminMiddleware = (req, res, next) => {

    console.log("===== ADMIN CHECK =====");
    console.log("User:", req.user);
    console.log("User role:", req.user?.role);
    console.log("=======================");

    if (!req.user) {
        return res.status(401).json({
            message: "Not authorized. Please login first."
        });
    }

    if (req.user.role !== "admin") {
        return res.status(403).json({
            message: "Access denied. Admin only."
        });
    }

    next();
};

export default adminMiddleware;