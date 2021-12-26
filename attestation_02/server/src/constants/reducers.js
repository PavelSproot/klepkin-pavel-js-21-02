module.exports = {
    page: ["total", "page", "limit", "error", "data"],
    comment: ["id", "postId", "owner", "message", "publishDate"],
    commentDates: ["publishDate"],
    post: ["id", "owner", "image", "text", "publishDate", "error", "data"],
    postDates: ["publishDate"],
    userPreview: ["id", "firstName", "lastName", "picture", "title"],
    user: [
        "id",
        "firstName",
        "lastName",
        "picture",
        "title",
        "dateOfBirth",
        "email",
        "gender",
        "phone",
        "registerDate",
        "required",
        "data",
        "error",
    ],
    userDates: ["dateOfBirth", "registerDate"],
    userRequired: ["lastName", "firstName", "email"],
    imgUrl: ["url"],
};
