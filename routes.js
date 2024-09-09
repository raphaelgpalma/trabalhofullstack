const express = require('express');
const personController = require('./controllers/PersonController');

const router = express.Router();


router.get('/persons', personController.getPersons);
router.get('/persons/:id', personController.getPersonById);
router.post('/persons', personController.createPerson);
router.put('/persons/:id', personController.updatePerson);
router.delete('/persons/:id', personController.deletePerson);

module.exports = router;