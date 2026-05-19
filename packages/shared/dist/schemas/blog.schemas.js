import { z } from "zod";
// ─────────────────────────────────────────────────────────────────────────────
// Primitive validators (reusable)
// ─────────────────────────────────────────────────────────────────────────────
export const slugValidator = z
    .string()
    .min(2)
    .max(160)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: "Slug must be lowercase alphanumeric with hyphens only",
});
export const imageUrlValidator = z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal(""));
export const seoMetadataValidator = z.object({
    seoTitle: z.string().max(60, "SEO title max 60 chars").optional(),
    seoDescription: z.string().max(160, "SEO description max 160 chars").optional(),
    seoKeywords: z.array(z.string().max(50)).max(20).optional(),
    canonicalUrl: z.string().url().optional().or(z.literal("")),
    ogImage: imageUrlValidator,
});
export const paginationQueryValidator = z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10),
    sortBy: z
        .enum(["publishedAt", "views", "createdAt", "title"])
        .optional()
        .default("publishedAt"),
    sortOrder: z.enum(["asc", "desc"]).optional().default("desc"),
    cursor: z.string().optional(),
});
// ─────────────────────────────────────────────────────────────────────────────
// Blog Schemas
// ─────────────────────────────────────────────────────────────────────────────
export const BlogStatusEnum = z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]);
export const CreateBlogSchema = z
    .object({
    title: z.string().min(3, "Title min 3 chars").max(200, "Title max 200 chars"),
    slug: slugValidator.optional(),
    excerpt: z.string().max(500).optional(),
    content: z.any(), // Flexible content for TipTap
    featuredImage: imageUrlValidator,
    categoryId: z.string().optional(),
    tagIds: z.array(z.string()).max(10).optional().default([]),
    status: BlogStatusEnum.default("DRAFT"),
    isFeatured: z.boolean().default(false),
    scheduledAt: z.string().datetime().optional(),
})
    .merge(seoMetadataValidator);
export const UpdateBlogSchema = CreateBlogSchema.partial().extend({
    publishedAt: z.string().datetime().optional().nullable(),
});
export const PublishBlogSchema = z.object({
    publishedAt: z.string().datetime().optional(),
});
export const BlogQuerySchema = z
    .object({
    status: BlogStatusEnum.optional(),
    categoryId: z.string().optional(),
    categorySlug: z.string().optional(),
    tagSlug: z.string().optional(),
    search: z.string().max(100).optional(),
    isFeatured: z.coerce.boolean().optional(),
})
    .merge(paginationQueryValidator);
// ─────────────────────────────────────────────────────────────────────────────
// Category Schemas
// ─────────────────────────────────────────────────────────────────────────────
export const CategorySchema = z.object({
    name: z.string().min(2).max(100),
    slug: slugValidator.optional(),
    description: z.string().max(500).optional(),
    color: z
        .string()
        .regex(/^#[0-9A-Fa-f]{6}$/, "Must be a valid hex color")
        .optional()
        .default("#6366f1"),
});
export const UpdateCategorySchema = CategorySchema.partial();
// ─────────────────────────────────────────────────────────────────────────────
// Tag Schemas
// ─────────────────────────────────────────────────────────────────────────────
export const TagSchema = z.object({
    name: z.string().min(1).max(60),
    slug: slugValidator.optional(),
});
export const UpdateTagSchema = TagSchema.partial();
// ─────────────────────────────────────────────────────────────────────────────
// Comment Schemas
// ─────────────────────────────────────────────────────────────────────────────
export const CreateCommentSchema = z.object({
    postId: z.string().min(1),
    name: z.string().min(2).max(100),
    email: z.string().email(),
    comment: z.string().min(5).max(2000),
});
export const CommentStatusEnum = z.enum(["PENDING", "APPROVED", "SPAM"]);
//# sourceMappingURL=blog.schemas.js.map