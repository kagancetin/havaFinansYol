const express = require('express');
const router = express.Router();

const controller = require("../controller/index.js");

router.route('/')
    .get(controller.index);

router.route('/hava')
    .get(controller.hava);

router.route('/hava/:city')
    .get(controller.havaCity);

router.route('/finans')
    .get(controller.finans);

router.route('/finansBlack')
    .get(controller.finansBlack);


router.route('/havafinans')
    .get(controller.havafinans);

router.route('/havafinans/:city')
    .get(controller.havafinansCity);

router.route('/harita1')
    .get(controller.harita1);
router.route('/harita2')
    .get(controller.harita2);
router.route('/harita3')
    .get(controller.harita3);

module.exports = router;