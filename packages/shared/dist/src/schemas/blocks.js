"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomepageBlockSchema = exports.SectionTypeSchema = exports.FAQBlockSchema = exports.FAQItemSchema = exports.PricingBlockSchema = exports.PricingItemSchema = exports.FeaturesBlockSchema = exports.FeatureItemSchema = exports.HeroBlockSchema = void 0;
const zod_1 = require("zod");
exports.HeroBlockSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required"),
    subtitle: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    buttonText: zod_1.z.string().optional(),
    buttonLink: zod_1.z.string().optional(),
    image: zod_1.z.string().optional(),
});
exports.FeatureItemSchema = zod_1.z.object({
    id: zod_1.z.string(),
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    icon: zod_1.z.string().optional(),
});
exports.FeaturesBlockSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required"),
    subtitle: zod_1.z.string().optional(),
    features: zod_1.z.array(exports.FeatureItemSchema),
});
exports.PricingItemSchema = zod_1.z.object({
    id: zod_1.z.string(),
    planName: zod_1.z.string(),
    price: zod_1.z.string(),
    description: zod_1.z.string().optional(),
    features: zod_1.z.array(zod_1.z.string()),
    isPopular: zod_1.z.boolean().default(false),
    buttonText: zod_1.z.string().optional(),
    buttonLink: zod_1.z.string().optional(),
});
exports.PricingBlockSchema = zod_1.z.object({
    title: zod_1.z.string(),
    subtitle: zod_1.z.string().optional(),
    plans: zod_1.z.array(exports.PricingItemSchema),
});
exports.FAQItemSchema = zod_1.z.object({
    id: zod_1.z.string(),
    question: zod_1.z.string(),
    answer: zod_1.z.string(),
});
exports.FAQBlockSchema = zod_1.z.object({
    title: zod_1.z.string(),
    subtitle: zod_1.z.string().optional(),
    items: zod_1.z.array(exports.FAQItemSchema),
});
exports.SectionTypeSchema = zod_1.z.enum([
    "hero",
    "features",
    "faq",
    "pricing",
    "testimonials",
    "stats",
    "about",
    "cta",
    "contact",
    "footer",
    "navbar",
]);
exports.HomepageBlockSchema = zod_1.z.object({
    sectionType: exports.SectionTypeSchema,
    title: zod_1.z.string().optional(),
    slug: zod_1.z.string().optional(),
    content: zod_1.z.any(), // Will be validated based on sectionType
    metadata: zod_1.z.record(zod_1.z.any()).optional(),
    sortOrder: zod_1.z.number().int(),
    isActive: zod_1.z.boolean().default(true),
});
