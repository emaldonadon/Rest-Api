import { Router } from "express";
import { deleteTrabajador, getId, getList, postCreate, update } from "../controllers/trabajadores.controllers.js";
const router = Router()

router.get('/trabajadores', getList)
router.get(`/trabajadores/:id`, getId)
router.post(`/trabajadores/create`, postCreate)
router.put(`/trabajadores/:id`, update)
router.delete(`/trabajadores/:id`, deleteTrabajador)

export default router;