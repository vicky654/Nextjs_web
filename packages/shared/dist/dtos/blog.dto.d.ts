import { BlogPostType, BlogCategoryType } from "../types/blog.types";
/**
 * Serialized version of a blog post for safe Next.js consumption.
 * Dates are converted to ISO strings.
 */
export interface BlogPostDTO extends Omit<BlogPostType, "publishedAt" | "createdAt" | "updatedAt" | "scheduledAt" | "deletedAt"> {
    publishedAt: string | null;
    createdAt: string;
    updatedAt: string;
    scheduledAt: string | null;
    deletedAt: string | null;
}
/**
 * Serialized version of a category.
 */
export interface BlogCategoryDTO extends Omit<BlogCategoryType, "createdAt" | "updatedAt"> {
    createdAt: string;
    updatedAt: string;
}
/**
 * Utility to serialize Date or string to ISO string.
 */
export declare const toISO: (date: Date | string | null | undefined) => string | null;
/**
 * Mapper to convert raw BlogPost to DTO.
 */
export declare const mapToBlogPostDTO: (post: any) => BlogPostDTO;
export declare const mapToCategoryDTO: (cat: any) => BlogCategoryDTO;
export declare const mapToTagDTO: (tag: any) => any;
//# sourceMappingURL=blog.dto.d.ts.map