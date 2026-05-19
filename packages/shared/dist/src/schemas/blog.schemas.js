"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentStatusEnum = exports.CreateCommentSchema = exports.UpdateTagSchema = exports.TagSchema = exports.UpdateCategorySchema = exports.CategorySchema = exports.BlogQuerySchema = exports.PublishBlogSchema = exports.UpdateBlogSchema = exports.CreateBlogSchema = exports.BlogStatusEnum = exports.paginationQueryValidator = exports.seoMetadataValidator = exports.imageUrlValidator = exports.slugValidator = void 0;
const zod_1 = require("zod");
// ─────────────────────────────────────────────────────────────────────────────
// Primitive validators (reusable)
// ─────────────────────────────────────────────────────────────────────────────
exports.slugValidator = zod_1.z
    .string()
    .min(2)
    .max(160)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: "Slug must be lowercase alphanumeric with hyphens only",
});
exports.imageUrlValidator = zod_1.z
    .string()
    .url("Must be a valid URL")
    .refine((val) => /\.(jpg|jpeg|png|webp|gif|avif|svg)$/i.test(val) ||
    val.includes("cloudinary.com") ||
    val.includes("res.cloudinary"), { message: "Must be a valid image URL" })
    .optional()
    .or(zod_1.z.literal(""));
exports.seoMetadataValidator = zod_1.z.object({
    seoTitle: zod_1.z.string().max(60, "SEO title max 60 chars").optional(),
    seoDescription: zod_1.z.string().max(160, "SEO description max 160 chars").optional(),
    seoKeywords: zod_1.z.array(zod_1.z.string().max(50)).max(20).optional(),
    canonicalUrl: zod_1.z.string().url().optional().or(zod_1.z.literal("")),
    ogImage: exports.imageUrlValidator,
});
exports.paginationQueryValidator = zod_1.z.object({
    page: zod_1.z.coerce.number().int().positive().default(1),
    limit: zod_1.z.coerce.number().int().min(1).max(100).default(10),
    sortBy: zod_1.z
        .enum(["publishedAt", "views", "createdAt", "title"])
        .optional()
        .default("publishedAt"),
    sortOrder: zod_1.z.enum(["asc", "desc"]).optional().default("desc"),
    cursor: zod_1.z.string().optional(),
});
// ─────────────────────────────────────────────────────────────────────────────
// Blog Schemas
// ─────────────────────────────────────────────────────────────────────────────
exports.BlogStatusEnum = zod_1.z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]);
exports.CreateBlogSchema = zod_1.z
    .object({
    title: zod_1.z.string().min(3, "Title min 3 chars").max(200, "Title max 200 chars"),
    slug: exports.slugValidator.optional(),
    excerpt: zod_1.z.string().max(500).optional(),
    content: zod_1.z.any(), // Flexible content for TipTap
    featuredImage: exports.imageUrlValidator,
    categoryId: zod_1.z.string().optional(),
    tagIds: zod_1.z.array(zod_1.z.string()).max(10).optional().default([]),
    status: exports.BlogStatusEnum.default("DRAFT"),
    isFeatured: zod_1.z.boolean().default(false),
    scheduledAt: zod_1.z.string().datetime().optional(),
})
    .merge(exports.seoMetadataValidator);
exports.UpdateBlogSchema = exports.CreateBlogSchema.partial().extend({
    publishedAt: zod_1.z.string().datetime().optional().nullable(),
});
exports.PublishBlogSchema = zod_1.z.object({
    publishedAt: zod_1.z.string().datetime().optional(),
});
exports.BlogQuerySchema = zod_1.z
    .object({
    status: exports.BlogStatusEnum.optional(),
    categoryId: zod_1.z.string().optional(),
    categorySlug: zod_1.z.string().optional(),
    tagSlug: zod_1.z.string().optional(),
    search: zod_1.z.string().max(100).optional(),
    isFeatured: zod_1.z.coerce.boolean().optional(),
})
    .merge(exports.paginationQueryValidator);
// ─────────────────────────────────────────────────────────────────────────────
// Category Schemas
// ─────────────────────────────────────────────────────────────────────────────
exports.CategorySchema = zod_1.z.object({
    name: zod_1.z.string().min(2).max(100),
    slug: exports.slugValidator.optional(),
    description: zod_1.z.string().max(500).optional(),
    color: zod_1.z
        .string()
        .regex(/^#[0-9A-Fa-f]{6}$/, "Must be a valid hex color")
        .optional()
        .default("#6366f1"),
});
exports.UpdateCategorySchema = exports.CategorySchema.partial();
// ─────────────────────────────────────────────────────────────────────────────
// Tag Schemas
// ─────────────────────────────────────────────────────────────────────────────
exports.TagSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(60),
    slug: exports.slugValidator.optional(),
});
exports.UpdateTagSchema = exports.TagSchema.partial();
// ─────────────────────────────────────────────────────────────────────────────
// Comment Schemas
// ─────────────────────────────────────────────────────────────────────────────
exports.CreateCommentSchema = zod_1.z.object({
    postId: zod_1.z.string().min(1),
    name: zod_1.z.string().min(2).max(100),
    email: zod_1.z.string().email(),
    comment: zod_1.z.string().min(5).max(2000),
});
exports.CommentStatusEnum = zod_1.z.enum(["PENDING", "APPROVED", "SPAM"]);
