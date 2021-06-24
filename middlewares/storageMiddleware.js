module.exports = () => {
  return (req, res, next) => {
      // TODO - import and decorate services
      req.storage = {};
  };
};