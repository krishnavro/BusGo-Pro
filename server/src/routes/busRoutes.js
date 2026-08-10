const express = require("express");
const router = express.Router();

const {
  registerBus,
  getAllBuses,
  searchBus,
  getMyBuses,
  updateBus,
  getPassengers,
  getBusDetails,
  deactivateBus,
  operatorDashboard,
  getLocations,
} = require("../controllers/busController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post(
  "/register",
  authMiddleware,
  roleMiddleware("Operator"),
  registerBus
);

router.get("/all", getAllBuses);
router.get("/locations", getLocations);
router.get("/search", searchBus);

router.get(
  "/my-buses",
  authMiddleware,
  roleMiddleware("Operator"),
  getMyBuses
);

router.put(
  "/update/:id",
  authMiddleware,
  roleMiddleware("Operator"),
  updateBus
);

router.get(
  "/passengers/:id",
  authMiddleware,
  roleMiddleware("Operator"),
  getPassengers
);

router.put(
  "/deactivate/:id",
  authMiddleware,
  roleMiddleware("Operator"),
  deactivateBus
);

router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware("Operator"),
  operatorDashboard
);

router.get("/:id", getBusDetails);

module.exports = router;