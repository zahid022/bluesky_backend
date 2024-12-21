const likeService = require("../services/like.service")

const toggle = async (req, res, next) => {
    try {
        let result = await likeService.toggle(req.user._id, req.params.id, req.body)
        res.json(result)
    } catch (err) {
        next(err)
    }
}

const likeController = {
    toggle
}

module.exports = likeController