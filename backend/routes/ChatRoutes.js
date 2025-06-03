const express = require("express");
const {
	getMemberListController,
	addMemberController,
	sendFriendReqController,
	getPeopleListController,
	getFriendRequestsController,
} = require("../controllers/chatController");

const router = express.Router();

router.get("/getUsers", getMemberListController);
router.post("/add-new-member", addMemberController);
router.post("/send-friend-req", sendFriendReqController);
router.get("/get-people-list", getPeopleListController);
router.get("/get-friend-req", getFriendRequestsController);

module.exports = router;
