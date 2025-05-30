import asyncHandler from "../middleware/asyncHandler.js";
import LinkModel from "../models/link/Link.js";
import RatingModel from "../models/rating/Rating.js"
import FavoriteModel from "../models/favorites/Favorite.js"
import { success, failure } from "../utils/message.js";
import { computeBayesianRating } from "../utils/bayesianRating.js"
import MemberModel from "../models/member/Member.js";


export const addLink = asyncHandler(async (req, res) => {
    const { title, description, url, member_id } = req.body;

    const Link = await LinkModel
    const newLink = await Link.create({
        title,
        description,
        url,
        member_id,
        hidden: false,
        average_rating: 0,
    });

    res.status(201).json(success("Link created successfully", newLink));
});

export const getAllMemberFavouriteLinks = asyncHandler(async (req, res) => {
    const { member_id } = req.params;
    const { sort = "recent" } = req.query;

    const Link = await LinkModel;
    const Rating = await RatingModel;
    const Member = await MemberModel;
    const Favorite = await FavoriteModel;

    const links = await Favorite.find({ member_id });

    const allRatings = await Rating.find();

    // Compute global average (C)
    const ratingValues = allRatings.map(r => parseFloat(r.rating)).filter(r => !isNaN(r));
    const C = ratingValues.reduce((sum, val) => sum + val, 0) / ratingValues.length;

    const enrichedLinks = await Promise.all(
        links.map(async favorite => {
            const member = await Member.findOne({ _id: favorite.member_id });

            // 🔑 Fetch actual link data
            const linkData = await Link.findOne({ _id: favorite.link_id });

            const ratings = allRatings.filter(r => r.link_id === favorite.link_id);

            const total = ratings.reduce((acc, r) => acc + +r.rating, 0);
            const count = ratings.length;
            const R = count > 0 ? total / count : 0;

            const m = 5; // minimum votes threshold
            const bayesianRating = computeBayesianRating(R, count, C, m);

            const userRating = ratings.filter(r => r.member_id == favorite.member_id).map(r => r.rating);
            const userReview = ratings.filter(r => r.member_id == favorite.member_id).map(r => r.review);

            return {
                _id: favorite._id,
                member_id: member,
                link_id: linkData, // ✅ actual link data here
                created_at: favorite.created_at,
                userRating: userRating[0] || 0,
                userReview: userReview[0] || "",
                average_rating: R.toFixed(2),
                bayesian_rating: bayesianRating.toFixed(2),
                rating_count: count,
            };
        })
    );

    let sorted;
    if (sort === "highest_rated_bayesian") {
        sorted = enrichedLinks.sort((a, b) => b.bayesian_rating - a.bayesian_rating);
    } else if (sort === "highest_rated_avg") {
        sorted = enrichedLinks.sort((a, b) => b.average_rating - a.average_rating);
    } else {
        sorted = enrichedLinks.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }

    res.status(200).json(success("Links fetched successfully", sorted));
});


export const getAllMemberHiddenLinks = asyncHandler(async (req, res) => {
    const { member_id } = req.params;
    console.log(member_id);
    
    const { sort = "recent" } = req.query;

    const Link = await LinkModel;
    const Rating = await RatingModel;
    const Member = await MemberModel;

    const links = await Link.find({ hidden: true, member_id });
    const allRatings = await Rating.find();

    // Compute global average (C)
    const ratingValues = allRatings.map(r => parseFloat(r.rating)).filter(r => !isNaN(r));
    const C = ratingValues.reduce((sum, val) => sum + val, 0) / ratingValues.length;

    const enrichedLinks = await Promise.all(
        links.map(async link => {
            const member = await Member.findOne({ _id: link.member_id });
            const ratings = allRatings.filter(r => r.link_id === link._id);

            const total = ratings.reduce((acc, r) => acc + +r.rating, 0);
            const count = ratings.length;
            const R = count > 0 ? total / count : 0;

            // Bayesian rating
            const m = 5; // minimum votes threshold
            const bayesianRating = computeBayesianRating(R, count, C, m);

            const userRating = ratings.filter(r => link.member_id == r.member_id).map(r => r.rating);
            const userReview = ratings.filter(r => link.member_id == r.member_id).map(r => r.review);

            return {
                ...link,
                member,
                userRating: userRating[0] || 0,
                userReview: userReview[0] || "",
                average_rating: R.toFixed(2),
                bayesian_rating: bayesianRating.toFixed(2),
                rating_count: count,
            };
        })
    );

    let sorted;

    if (sort === "highest_rated_bayesian") {
        sorted = enrichedLinks.sort((a, b) => b.bayesian_rating - a.bayesian_rating);
    } else if (sort === "highest_rated_avg") {
        sorted = enrichedLinks.sort((a, b) => b.average_rating - a.average_rating);
    } else {
        sorted = enrichedLinks.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }
    res.status(200).json(success("Links fetched successfully", sorted));
});

