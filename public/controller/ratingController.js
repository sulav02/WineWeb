import { http } from "../services/http.js";
import { RATING_BASE_URL } from "../constant/ApiEndpoints.js";

const token = localStorage.getItem("token");
const member_id = localStorage.getItem("member_id");


// Add New Link
export const addNewRating = async (ratingData) => {
    try {
        const response = await http.post(`${RATING_BASE_URL}/`, ratingData, token);
        return response;
    } catch (error) {
        console.error("Add Rating Error:", error);
        throw error;
    }
};

//  Hide a Link (Member Only)
export const hideLink = async (linkId) => {
    try {
        const response = await http.patch(`${LINK_BASE_URL}/hide/${linkId}`, member_id, token);
        return response;
    } catch (error) {
        console.error("Hide Link Error:", error);
        throw error;
    }
};

//  Unhide a Link (Member Only)
export const unhideLink = async (linkId) => {
    try {
        const response = await http.patch(`${LINK_BASE_URL}/unhide/${linkId}`, member_id, token);
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
