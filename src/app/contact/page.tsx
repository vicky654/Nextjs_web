import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us - DPDP Consultants",
};

export default function ContactPage() {
  return (
    <>
      <Header />

      <main className="container py-5">
        <h1>Contact</h1>
        <ContactForm />
      </main>

      <Footer />
    </>
  );
}
