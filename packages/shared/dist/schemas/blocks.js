import { z } from "zod";
export const HeroBlockSchema = z.object({
    title: z.string().min(1, "Title is required"),
    subtitle: z.string().optional(),
    description: z.string().optional(),
    buttonText: z.string().optional(),
    buttonLink: z.string().optional(),
    image: z.string().optional(),
});
export const FeatureItemSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    icon: z.string().optional(),
});
export const FeaturesBlockSchema = z.object({
    title: z.string().min(1, "Title is required"),
    subtitle: z.string().optional(),
    features: z.array(FeatureItemSchema),
});
export const PricingItemSchema = z.object({
    id: z.string(),
    planName: z.string(),
    price: z.string(),
    description: z.string().optional(),
    features: z.array(z.string()),
    isPopular: z.boolean().default(false),
    buttonText: z.string().optional(),
    buttonLink: z.string().optional(),
});
export const PricingBlockSchema = z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    plans: z.array(PricingItemSchema),
});
export const FAQItemSchema = z.object({
    id: z.string(),
    question: z.string(),
    answer: z.string(),
});
export const FAQBlockSchema = z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    items: z.array(FAQItemSchema),
});
export const SectionTypeSchema = z.enum([
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
export const HomepageBlockSchema = z.object({
    sectionType: SectionTypeSchema,
    title: z.string().optional(),
    slug: z.string().optional(),
    content: z.any(), // Will be validated based on sectionType
    metadata: z.record(z.any()).optional(),
    sortOrder: z.number().int(),
    isActive: z.boolean().default(true),
});
//# sourceMappingURL=blocks.js.map