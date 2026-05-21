import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import HomeFooter from "@/components/home/HomeFooter";
import AboutPageContent from "@/components/about/AboutPageContent";
import { buildPageMeta } from "@/lib/seo";

export const metadata: Metadata = buildPageMeta({
  title: "About DPDP Consultants | Data Protection Experts",
  description:
    "Learn about DPDP Consultants — your trusted partner for data protection and privacy compliance. Our certified experts help businesses navigate DPDP Act and GDPR.",
  keywords:
    "about DPDP Consultants, data protection consultants, privacy compliance experts, GDPR advisory India",
  canonicalPath: "/about/",
});

export default function AboutPage() {
  return (
    <>
      <Header />
      <AboutPageContent />
      <HomeFooter />
    </>
  );
}
