export const errorHandler = (err, req, res, next) => {
    console.error("Error:", err.message);
    const status = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
    res.status(status).json({
      success: false,
      message: err.message || "Server Error",
      stack: process.env.NODE_ENV === "development" ? err.stack : null,
    });
  };
  