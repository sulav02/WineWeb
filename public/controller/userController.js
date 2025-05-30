import { http } from "../services/http.js";
import { MEMBER_BASE_URL } from "../constant/ApiEndpoints.js"

const token = localStorage.getItem("token")
const member_id = localStorage.getItem("member_id")

export const loginUser = async (loginData) => {
    let response;
    try {
        response = await http.post(`${MEMBER_BASE_URL}/login`, loginData)
    } catch (error) {
        response = error
    }
    return response  
}

export const registerUser = async (signupData) => {
    let response;
    try {
        // Call backend register endpoint
        response = await http.post(`${MEMBER_BASE_URL}/register`, signupData);
    } catch (error) {
        response = error
    }
    return response
}

export const getUserProfile = async () => {
    try {
        const response = await http.get(`${MEMBER_BASE_URL}/${member_id}`, token);
        return response;
    } catch (error) {
        console.error('Fetch Profile Error:', error);
        throw error;
    }
};

export const updateUserProfile = async (updateData) => {
    try {
        const response = await http.patch(`${MEMBER_BASE_URL}/${member_id}`, updateData, token);
        return response;
    } catch (error) {
        console.error('Update Profile Error:', error);
        throw error;
    }
};
