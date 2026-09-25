const express = require('express');
const authMiddleware = require('../middlewares/auth');
const requireRole = require('../middlewares/role');
const { getSummary, getCategoryTotals, getRecentActivity } = require('../controllers/dashboardController');

const router = express.Router();

router.use(authMiddleware);

// Viewers, Analysts, and Admins can access dashboard summaries
router.get('/summary', requireRole(['viewer', 'analyst', 'admin']), getSummary);
router.get('/category-totals', requireRole(['viewer', 'analyst', 'admin']), getCategoryTotals);
router.get('/recent-activity', requireRole(['viewer', 'analyst', 'admin']), getRecentActivity);

module.exports = router;
