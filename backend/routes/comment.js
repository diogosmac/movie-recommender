const express = require("express")
const router = express.Router()
// const axios = require("axios")
const { create, FindByImdbIds, update } = require("../controllers/Comment")

router.route("/details/comment/:id").get(FindByImdbIds)
router.route("/details/:id").post(create)
router
  .route("/comment/:id")
  .patch(authenticate, update)

module.exports = router