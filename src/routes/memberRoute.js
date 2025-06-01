import { Router } from "https://deno.land/x/oak/mod.ts";
import * as memberController from '../controllers/memberController.js';
import * as auth from "../middleware/auth.js"

const router = new Router();

// POST /api/members - Register a new member
router.post('/register', memberController.registerMember);
router.post('/login', memberController.loginMember);
router.get('/:id', auth.verifyUser, memberController.getMemberById);
router.get('/:id/favorites', auth.verifyUser, memberController.getMemberFavoriteLinks);
router.get('/', auth.verifyUser, memberController.getAllMembers);
router.patch('/:id', auth.verifyUser, memberController.updateMember);
router.delete('/:id', auth.verifyUser, memberController.deleteMember);


export default router;