export const getAllLinks = asyncHandler(async (req, res) => {
    const { sort = "recent" } = req.query;

    const Link = await LinkModel;
    const Rating = await RatingModel;
    const Member = await MemberModel;

    const links = await Link.find({ hidden: false });
    const allRatings = await Rating.find();

    // Compute global average (C)
    const ratingValues = allRatings.map(r => parseFloat(r.rating)).filter(r => !isNaN(r));
    const C = ratingValues.reduce((sum, val) => sum + val, 0) / ratingValues.length;

    const enrichedLinks = await Promise.all(
        links.map(async link => {
            const member = await Member.findOne({ _id: link.member_id });
            const ratings = allRatings.filter(r => r.link_id === link._id);

            const total = ratings.reduce((acc, r) => acc + +r.rating, 0);
            const count = ratings.length;
            const R = count > 0 ? total / count : 0;

            // Bayesian rating
            const m = 5; // minimum votes threshold
            const bayesianRating = computeBayesianRating(R, count, C, m);

            const userRating = ratings.filter(r => link.member_id == r.member_id).map(r => r.rating);
            const userReview = ratings.filter(r => link.member_id == r.member_id).map(r => r.review);
            
            return {
                ...link,
                member,
                userRating:userRating[0] || 0,
                userReview:userReview[0] ||"",
                average_rating: R.toFixed(2),
                bayesian_rating: bayesianRating.toFixed(2),
                rating_count: count,
            };
        })
    );

    let sorted;

    if (sort === "highest_rated_bayesian") {
        sorted = enrichedLinks.sort((a, b) => b.bayesian_rating - a.bayesian_rating);
    } else if (sort === "highest_rated_avg") {
        sorted = enrichedLinks.sort((a, b) => b.average_rating - a.average_rating);
    } else {
        sorted = enrichedLinks.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }
    res.status(200).json(success("Links fetched successfully", sorted));
});


// 3. get_link_details
export const getLinkDetails = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const Link = await LinkModel
    const Rating = await RatingModel
    const Member = await MemberModel

    const link = await Link.findOne({ _id: id });
    if (!link) {
        return res.status(404).json(failure("Link not found"));
    }

    const member = await Member.findOne({ _id: link.member_id });
    const ratings = await Rating.find({ link_id: id });
    res.status(200).json(success("Link details fetched successfully", { ...link, ratings, member_id: member }));
});

// 4. hide_link
export const hideLink = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { member_id } = req.body;
    const Link = await LinkModel

    const link = await Link.findOne({ _id: id });
    if (!link) {
        return res.status(404).json(failure("Link not found"));
    }

    if (link.member_id !== member_id) {
        return res.status(403).json(failure("You are not authorized to hide this link"));
    }

    const updatedLink = await Link.update({ _id: id }, { hidden: true });
    res.status(200).json(success("Link hidden successfully", updatedLink));
});

// 4. hide_link
export const unhideLink = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { member_id } = req.body;
    const Link = await LinkModel

    const link = await Link.findOne({ _id: id });
    if (!link) {
        return res.status(404).json(failure("Link not found"));
    }

    if (link.member_id !== member_id) {
        return res.status(403).json(failure("You are not authorized to hide this link"));
    }

    const updatedLink = await Link.update({ _id: id }, { hidden: false });
    res.status(200).json(success("Link unhidden successfully", updatedLink));
});

// 5. delete_link
export const deleteLink = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { member_id } = req.body;
    const Link = await LinkModel

    const link = await Link.findOne({ _id: id });
    if (!link) {
        return res.status(404).json(failure("Link not found"));
    }

    if (link.member_id !== member_id) {
        return res.status(403).json(failure("You are not authorized to delete this link"));
    }

    const deletedLink = await Link.delete({ _id: id });
    res.status(200).json(success("Link deleted successfully"));
});

// 6. get_member_links
export const getMemberLinks = asyncHandler(async (req, res) => {
    const { member_id } = req.params;
    const Link = await LinkModel

    const links = await Link.find({ member_id });
    res.status(200).json(success("Member's links fetched successfully", links));
});
