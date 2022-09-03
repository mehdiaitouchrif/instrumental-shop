const errorHandler = (err, req, res, next) => {
  // Error Logs
  console.log(err.name);

  // CastError
  if (err.name === "CastError") {
    err.message = `Invalid ID`;
    err.code = 404;
  }

  // Validation Errors
  if (err.name === "ValidationError") {
    const keys = Object.keys(err.errors);
    const values = Object.values(err.errors);
    let errorArray = [];
    values.forEach((val, index) => {
      errorArray.push({
        [keys[index]]: val.properties.message,
      });
    });
    err.message = errorArray;
    err.code = 400;
  }

  // Duplicate Keys 11000
  if (err.code === 11000) {
    err.message = `This ${Object.keys(err.keyValue)[0]} already exists`;
    err.code = 400;
  }

  res.status(err.code || 500).json({
    success: false,
    errors: (err && err.message) || "Internal Server Error",
  });
};

module.exports = errorHandler;
