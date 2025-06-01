import { http } from "../services/http.js";
import { LINK_BASE_URL } from "../constant/ApiEndpoints.js";

const token = localStorage.getItem("token");
const member_id = localStorage.getItem("member_id");

//  Get All Hidden Links of Member
export const getAllFavouriteMostRecentLinks = async () => {
    try {
        const response = await http.get(`${LINK_BASE_URL}/favorite-links/${member_id}`, token);
        return response;
    } catch (error) {
        console.error("Fetch Links Error:", error);
        throw error;
    }
};

// Get All Links (Highest Rated Bayesian)
export const getAllFavouriteHighestRatedBayesianLinks = async () => {
    try {
        const response = await http.get(`${LINK_BASE_URL}/favorite-links/${member_id}?sort=highest_rated_bayesian`, token);
        return response;
    } catch (error) {
        console.error("Fetch Highest Rated Links Error:", error);
        throw error;
    }
};

// Get All Links (Highest Rated Average)
export const getAllFavouriteHighestRatedAverageLinks = async () => {
    try {
        const response = await http.get(`${LINK_BASE_URL}/favorite-links/${member_id}?sort=highest_rated_avg`, token);
        return response;
    } catch (error) {
        console.error("Fetch Highest Rated Links Error:", error);
        throw error;
    }
};

//  Get All Hidden Links of Member
export const getAllHiddenMostRecentLinks = async () => {
    try {
        const response = await http.get(`${LINK_BASE_URL}/hidden-links/${member_id}`, token);
        return response;
    } catch (error) {
        console.error("Fetch Links Error:", error);
        throw error;
    }
};

// Get All Links (Highest Rated Bayesian)
export const getAllHiddenHighestRatedBayesianLinks = async () => {
    try {
        const response = await http.get(`${LINK_BASE_URL}/hidden-links/${member_id}?sort=highest_rated_bayesian`, token);
        return response;
    } catch (error) {
        console.error("Fetch Highest Rated Links Error:", error);
        throw error;
    }
};

// Get All Links (Highest Rated Average)
export const getAllHiddenHighestRatedAverageLinks = async () => {
    try {
        const response = await http.get(`${LINK_BASE_URL}/hidden-links/${member_id}?sort=highest_rated_avg`, token);
        return response;
    } catch (error) {
        console.error("Fetch Highest Rated Links Error:", error);
        throw error;
    }
};

//  Get All Links (Most Recent First)
export const getAllMostRecentLinks = async () => {
    try {
        const response = await http.get(`${LINK_BASE_URL}`,token);
        return response;
    } catch (error) {
        console.error("Fetch Links Error:", error);
        throw error;
    }
};

// Get All Links (Highest Rated Bayesian)
export const getHighestRatedBayesianLinks = async () => {
    try {
        const response = await http.get(`${LINK_BASE_URL}/?sort=highest_rated_bayesian`,token);
        return response;
    } catch (error) {
        console.error("Fetch Highest Rated Links Error:", error);
        throw error;
    }
};

// Get All Links (Highest Rated Average)
export const getHighestRatedAverageLinks = async () => {
    try {
        const response = await http.get(`${LINK_BASE_URL}/?sort=highest_rated_avg`, token);
        return response;
    } catch (error) {
        console.error("Fetch Highest Rated Links Error:", error);
        throw error;
    }
};

// Add New Link
export const addNewLink = async (linkDataDetails) => {
    const linkData = { ...linkDataDetails,member_id}
    try {
        const response = await http.post(`${LINK_BASE_URL}/`, linkData, token);
        return response;
    } catch (error) {
        console.error("Add Link Error:", error);
        throw error;
    }
};

//  Hide a Link (Member Only)
export const hideLink = async (linkId) => {
    try {
        const response = await http.patch(`${LINK_BASE_URL}/hide/${linkId}`, {member_id}, token);
        return response;
    } catch (error) {
        console.error("Hide Link Error:", error);
        throw error;
    }
};

//  Unhide a Link (Member Only)
export const unhideLink = async (linkId) => {
    try {
        const response = await http.patch(`${LINK_BASE_URL}/unhide/${linkId}`, {member_id}, token);
        console.log(response);
        return response;
    } catch (error) {
        console.error("Hide Link Error:", error);
        throw error;
    }
};

//  Delete a Link
export const deleteLink = async (linkId) => {
    try {
        const response = await http.delete(`${LINK_BASE_URL}/${linkId}`, token);
        return response;
    } catch (error) {
        console.error("Delete Link Error:", error);
        throw error;
    }
};
