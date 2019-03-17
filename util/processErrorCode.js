module.exports = function(statusCode, message, vehicleMakeModel, res) {
  /*
   * Utility Function to send error code
   */
  res.status(statusCode).send({
    error: `${message} ${vehicleMakeModel} not foundsd!`
  });
};
