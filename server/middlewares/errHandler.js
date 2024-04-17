const errHandler = (err, req, res, next) => {
    switch (err.name) {
        case "SequelizeUniqueConstraintError":
        case "SequelizeValidationError":
            res.status(400).json({ message: err.errors[0].message })
            break;

        case "InvalidToken":
        case "JsonWebTokenError":
            res.status(401).json({ message: "Invalid token" })
            break;

        case "invalidRegister":
            res.status(400).json({ message: `${err.field} is required` })
            break;

        case "EmailRequired":
            res.status(400).json({ message: "Email is required" })
            break;

        case "unauthorized":
            res.status(401).json({ message: `Invalid email/password` })
            break;

        case "NotFound":
            res.status(404).json({ message: "Data not found" })
            break;

        case "bookSucces":
            res.status(400).json({ message: "Already Booking" })
            break;

        case "BadRequest":
            res.status(400).json({ message: `${err.field} cannot be empty` })
            break;

        case "invalidDelete":
            res.status(400).json({ message: `Played Hero cannot be deleted` })
            break;


        default:
            console.log(err);
            res.status(500).json({ message: "Internal Server Error" })
            break;
    }
}

module.exports = { errHandler }