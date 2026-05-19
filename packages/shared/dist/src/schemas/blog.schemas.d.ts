import { z } from "zod";
export declare const slugValidator: z.ZodString;
export declare const imageUrlValidator: z.ZodUnion<[z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>, z.ZodLiteral<"">]>;
export declare const seoMetadataValidator: z.ZodObject<{
    seoTitle: z.ZodOptional<z.ZodString>;
    seoDescription: z.ZodOptional<z.ZodString>;
    seoKeywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    canonicalUrl: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    ogImage: z.ZodUnion<[z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>, z.ZodLiteral<"">]>;
}, "strip", z.ZodTypeAny, {
    seoTitle?: string | undefined;
    seoDescription?: string | undefined;
    seoKeywords?: string[] | undefined;
    canonicalUrl?: string | undefined;
    ogImage?: string | undefined;
}, {
    seoTitle?: string | undefined;
    seoDescription?: string | undefined;
    seoKeywords?: string[] | undefined;
    canonicalUrl?: string | undefined;
    ogImage?: string | undefined;
}>;
export declare const paginationQueryValidator: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    sortBy: z.ZodDefault<z.ZodOptional<z.ZodEnum<["publishedAt", "views", "createdAt", "title"]>>>;
    sortOrder: z.ZodDefault<z.ZodOptional<z.ZodEnum<["asc", "desc"]>>>;
    cursor: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    sortOrder: "asc" | "desc";
    page: number;
    limit: number;
    sortBy: "title" | "publishedAt" | "views" | "createdAt";
    cursor?: string | undefined;
}, {
    sortOrder?: "asc" | "desc" | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: "title" | "publishedAt" | "views" | "createdAt" | undefined;
    cursor?: string | undefined;
}>;
export declare const BlogStatusEnum: z.ZodEnum<["DRAFT", "PUBLISHED", "ARCHIVED"]>;
export declare const CreateBlogSchema: z.ZodObject<{
    title: z.ZodString;
    slug: z.ZodOptional<z.ZodString>;
    excerpt: z.ZodOptional<z.ZodString>;
    content: z.ZodAny;
    featuredImage: z.ZodUnion<[z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>, z.ZodLiteral<"">]>;
    categoryId: z.ZodOptional<z.ZodString>;
    tagIds: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
    status: z.ZodDefault<z.ZodEnum<["DRAFT", "PUBLISHED", "ARCHIVED"]>>;
    isFeatured: z.ZodDefault<z.ZodBoolean>;
    scheduledAt: z.ZodOptional<z.ZodString>;
} & {
    seoTitle: z.ZodOptional<z.ZodString>;
    seoDescription: z.ZodOptional<z.ZodString>;
    seoKeywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    canonicalUrl: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    ogImage: z.ZodUnion<[z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>, z.ZodLiteral<"">]>;
}, "strip", z.ZodTypeAny, {
    title: string;
    status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
    tagIds: string[];
    isFeatured: boolean;
    slug?: string | undefined;
    content?: any;
    seoTitle?: string | undefined;
    seoDescription?: string | undefined;
    seoKeywords?: string[] | undefined;
    canonicalUrl?: string | undefined;
    ogImage?: string | undefined;
    excerpt?: string | undefined;
    featuredImage?: string | undefined;
    categoryId?: string | undefined;
    scheduledAt?: string | undefined;
}, {
    title: string;
    status?: "DRAFT" | "PUBLISHED" | "ARCHIVED" | undefined;
    slug?: string | undefined;
    content?: any;
    seoTitle?: string | undefined;
    seoDescription?: string | undefined;
    seoKeywords?: string[] | undefined;
    canonicalUrl?: string | undefined;
    ogImage?: string | undefined;
    excerpt?: string | undefined;
    featuredImage?: string | undefined;
    categoryId?: string | undefined;
    tagIds?: string[] | undefined;
    isFeatured?: boolean | undefined;
    scheduledAt?: string | undefined;
}>;
export declare const UpdateBlogSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    slug: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    excerpt: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    content: z.ZodOptional<z.ZodAny>;
    featuredImage: z.ZodOptional<z.ZodUnion<[z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>, z.ZodLiteral<"">]>>;
    categoryId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    tagIds: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>>;
    status: z.ZodOptional<z.ZodDefault<z.ZodEnum<["DRAFT", "PUBLISHED", "ARCHIVED"]>>>;
    isFeatured: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    scheduledAt: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    seoTitle: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    seoDescription: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    seoKeywords: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
    canonicalUrl: z.ZodOptional<z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>>;
    ogImage: z.ZodOptional<z.ZodUnion<[z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>, z.ZodLiteral<"">]>>;
} & {
    publishedAt: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    title?: string | undefined;
    status?: "DRAFT" | "PUBLISHED" | "ARCHIVED" | undefined;
    slug?: string | undefined;
    content?: any;
    seoTitle?: string | undefined;
    seoDescription?: string | undefined;
    seoKeywords?: string[] | undefined;
    canonicalUrl?: string | undefined;
    ogImage?: string | undefined;
    publishedAt?: string | null | undefined;
    excerpt?: string | undefined;
    featuredImage?: string | undefined;
    categoryId?: string | undefined;
    tagIds?: string[] | undefined;
    isFeatured?: boolean | undefined;
    scheduledAt?: string | undefined;
}, {
    title?: string | undefined;
    status?: "DRAFT" | "PUBLISHED" | "ARCHIVED" | undefined;
    slug?: string | undefined;
    content?: any;
    seoTitle?: string | undefined;
    seoDescription?: string | undefined;
    seoKeywords?: string[] | undefined;
    canonicalUrl?: string | undefined;
    ogImage?: string | undefined;
    publishedAt?: string | null | undefined;
    excerpt?: string | undefined;
    featuredImage?: string | undefined;
    categoryId?: string | undefined;
    tagIds?: string[] | undefined;
    isFeatured?: boolean | undefined;
    scheduledAt?: string | undefined;
}>;
export declare const PublishBlogSchema: z.ZodObject<{
    publishedAt: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    publishedAt?: string | undefined;
}, {
    publishedAt?: string | undefined;
}>;
export declare const BlogQuerySchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodEnum<["DRAFT", "PUBLISHED", "ARCHIVED"]>>;
    categoryId: z.ZodOptional<z.ZodString>;
    categorySlug: z.ZodOptional<z.ZodString>;
    tagSlug: z.ZodOptional<z.ZodString>;
    search: z.ZodOptional<z.ZodString>;
    isFeatured: z.ZodOptional<z.ZodBoolean>;
} & {
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    sortBy: z.ZodDefault<z.ZodOptional<z.ZodEnum<["publishedAt", "views", "createdAt", "title"]>>>;
    sortOrder: z.ZodDefault<z.ZodOptional<z.ZodEnum<["asc", "desc"]>>>;
    cursor: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    sortOrder: "asc" | "desc";
    page: number;
    limit: number;
    sortBy: "title" | "publishedAt" | "views" | "createdAt";
    status?: "DRAFT" | "PUBLISHED" | "ARCHIVED" | undefined;
    cursor?: string | undefined;
    categoryId?: string | undefined;
    isFeatured?: boolean | undefined;
    categorySlug?: string | undefined;
    tagSlug?: string | undefined;
    search?: string | undefined;
}, {
    status?: "DRAFT" | "PUBLISHED" | "ARCHIVED" | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: "title" | "publishedAt" | "views" | "createdAt" | undefined;
    cursor?: string | undefined;
    categoryId?: string | undefined;
    isFeatured?: boolean | undefined;
    categorySlug?: string | undefined;
    tagSlug?: string | undefined;
    search?: string | undefined;
}>;
export declare const CategorySchema: z.ZodObject<{
    name: z.ZodString;
    slug: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    color: z.ZodDefault<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    color: string;
    description?: string | undefined;
    slug?: string | undefined;
}, {
    name: string;
    description?: string | undefined;
    slug?: string | undefined;
    color?: string | undefined;
}>;
export declare const UpdateCategorySchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    slug: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    color: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodString>>>;
}, "strip", z.ZodTypeAny, {
    description?: string | undefined;
    slug?: string | undefined;
    name?: string | undefined;
    color?: string | undefined;
}, {
    description?: string | undefined;
    slug?: string | undefined;
    name?: string | undefined;
    color?: string | undefined;
}>;
export declare const TagSchema: z.ZodObject<{
    name: z.ZodString;
    slug: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    slug?: string | undefined;
}, {
    name: string;
    slug?: string | undefined;
}>;
export declare const UpdateTagSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    slug: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    slug?: string | undefined;
    name?: string | undefined;
}, {
    slug?: string | undefined;
    name?: string | undefined;
}>;
export declare const CreateCommentSchema: z.ZodObject<{
    postId: z.ZodString;
    name: z.ZodString;
    email: z.ZodString;
    comment: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    postId: string;
    email: string;
    comment: string;
}, {
    name: string;
    postId: string;
    email: string;
    comment: string;
}>;
export declare const CommentStatusEnum: z.ZodEnum<["PENDING", "APPROVED", "SPAM"]>;
export type CreateBlogInput = z.infer<typeof CreateBlogSchema>;
export type UpdateBlogInput = z.infer<typeof UpdateBlogSchema>;
export type BlogQueryInput = z.infer<typeof BlogQuerySchema>;
export type CategoryInput = z.infer<typeof CategorySchema>;
export type TagInput = z.infer<typeof TagSchema>;
export type CreateCommentInput = z.infer<typeof CreateCommentSchema>;
