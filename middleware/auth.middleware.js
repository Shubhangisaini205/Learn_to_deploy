const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {
    const token = req.headers.authorization
    if (token) {
        try {
            const decoded = jwt.verify(token.split(" ")[1], 'masai');
            if (decoded) {
                // console.log(decoded)
                req.body.authorId=decoded.authorId;
                req.body.author=decoded.author;
                next()
            } else {
                res.send({ "msg": "Please Login!!" })
            }
        } catch (error) {
            res.send({"msg": "Please Login!!" })
        }

    } else {
        res.send({ "msg": "Please Login!!" })
    }



}

module.exports = { auth }