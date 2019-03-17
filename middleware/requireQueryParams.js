module.exports = (req, res, next) => {
  if (
    !req.query.make ||
    !req.query.model ||
    !req.query.age ||
    !req.query.owners
  ) {
    return res.status(400).send({ error: 'Mandatory parameters requrired!' });
  }
  next();
};
