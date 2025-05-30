import { Router } from "https://deno.land/x/oak/mod.ts";
import * as linkController from '../controllers/linkController.js';
import * as auth from '../middleware/auth.js'

const router = new Router();

router.post('/', auth.verifyUser, linkController.addLink);
router.get("/favorite-links/:member_id", auth.verifyUser,linkController.getAllMemberFavouriteLinks);
router.get("/hidden-links/:member_id", auth.verifyUser,linkController.getAllMemberHiddenLinks);
router.get("/", linkController.getAllLinks);
router.get("/:id", auth.verifyUser, linkController.getLinkDetails);
router.patch("/hide/:id", auth.verifyUser, linkController.hideLink);
router.patch("/unhide/:id", auth.verifyUser, linkController.unhideLink);
router.delete("/:id", auth.verifyUser, linkController.deleteLink);
router.get("/member/:member_id", auth.verifyUser, linkController.getMemberLinks);

export default router;
