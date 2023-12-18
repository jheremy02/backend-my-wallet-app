const boom = require("@hapi/boom")
const { API_KEY } = require("../../config")

function checkApiKey(req,res,next) {

    const apiKey=req.headers['api']

    if (apiKey===API_KEY) {
        next()
    } else {
        next(boom.unauthorized())
    }
}

module.exports={
    checkApiKey
}