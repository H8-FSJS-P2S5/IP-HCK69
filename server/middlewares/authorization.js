const sender = (req, res, next) => {
    try {
      if (req.user.id === req.params.id) {
        next();
      } else {
        throw { name: "accessNotAllowed" };
      }
    } catch (error) {
      next(error);
    }
  }
  
module.exports = {sender};
  