import { Router } from "express"
import { getUsers } from "../controllers/userControllers"; 
const router = Router();
router.get("/users",getUsers);
export default router;
