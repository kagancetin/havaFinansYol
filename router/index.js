import express from "express"
const router = express.Router()
import * as controller from "../controller/index.js"

router.get("/", controller.index)
router.get("/hava", controller.hava)
router.get("/hava/:city", controller.havaCity)
router.get("/finans", controller.finans)
router.get("/finans2", controller.finans2)
router.get("/finans3", controller.finans3)
router.get("/finansBlack", controller.finansBlack)
router.get("/havafinans", controller.havafinans)
router.get("/havafinans/:city", controller.havafinansCity)
router.get("/harita1", controller.harita1)
router.get("/harita2", controller.harita2)
router.get("/harita3", controller.harita3)

export default router
