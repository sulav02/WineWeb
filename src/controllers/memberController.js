
import { asyncHandler } from "../middleware/asyncHandler.js";
import MemberModel from "../models/member/Member.js";
import { bcrypt } from "../utils/bcrypt.js"
import { jwt } from "../utils/jwt.js"
import { key } from "../utils/jwtKey.js";
// import { res, success, failure } from "../utils/message.js";
import { success, failure } from "../utils/index.js";

export const registerMember = asyncHandler(async (req, res) => {

    const { fullname, username, email, password } = req.body;

    // checking if user already existed or not
    const Member = await MemberModel;
    const exists = await Member.findOne({ email });

    if (exists) {
        return res.status(409).json(failure("👤 Member already exists. Please login"))
    }

    if (password.length < 4) {
        return res.status(422).json(failure("🔐Please enter a strong password with atleast 8 characters⚠️"))
    }

    // Hashing user password
    const hashedPassword = await bcrypt.hash(password)
    const avatarUrl = `https://ui-avatars.com/api/?background=random&rounded=true&name=${encodeURIComponent(fullname)}`;

    await Member.create({
        fullname,
        username,
        email,
        password: hashedPassword,
        picurl: avatarUrl
    });

    res.status(201).json(success("🆕 User registered successfully✅"));
});

export const loginMember = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    const Member = await MemberModel;
    // Find member by either email or username using custom findOne method
    let member
    if (email !== undefined && email !== null) {
        member = await Member.findOne({ email })
    } else {
        member = await Member.findOne({ username })
    }

    if (!member) {
        return res.status(404).json(failure("🚫 Member not found. Please check your credentials."));
    }

    // Check password
    const isMatch = await bcrypt.compare(password, member.password);
    if (!isMatch) {
        return res.status(401).json(failure("❗ Invalid password."));
    }

    // // Generate JWT token
    const token = await jwt.sign({ _id: member._id, username: member.username }, key, {
        expiresIn: 24,
    });

    res.status(200).json({
        ...success("✅ Login successful",member), token});
});

// Get all members
export const getAllMembers = asyncHandler(async (req, res) => {
    const Member = await MemberModel;
    const members = await Member.find();
    res.status(200).json(success("✅Members fetched successfully📄", members));
});

// Get a specific member by ID
export const getMemberById = asyncHandler(async (req, res) => {
    console.log("My Req",req);
    
    const { id } = req.params;
    const Member = await MemberModel;
    const member = await Member.findOne({ _id: id });
    if (!member) {
        return res.status(404).json(failure("❌ Member not found"));
    }
    res.status(200).json(success("✅Member fetched successfully📄", member));
});


// Update member details
export const updateMember = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { fullname, email } = req.body;
    const Member = await MemberModel;

    // Build update object dynamically
    const updateFields = {};
    if (email != null) updateFields.email = email;
    if (fullname != null) updateFields.fullname = fullname;

    if (Object.keys(updateFields).length === 0) {
        return res.status(400).json(failure("⚠️ No valid fields provided to update"));
    }

    const updatedMember = await Member.update({ _id: id }, updateFields);
    if (!updatedMember) {
        return res.status(404).json(failure("🚫 Member not found"));
    }
    res.status(200).json(success("✅ Member details updated successfully📝", updatedMember));
});

// Delete a member
export const deleteMember = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const Member = await MemberModel;

    const deletedMember = await Member.delete({ _id: id });
    if (!deletedMember) {
        return res.status(404).json(failure("❌ Member not found"));
    }
    res.status(200).json(success("🗑️Member deleted successfully🗑️"));
});

export const getMemberFavoriteLinks = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const Member = await MemberModel;
    const Link = await LinkModel;

    // Find member
    const member = await Member.findOne({ _id: id });
    if (!member) {
        return res.status(404).json(failure("❌ Member not found"));
    }

    const favoriteLinkIds = member.favorite_links || [];

    // Simple: fetch each link one by one (not efficient but straightforward)
    const favoriteLinks = [];
    for (const linkId of favoriteLinkIds) {
        const link = await Link.findOne({ _id: linkId });
        if (link) favoriteLinks.push(link);
    }

    res.status(200).json(success("✅ Favorite links fetched successfully", favoriteLinks));
});
