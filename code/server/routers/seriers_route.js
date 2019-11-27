const express = require('express')
const serierControl = require('../controls/serier_control')
const router = express.Router()

router.get('/api/serier',serierControl.getSerierList)
.get('/api/serier/delete',serierControl.delSerier)
.get('/api/serier/detail',serierControl.getSerierDetail)
.post('/api/serier/addOrEditSerier',serierControl.addOrEditSerier)
.get('/api/serier/options',serierControl.getSerierOptions)
.get('/api/home/serier_list',serierControl.getHomeSerierList)
module.exports = router