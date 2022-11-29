import ErrorResponse from "../utils/errorResponse.js";

export const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  //error.statusCode = err.statusCode;
  if (err.name === "CastError") {
    const msg = "Ressource not found";
    error = new ErrorResponse(404, msg);
  }

  if (err.name === "ValidationError") {
    const msg = Object.values(err.errors).map((e) => e.message);
    error = new ErrorResponse(400, msg);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Server Error",
  });
};
