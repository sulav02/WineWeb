import { Router } from "https://deno.land/x/oak/mod.ts";
import * as ratingController from '../controllers/ratingController.js';
import * as auth from '../middleware/auth.js';

const router = new Router();

router.post("/", auth.verifyUser, ratingController.rateLink);
router.get("/link/:link_id", ratingController.getLinkRating);
router.get("/member/:member_id", auth.verifyUser, ratingController.getMemberRatings);
router.patch("/", auth.verifyUser, ratingController.updateLinkRating);

export default router