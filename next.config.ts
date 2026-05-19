import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: ["./node_modules", "./src/styles"],
  },

  async rewrites() {
    return [
      // Existing rewrites
      { source: "/draft-dpdp-rules-2025.php", destination: "/resources/draft-dpdp-rules-2025" },
      { source: "/about.php", destination: "/about" },
      { source: "/about-us.php", destination: "/about" },
      { source: "/services.php", destination: "/services" },
      { source: "/privacy-policy.php", destination: "/privacy-policy" },
      { source: "/privacy-statement.php", destination: "/privacy-policy" },
      { source: "/terms-conditions.php", destination: "/terms-conditions" },
      { source: "/index.php", destination: "/" },

      // Blog (middleware handles blog.php?id= redirects)
      { source: "/blog-page-01.php", destination: "/blog" },
      { source: "/blogs.php", destination: "/blog" },

      // Compliance Tools
      { source: "/contact.php", destination: "/contact-us/" },
      { source: "/consent-management-tool.php", destination: "/consent-management-platform/" },
      { source: "/cookie-consent-management.php", destination: "/Cookie-Consent-Management/" },
      { source: "/data-protection-third-party.php", destination: "/Data-Protection-Third-Party-Processors-Assessment/" },
      { source: "/data-subject-rights-and-grievance-management.php", destination: "/Data-Subject-Rights-and-Grievance-Management/" },
      { source: "/data-protection-impact-assessment.php", destination: "/Data-Protection-Impact-Assessment/" },

      // GDPR Issues
      { source: "/administrative-fines-and-penalties.php", destination: "/administrative-fines-and-penalties/" },
      { source: "/data-transfer-issues.php", destination: "/data-transfer-issues/" },
      { source: "/GDPR-and-rest-of-the-world.php", destination: "/GDPR-and-rest-of-the-world/" },
      { source: "/GDPR-and-business-development.php", destination: "/GDPR-and-business-development/" },
      { source: "/GDPR-and-hotel-Industry.php", destination: "/GDPR-and-hotel-Industry/" },
      { source: "/GDPR-and-software-development.php", destination: "/GDPR-and-software-development/" },
      { source: "/GDPR-and-elearning-business.php", destination: "/GDPR-and-elearning-business/" },
      { source: "/subcontract-and-third-party-issues.php", destination: "/subcontract-and-third-party-issues/" },
      { source: "/GDPR-and-BIO.php", destination: "/GDPR-and-BIO/" },
      { source: "/GDPR-and-crypto-world.php", destination: "/GDPR-and-crypto-world/" },
      { source: "/gdpr-certification.php", destination: "/gdpr-certification/" },
      { source: "/business-discontinuity.php", destination: "/business-discontinuity/" },
      { source: "/GDPR-and-EU-Representation.php", destination: "/GDPR-and-EU-Representation/" },
      { source: "/GDPR-and-NGO.php", destination: "/GDPR-and-NGO/" },
    ];
  },
};

export default nextConfig;
