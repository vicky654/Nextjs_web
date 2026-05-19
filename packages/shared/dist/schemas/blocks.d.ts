import { z } from "zod";
export declare const HeroBlockSchema: z.ZodObject<{
    title: z.ZodString;
    subtitle: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    buttonText: z.ZodOptional<z.ZodString>;
    buttonLink: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    title: string;
    subtitle?: string | undefined;
    description?: string | undefined;
    buttonText?: string | undefined;
    buttonLink?: string | undefined;
    image?: string | undefined;
}, {
    title: string;
    subtitle?: string | undefined;
    description?: string | undefined;
    buttonText?: string | undefined;
    buttonLink?: string | undefined;
    image?: string | undefined;
}>;
export declare const FeatureItemSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    description: z.ZodString;
    icon: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    title: string;
    description: string;
    id: string;
    icon?: string | undefined;
}, {
    title: string;
    description: string;
    id: string;
    icon?: string | undefined;
}>;
export declare const FeaturesBlockSchema: z.ZodObject<{
    title: z.ZodString;
    subtitle: z.ZodOptional<z.ZodString>;
    features: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        description: z.ZodString;
        icon: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        title: string;
        description: string;
        id: string;
        icon?: string | undefined;
    }, {
        title: string;
        description: string;
        id: string;
        icon?: string | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    title: string;
    features: {
        title: string;
        description: string;
        id: string;
        icon?: string | undefined;
    }[];
    subtitle?: string | undefined;
}, {
    title: string;
    features: {
        title: string;
        description: string;
        id: string;
        icon?: string | undefined;
    }[];
    subtitle?: string | undefined;
}>;
export declare const PricingItemSchema: z.ZodObject<{
    id: z.ZodString;
    planName: z.ZodString;
    price: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    features: z.ZodArray<z.ZodString, "many">;
    isPopular: z.ZodDefault<z.ZodBoolean>;
    buttonText: z.ZodOptional<z.ZodString>;
    buttonLink: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    features: string[];
    planName: string;
    price: string;
    isPopular: boolean;
    description?: string | undefined;
    buttonText?: string | undefined;
    buttonLink?: string | undefined;
}, {
    id: string;
    features: string[];
    planName: string;
    price: string;
    description?: string | undefined;
    buttonText?: string | undefined;
    buttonLink?: string | undefined;
    isPopular?: boolean | undefined;
}>;
export declare const PricingBlockSchema: z.ZodObject<{
    title: z.ZodString;
    subtitle: z.ZodOptional<z.ZodString>;
    plans: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        planName: z.ZodString;
        price: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        features: z.ZodArray<z.ZodString, "many">;
        isPopular: z.ZodDefault<z.ZodBoolean>;
        buttonText: z.ZodOptional<z.ZodString>;
        buttonLink: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        features: string[];
        planName: string;
        price: string;
        isPopular: boolean;
        description?: string | undefined;
        buttonText?: string | undefined;
        buttonLink?: string | undefined;
    }, {
        id: string;
        features: string[];
        planName: string;
        price: string;
        description?: string | undefined;
        buttonText?: string | undefined;
        buttonLink?: string | undefined;
        isPopular?: boolean | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    title: string;
    plans: {
        id: string;
        features: string[];
        planName: string;
        price: string;
        isPopular: boolean;
        description?: string | undefined;
        buttonText?: string | undefined;
        buttonLink?: string | undefined;
    }[];
    subtitle?: string | undefined;
}, {
    title: string;
    plans: {
        id: string;
        features: string[];
        planName: string;
        price: string;
        description?: string | undefined;
        buttonText?: string | undefined;
        buttonLink?: string | undefined;
        isPopular?: boolean | undefined;
    }[];
    subtitle?: string | undefined;
}>;
export declare const FAQItemSchema: z.ZodObject<{
    id: z.ZodString;
    question: z.ZodString;
    answer: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    question: string;
    answer: string;
}, {
    id: string;
    question: string;
    answer: string;
}>;
export declare const FAQBlockSchema: z.ZodObject<{
    title: z.ZodString;
    subtitle: z.ZodOptional<z.ZodString>;
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        question: z.ZodString;
        answer: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        question: string;
        answer: string;
    }, {
        id: string;
        question: string;
        answer: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    title: string;
    items: {
        id: string;
        question: string;
        answer: string;
    }[];
    subtitle?: string | undefined;
}, {
    title: string;
    items: {
        id: string;
        question: string;
        answer: string;
    }[];
    subtitle?: string | undefined;
}>;
export declare const SectionTypeSchema: z.ZodEnum<["hero", "features", "faq", "pricing", "testimonials", "stats", "about", "cta", "contact", "footer", "navbar"]>;
export declare const HomepageBlockSchema: z.ZodObject<{
    sectionType: z.ZodEnum<["hero", "features", "faq", "pricing", "testimonials", "stats", "about", "cta", "contact", "footer", "navbar"]>;
    title: z.ZodOptional<z.ZodString>;
    slug: z.ZodOptional<z.ZodString>;
    content: z.ZodAny;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    sortOrder: z.ZodNumber;
    isActive: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    sectionType: "features" | "hero" | "faq" | "pricing" | "testimonials" | "stats" | "about" | "cta" | "contact" | "footer" | "navbar";
    sortOrder: number;
    isActive: boolean;
    title?: string | undefined;
    slug?: string | undefined;
    content?: any;
    metadata?: Record<string, any> | undefined;
}, {
    sectionType: "features" | "hero" | "faq" | "pricing" | "testimonials" | "stats" | "about" | "cta" | "contact" | "footer" | "navbar";
    sortOrder: number;
    title?: string | undefined;
    slug?: string | undefined;
    content?: any;
    metadata?: Record<string, any> | undefined;
    isActive?: boolean | undefined;
}>;
//# sourceMappingURL=blocks.d.ts.map