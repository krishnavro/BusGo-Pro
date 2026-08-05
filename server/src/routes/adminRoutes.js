const express = require('express');
const router = express.Router();

const { getPendingOperators, approveOperator, rejectOperator, getAllUsers, adminDashboard } = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const { getAllBuses } = require('../controllers/busController');

router.get('/pending-operators',authMiddleware,roleMiddleware("Admin"),getPendingOperators);
router.put('/approve/:id', authMiddleware,roleMiddleware("Admin"),approveOperator);
router.put('/reject/:id', authMiddleware,roleMiddleware("Admin"),rejectOperator);
router.get("/users",authMiddleware,roleMiddleware("Admin"),getAllUsers);
router.get("/buses", authMiddleware, roleMiddleware("Admin"), getAllBuses);
router.get("/dashboard", authMiddleware,roleMiddleware("Admin"), adminDashboard);

module.exports=router;