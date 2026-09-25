const express = require('express');
const authMiddleware = require('../middlewares/auth');
const requireRole = require('../middlewares/role');
const { createRecord, getRecords, getRecordById, updateRecord, deleteRecord } = require('../controllers/recordController');

const router = express.Router();

router.use(authMiddleware);

// All roles except viewer can see details. Wait, Viewer only sees dashboard summaries.
// Admins and Analysts can view records.
router.get('/', requireRole(['admin', 'analyst']), getRecords);
router.get('/:id', requireRole(['admin', 'analyst']), getRecordById);

// Only admins can modify records
router.post('/', requireRole(['admin']), createRecord);
router.put('/:id', requireRole(['admin']), updateRecord);
router.delete('/:id', requireRole(['admin']), deleteRecord);

module.exports = router;
