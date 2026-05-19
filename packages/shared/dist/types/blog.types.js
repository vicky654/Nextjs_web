// ─────────────────────────────────────────────────────────────────────────────
// Blog CMS — Shared TypeScript Interfaces
// ─────────────────────────────────────────────────────────────────────────────
export var BlogStatus;
(function (BlogStatus) {
    BlogStatus["DRAFT"] = "DRAFT";
    BlogStatus["PUBLISHED"] = "PUBLISHED";
    BlogStatus["ARCHIVED"] = "ARCHIVED";
})(BlogStatus || (BlogStatus = {}));
export var CommentStatus;
(function (CommentStatus) {
    CommentStatus["PENDING"] = "PENDING";
    CommentStatus["APPROVED"] = "APPROVED";
    CommentStatus["SPAM"] = "SPAM";
})(CommentStatus || (CommentStatus = {}));
//# sourceMappingURL=blog.types.js.map