const express = require("express");
const {
	getMemberListController,
	addMemberController,
} = require("../controllers/chatController");

const router = express.Router();

router.get("/getUsers", getMemberListController);
router.post("/add-new-member", addMemberController);

module.exports = router;
