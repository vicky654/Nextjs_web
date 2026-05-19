export declare enum BlogStatus {
    DRAFT = "DRAFT",
    PUBLISHED = "PUBLISHED",
    ARCHIVED = "ARCHIVED"
}
export declare enum CommentStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    SPAM = "SPAM"
}
export interface BlogAuthor {
    id: string;
    name: string | null;
    email: string;
}
export interface BlogCategoryType {
    id: string;
    name: string;
    slug: string;
    description?: string | null;
    color?: string | null;
    createdAt: string | Date;
    updatedAt: string | Date;
    _count?: {
        posts: number;
    };
}
export interface BlogTagType {
    id: string;
    name: string;
    slug: string;
    _count?: {
        posts: number;
    };
}
export interface BlogPostType {
    id: string;
    title: string;
    slug: string;
    excerpt?: string | null;
    content: BlogContent | any;
    featuredImage?: string | null;
    author: BlogAuthor;
    authorId: string;
    category?: BlogCategoryType | null;
    categoryId?: string | null;
    tags: BlogTagType[];
    tagIds: string[];
    status: BlogStatus;
    seoTitle?: string | null;
    seoDescription?: string | null;
    seoKeywords: string[];
    canonicalUrl?: string | null;
    ogImage?: string | null;
    readingTime?: number | null;
    views: number;
    isFeatured: boolean;
    publishedAt?: string | Date | null;
    scheduledAt?: string | Date | null;
    deletedAt?: string | Date | null;
    createdAt: string | Date;
    updatedAt: string | Date;
    comments?: BlogCommentType[];
    _count?: {
        comments: number;
    };
}
export interface BlogContent {
    type: string;
    content?: BlogContentNode[];
}
export interface BlogContentNode {
    type: string;
    attrs?: Record<string, unknown>;
    content?: BlogContentNode[];
    marks?: {
        type: string;
        attrs?: Record<string, unknown>;
    }[];
    text?: string;
}
export interface BlogCommentType {
    id: string;
    postId: string;
    name: string;
    email: string;
    comment: string;
    status: CommentStatus;
    createdAt: string | Date;
}
//# sourceMappingURL=blog.types.d.ts.map