import { jwt } from "../utils/jwt.js";
import { key } from "../utils/jwtKey.js";
import MemberModel from "../models/member/Member.js"
import { failure } from "../utils/message.js";
import {authAsyncHandler} from "./asyncHandler.js";

export const verifyUser = authAsyncHandler(async (req, res, next) => {
    try {
        const authHeader = req.headers.get("authorization");
        const accessToken = authHeader && authHeader.split(" ")[1];

        // If no token is provided, send an Unauthorized response (401)
        if (accessToken == null) {
            return res.status(401).json(failure("Unauthorized: No token provided"));
        }

        // Verify the JWT token
        const authMember = await jwt.verify(accessToken, key);

        const Member = await MemberModel
        // Find the member associated with the token
        const member = await Member.findOne({
            _id: authMember._id
        })
        // If the member is not found, respond with Unauthorized status (401)
        if (!member) {
            return res.status(401).json(failure("Unauthorized: member not found"));
        }

        req.member = member; // Attach the member object to the request       
        await next();

    } catch (err) {
        console.log(err);
        // If there's an error (e.g., invalid token), respond with Unauthorized status (401)
        res.status(401).json(failure("Unauthorized: Token verification failed"));
    }
})
