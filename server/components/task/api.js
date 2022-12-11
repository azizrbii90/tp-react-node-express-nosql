const express = require('express')  
const router = express.Router()
const taskController = require('./controller')
const authenticate = require('../../utils').authUtils.authUtils.authenticate

router
.get('/', [authenticate], taskController.getAll)
.get('/:id', [authenticate], taskController.getById)
.post('/', [authenticate], taskController.create)
.put('/', [authenticate], taskController.update)
.delete('/:id', [authenticate], taskController.delete);

module.exports = router
