"use strict";
// ─────────────────────────────────────────────────────────────────────────────
// Blog CMS — Shared TypeScript Interfaces
// ─────────────────────────────────────────────────────────────────────────────
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentStatus = exports.BlogStatus = void 0;
var BlogStatus;
(function (BlogStatus) {
    BlogStatus["DRAFT"] = "DRAFT";
    BlogStatus["PUBLISHED"] = "PUBLISHED";
    BlogStatus["ARCHIVED"] = "ARCHIVED";
})(BlogStatus || (exports.BlogStatus = BlogStatus = {}));
var CommentStatus;
(function (CommentStatus) {
    CommentStatus["PENDING"] = "PENDING";
    CommentStatus["APPROVED"] = "APPROVED";
    CommentStatus["SPAM"] = "SPAM";
})(CommentStatus || (exports.CommentStatus = CommentStatus = {}));
