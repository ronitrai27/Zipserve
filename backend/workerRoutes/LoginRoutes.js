// const express = require("express");
// const { loginWorker } = require("../workerControllers/LoginController");
// const router = express.Router();

// router.post("/login", loginWorker);

// module.exports = router;
const express = require("express");
const {
  loginWorker,
  getWorkerDetails,
  logoutWorker,
} = require("../workerControllers/LoginController");

const router = express.Router();

router.post("/login", loginWorker);
router.get("/worker/me", getWorkerDetails);
router.post("/logout", logoutWorker);

module.exports = router;
