/**
 * Utility to serialize Date or string to ISO string.
 */
export const toISO = (date) => {
    if (!date)
        return null;
    if (typeof date === "string")
        return date;
    return date.toISOString();
};
/**
 * Mapper to convert raw BlogPost to DTO.
 */
export const mapToBlogPostDTO = (post) => {
    return {
        ...post,
        publishedAt: toISO(post.publishedAt),
        createdAt: toISO(post.createdAt),
        updatedAt: toISO(post.updatedAt),
        scheduledAt: toISO(post.scheduledAt),
        deletedAt: toISO(post.deletedAt),
        // Ensure nested objects are also mapped if they exist
        category: post.category ? mapToCategoryDTO(post.category) : undefined,
        tags: post.tags?.map(mapToTagDTO) || [],
    };
};
export const mapToCategoryDTO = (cat) => {
    return {
        ...cat,
        createdAt: toISO(cat.createdAt),
        updatedAt: toISO(cat.updatedAt),
    };
};
export const mapToTagDTO = (tag) => {
    return {
        ...tag,
        createdAt: toISO(tag.createdAt),
        updatedAt: toISO(tag.updatedAt),
    };
};
//# sourceMappingURL=blog.dto.js.map