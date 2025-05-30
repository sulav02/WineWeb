import { MemberQueryManager } from "../models/member/MemberQueryManager.js";
import { LinkQueryManager } from "../models/link/LinkQueryManager.js";
import { RatingQueryManager } from "../models/rating/RatingQueryManager.js";
import { FavoritesQueryManager } from "../models/favorites/FavoriteQueryManager.js";
import { getActiveClientConnection } from "./dbConnection.js";

export async function initializeTables() {
    try {

        const client = await getActiveClientConnection()
        client.queryObject(MemberQueryManager.createMemberTableQuery)
        client.queryObject(LinkQueryManager.createLinkTableQuery);
        client.queryObject(RatingQueryManager.createRatingTableQuery);
        client.queryObject(FavoritesQueryManager.createFavouriteTableQuery);

        console.log("All tables created successfully.");
    } catch (err) {
        console.error("Error initializing database:", err);
    }
}
