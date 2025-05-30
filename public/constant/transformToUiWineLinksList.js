
export function transformToUiWineLinksList(data) {
    return data.map((item, index) => {
        return {
            _id:item._id,
            title: capitalizeFirstLetter(item.title),
            url: item.url,
            description: item.description,
            winePoints: parseInt(item.member?.wine_points ?? "0", 10),
            fullName:item.member?.fullname,
            profilePic:item.member?.picurl,
            userReview: item.userReview ?? "",
            avgRating: parseFloat(item.average_rating ?? "0"),
            defaultRating: parseFloat(item.userRating ?? "0"),
            allowUserRating: item.userRating == 0 // allow if no user rating yet
        };
    });
}

export function transformToFavoriteUiWineLinksList(data) {
    return data.map((item, index) => {
        return {
            _id: item._id,
            title: capitalizeFirstLetter(item.link_id.title),
            url: item.link_id.url,
            description: item.link_id.description,
            winePoints: parseInt(item.member_id?.wine_points ?? "0", 10),
            fullName: item.member_id?.fullname,
            profilePic: item.member_id?.picurl,
            userReview: item.userReview ?? "",
            avgRating: parseFloat(item.average_rating ?? "0"),
            defaultRating: parseFloat(item.userRating ?? "0"),
            allowUserRating: item.userRating == 0 // allow if no user rating yet
        };
    });
}

function capitalizeFirstLetter(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}
  