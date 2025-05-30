
import asyncHandler from "../middleware/asyncHandler.js";
import RatingModel from "../models/rating/Rating.js";
import MemberModel from "../models/member/Member.js";
import LinkModel from "../models/link/Link.js"
import FavoriteModel from "../models/favorites/Favorite.js"
import { success, failure } from "../utils/message.js";


export const rateLink = asyncHandler(async (req, res) => {    
    let { member_id, link_id, rating, review } = req.body;

    const Link = await LinkModel;
    const Rating = await RatingModel;
    const Member = await MemberModel;
    const Favorite = await FavoriteModel;

    // Validate rating range
    if (rating < 0.5 || rating > 5 || rating % 0.5 !== 0) {
        return res.status(400).json(failure("Rating must be between 0.5 and 5 in 0.5 increments"));
    }

    // Check if member already rated the link
    // const existing = await Rating.findOne({ member_id, link_id });
    // if (existing) {
    //     return res.status(409).json(failure("You have already rated this link"));
    // }

    // Create new rating
    const newRating = await Rating.create({ member_id, link_id, rating,review });

    // Find the link and its creator
    const link = await Link.findOne({ _id: link_id });
    if (!link) return res.status(404).json(failure("Link not found."));

    const creator = await Member.findOne({ _id: link.member_id });
    if (!creator) return res.status(404).json(failure("Member not found."));

    // Calculate wine point delta
    const wineDelta = Math.round((rating - 2.5) * 2);
    const updatedPoints = +creator.wine_points + wineDelta;


    // Update wine points
    await Member.update({ _id: creator._id }, { wine_points: updatedPoints });

    // If rating > 2.5, mark link as favorite for the user
    if (rating > 2.5) {
        // Check if already favorited
        const existingFavorite = await Favorite.findOne({ member_id, link_id });
        if (!existingFavorite) {
            await Favorite.create({ member_id, link_id });
        }
    }

    res.status(201).json(success("Rating added and wine points updated", newRating));
});


// 2. get_link_rating
export const getLinkRating = asyncHandler(async (req, res) => {
    const { link_id } = req.params;
    const Rating = await RatingModel

    const ratings = await Rating.find({ link_id });

    const total = ratings.reduce((acc, r) => acc + r.rating, 0);
    const count = ratings.length;
    const average = count ? total / count : 0;

    res.status(200).json(success("Link rating fetched", {
        total,
        count,
        average,
        ratings
    }));
});

// 3. get_member_ratings
export const getMemberRatings = asyncHandler(async (req, res) => {
    const { member_id } = req.params;
    const Rating = await RatingModel

    const ratings = await Rating.find({ member_id });
    res.status(200).json(success("Member ratings fetched", ratings));
});

// 4. update_link_rating
export const updateLinkRating = asyncHandler(async (req, res) => {
    const { member_id, link_id, rating } = req.body;
    const Rating = await RatingModel

    if (![1, -1].includes(rating)) {
        return res.status(400).json(failure("Rating must be either 1 or -1"));
    }

    const existing = await Rating.findOne({ member_id, link_id });
    if (!existing) {
        return res.status(404).json(failure("No existing rating to update"));
    }

    const updated = await Rating.update({ _id: existing._id }, { rating });
    res.status(200).json(success("Rating updated successfully", updated));
});