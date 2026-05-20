/**
 * Demo data seed script
 * Run: node scripts/seed.mjs
 * Requires MONGODB_URI in .env.local (auto-loaded)
 */

import mongoose from 'mongoose';
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load .env.local
const envPath = join(__dirname, '..', '.env.local');
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const eq = t.indexOf('=');
    if (eq < 0) continue;
    const key = t.slice(0, eq).trim();
    const val = t.slice(eq + 1).trim().replace(/^['"]|['"]$/g, '');
    if (key && !process.env[key]) process.env[key] = val;
  }
}

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) { console.error('❌  MONGODB_URI not found in .env.local'); process.exit(1); }

// ─── Inline Schemas ────────────────────────────────────────────────────────
const BlogSchema = new mongoose.Schema({
  status: { type: Boolean, default: false },
  recdate: { type: Date, default: Date.now },
  recpub: String,
  rectitle: { type: String, required: true },
  recdesc: { type: String, default: '' },
  summary: String,
  metadesc: String,
  metakeyw: String,
  recimg: String,
  imgalt: String,
  recfile: String,
  slug: { type: String, unique: true, sparse: true },
  author: { type: String, default: 'GDPR Consultants' },
  author_image: String,
  category: { type: String, default: 'GDPR' },
  tags: [String],
  read_time: Number,
  faq_schema: mongoose.Schema.Types.Mixed,
  updated_at: Date,
  is_featured: { type: Boolean, default: false },
  is_archived: { type: Boolean, default: false },
}, { timestamps: false });

const TeamSchema = new mongoose.Schema({
  name: String,
  designation: String,
  image: { type: String, default: '' },
  bio: { type: String, default: '' },
  social_links: { linkedin: String, twitter: String, email: String },
  expertise: [String],
  order: { type: Number, default: 0 },
  is_active: { type: Boolean, default: true },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

const LogoSchema = new mongoose.Schema({
  company_name: String,
  logo: { type: String, default: '' },
  website: { type: String, default: '' },
  order: { type: Number, default: 0 },
  is_active: { type: Boolean, default: true },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

// ─── Blog Content Helper ────────────────────────────────────────────────────
function blogHtml(intro, points, conclusion) {
  const pointsHtml = points.map(([h, p]) =>
    `<h2>${h}</h2><p>${p}</p>`
  ).join('\n');
  return `<p>${intro}</p>\n${pointsHtml}\n<p>${conclusion}</p>`;
}

// ─── Seed Data ─────────────────────────────────────────────────────────────
const BLOGS = [
  {
    rectitle: 'Understanding GDPR Compliance in 2024: A Complete Business Guide',
    slug: 'understanding-gdpr-compliance-2024-business-guide',
    summary: 'A comprehensive guide to GDPR compliance covering key principles, obligations, and practical steps every business must take in 2024.',
    recdesc: blogHtml(
      'The General Data Protection Regulation (GDPR) continues to be one of the most impactful privacy laws globally. Since its enforcement in May 2018, it has reshaped how organizations collect, process, and protect personal data. As we navigate 2024, GDPR compliance remains not just a legal requirement but a critical business differentiator.',
      [
        ['The Core Principles of GDPR', 'GDPR is built on seven foundational principles: lawfulness, fairness and transparency; purpose limitation; data minimisation; accuracy; storage limitation; integrity and confidentiality; and accountability. Every data processing activity your organization undertakes must align with these principles. Failure to comply can result in fines of up to €20 million or 4% of global annual turnover, whichever is higher.'],
        ['Lawful Bases for Processing', 'Under GDPR, you must identify a lawful basis before processing personal data. The six bases are: consent, contract, legal obligation, vital interests, public task, and legitimate interests. Consent must be freely given, specific, informed, and unambiguous. Many organizations over-rely on consent when other lawful bases may be more appropriate and less administratively burdensome.'],
        ['Data Subject Rights', 'GDPR grants individuals eight key rights: the right to be informed, right of access, right to rectification, right to erasure, right to restrict processing, right to data portability, right to object, and rights related to automated decision-making. Organizations must have processes in place to respond to these requests within one month.'],
        ['Technical and Organisational Measures', 'Article 32 requires organizations to implement appropriate technical and organisational measures to ensure security appropriate to the risk. This includes encryption, pseudonymisation, regular testing of security measures, and ensuring ongoing confidentiality, integrity, and availability of processing systems.'],
        ['Data Breach Response', 'Organizations must report personal data breaches to the supervisory authority within 72 hours of becoming aware of the breach. If the breach is likely to result in a high risk to individuals, those individuals must also be notified without undue delay. Having a documented breach response plan is essential.'],
      ],
      'GDPR compliance is not a one-time project but an ongoing commitment. Organizations that embed privacy into their culture and operations are not only protecting themselves from regulatory risk but also building trust with their customers. Contact GDPR Consultants today to assess your compliance posture and develop a roadmap for sustainable compliance.'
    ),
    metadesc: 'Complete guide to GDPR compliance in 2024. Learn key principles, data subject rights, breach response requirements, and practical compliance steps for businesses.',
    metakeyw: 'GDPR compliance 2024, GDPR guide, data protection regulation, GDPR obligations',
    recimg: 'https://picsum.photos/seed/gdpr-guide/800/450',
    imgalt: 'GDPR Compliance Guide 2024',
    author: 'Rahul Sharma',
    category: 'GDPR',
    tags: ['GDPR', 'Compliance', 'Data Protection', '2024', 'Privacy Law'],
    read_time: 9,
    status: true,
    is_featured: true,
    recdate: new Date('2024-01-15'),
  },
  {
    rectitle: 'DPDP Act 2023: What Every Indian Business Must Know',
    slug: 'dpdp-act-2023-india-guide-businesses',
    summary: 'The Digital Personal Data Protection Act 2023 fundamentally changes data privacy in India. This guide explains what it means for your business.',
    recdesc: blogHtml(
      'India\'s Digital Personal Data Protection (DPDP) Act 2023 received Presidential assent on August 11, 2023, marking a watershed moment in Indian data governance. This landmark legislation establishes a comprehensive framework for the protection of digital personal data and creates significant obligations for businesses operating in India.',
      [
        ['Key Definitions and Scope', 'The DPDP Act applies to the processing of digital personal data within India, and also to processing outside India where it is done in connection with offering goods or services to data principals within India. "Personal data" is defined broadly as any data about an identifiable individual. The Act introduces the concept of "data fiduciary" (equivalent to data controller under GDPR) and "data principal" (the individual whose data is processed).'],
        ['Consent Requirements', 'Processing of personal data requires free, specific, informed, unconditional and unambiguous consent. The notice must be in clear and plain language, and available in English and languages specified under the Eighth Schedule of the Constitution. Data principals have the right to withdraw consent at any time. Processing based on legitimate uses is permitted for certain specified purposes without consent.'],
        ['Rights of Data Principals', 'Data principals have the right to access information about their data, the right to correction and erasure, and the right of grievance redressal. They also have the right to nominate another individual to exercise their rights in case of death or incapacity — a unique feature of the DPDP Act not found in GDPR.'],
        ['Obligations of Data Fiduciaries', 'Data fiduciaries must implement appropriate technical and organisational measures to ensure effective observance of the Act. They must appoint a Data Protection Officer (for Significant Data Fiduciaries), maintain accuracy of data, implement data retention limits, and enable data principals to exercise their rights.'],
        ['Significant Data Fiduciaries', 'The Central Government may designate certain data fiduciaries as "Significant Data Fiduciaries" based on volume of data processed, risk to rights of data principals, national security implications, and other factors. These entities face additional obligations including mandatory Data Protection Impact Assessments and independent data audits.'],
        ['Penalties and Enforcement', 'The DPDP Act imposes significant penalties for violations. Failure to implement reasonable security safeguards resulting in a data breach can attract penalties up to ₹250 crore. Failure to notify data breaches can attract penalties up to ₹200 crore. The Data Protection Board of India will be established as the adjudicatory body.'],
      ],
      'The DPDP Act represents a significant step forward in India\'s data protection landscape. Organizations should immediately begin gap assessments against the Act\'s requirements, particularly around consent mechanisms, data principal rights management, and breach response capabilities. Our team of DPDP specialists can guide you through every step of compliance.'
    ),
    metadesc: 'DPDP Act 2023 explained: key obligations, consent requirements, data principal rights, and penalty framework for Indian businesses.',
    metakeyw: 'DPDP Act 2023, Digital Personal Data Protection India, DPDP compliance, India data privacy law',
    recimg: 'https://picsum.photos/seed/dpdp-act/800/450',
    imgalt: 'DPDP Act 2023 India',
    author: 'Priya Mehta',
    category: 'DPDP',
    tags: ['DPDP Act', 'India', 'Data Protection', 'Compliance', 'Privacy Law'],
    read_time: 11,
    status: true,
    is_featured: true,
    recdate: new Date('2024-02-10'),
  },
  {
    rectitle: 'Cookie Consent Management: Best Practices for GDPR Compliance',
    slug: 'cookie-consent-management-best-practices-gdpr',
    summary: 'Cookie consent is a complex area often misimplemented. This guide covers GDPR-compliant cookie consent management from legal basis to technical implementation.',
    recdesc: blogHtml(
      'Cookie consent management sits at the intersection of user experience, legal compliance, and technical implementation. The Information Commissioner\'s Office (ICO) and other EU Data Protection Authorities have made clear that non-compliant cookie consent mechanisms are a top enforcement priority, with fines ranging from thousands to millions of euros.',
      [
        ['Understanding Cookie Categories', 'Not all cookies require consent. Strictly necessary cookies (for basic website functionality, security, and session management) are exempt from consent requirements. However, analytical cookies, marketing cookies, social media cookies, and preference cookies all require prior, informed consent. Misclassifying cookies to avoid consent requirements is a common compliance failure.'],
        ['The Consent Requirements', 'GDPR consent for cookies must be freely given (no consent walls), specific (separate consent for each cookie category), informed (clear information about what cookies do), and unambiguous (requiring a positive opt-in action). Pre-ticked boxes, vague language, and making consent difficult to withdraw all constitute non-compliance.'],
        ['Cookie Banner Design', 'Compliant cookie banners must present accept and reject options with equal prominence. The "reject all" option must be as easy to use as the "accept all" option. Dark patterns — such as making the reject button small, grey, or buried in secondary menus — have been the subject of significant enforcement action by the French CNIL and other DPAs.'],
        ['Record of Consent', 'Organizations must maintain a record of consent including when consent was given, what information was presented to the user, and what the user chose. This record must be producible upon request from a supervisory authority. Your Consent Management Platform (CMP) should automatically maintain these records.'],
        ['Cookie Auditing', 'Before implementing a cookie consent solution, conduct a thorough cookie audit to identify all cookies placed on your website, their purpose, duration, and the third parties they share data with. Many organizations discover cookies they weren\'t aware of, including legacy tracking pixels and analytics tools.'],
      ],
      'Cookie consent management is an ongoing process, not a one-time implementation. Technology stacks change, new services are added, and regulations evolve. Regular cookie audits — at least quarterly — combined with a robust CMP will keep you compliant. Our Cookie Consent Management Platform handles all of this automatically, with real-time updates to consent records and comprehensive audit trails.'
    ),
    metadesc: 'GDPR-compliant cookie consent management guide. Learn about cookie categories, consent requirements, banner design, and record-keeping obligations.',
    metakeyw: 'cookie consent GDPR, cookie compliance, consent management platform, cookie banner GDPR',
    recimg: 'https://picsum.photos/seed/cookie-consent/800/450',
    imgalt: 'Cookie Consent Management GDPR',
    author: 'Ananya Singh',
    category: 'Cookie Consent',
    tags: ['Cookie Consent', 'GDPR', 'Privacy', 'CMP', 'Compliance'],
    read_time: 7,
    status: true,
    is_featured: false,
    recdate: new Date('2024-03-05'),
  },
  {
    rectitle: 'Data Protection Impact Assessment (DPIA): A Step-by-Step Guide',
    slug: 'data-protection-impact-assessment-step-by-step-guide',
    summary: 'When is a DPIA mandatory? How do you conduct one? This comprehensive guide covers GDPR Article 35 requirements and walks through the DPIA process step by step.',
    recdesc: blogHtml(
      'Article 35 of the GDPR requires a Data Protection Impact Assessment (DPIA) before beginning any processing likely to result in a high risk to individuals\' rights and freedoms. Far from being a bureaucratic exercise, a well-executed DPIA is a powerful tool for identifying and mitigating privacy risks before they cause harm.',
      [
        ['When is a DPIA Mandatory?', 'A DPIA is always required for: systematic and extensive profiling with significant effects; processing of special categories of data on a large scale; and systematic monitoring of a publicly accessible area on a large scale. Supervisory authorities publish lists of processing activities that require a DPIA. When in doubt, conducting a DPIA is always the safer approach.'],
        ['Step 1: Describe the Processing', 'Document the nature, scope, context, and purposes of the processing activity. Include data flows, data subjects, retention periods, and technical architecture. This forms the foundation of the DPIA and ensures all relevant stakeholders understand what is being assessed.'],
        ['Step 2: Assess Necessity and Proportionality', 'Evaluate whether the processing is necessary for its stated purpose and whether less privacy-invasive alternatives could achieve the same aim. Consider the lawful basis, data minimisation, retention periods, data subject rights, and international transfers.'],
        ['Step 3: Identify and Assess Risks', 'Map all possible risks to data subjects\' rights and freedoms. Consider risks of unauthorized access, unexpected use, loss of access, and processing for incompatible purposes. Rate each risk by likelihood and severity to determine the overall risk level.'],
        ['Step 4: Identify Measures to Address Risks', 'For each identified risk, determine technical and organisational measures to mitigate it. This includes encryption, access controls, pseudonymisation, staff training, contractual protections, and privacy-enhancing technologies. Document residual risks after mitigation.'],
        ['Step 5: Consult and Document', 'Seek the advice of your Data Protection Officer. Where applicable, consult with data subjects or their representatives. Document all decisions and the reasoning behind them. Maintain the DPIA as a living document that is reviewed when processing changes.'],
      ],
      'A DPIA is not just a legal obligation — it is a demonstration of accountability and a practical tool for building privacy into your operations. Organizations that conduct rigorous DPIAs identify privacy risks early, when they are least expensive to fix, and build the trust of regulators and data subjects alike.'
    ),
    metadesc: 'Step-by-step guide to Data Protection Impact Assessments (DPIA). Learn when a DPIA is required and how to conduct one under GDPR Article 35.',
    metakeyw: 'DPIA, Data Protection Impact Assessment, GDPR Article 35, privacy risk assessment',
    recimg: 'https://picsum.photos/seed/dpia-guide/800/450',
    imgalt: 'Data Protection Impact Assessment Guide',
    author: 'Rahul Sharma',
    category: 'DPIA',
    tags: ['DPIA', 'Risk Assessment', 'GDPR Article 35', 'Data Protection', 'Privacy'],
    read_time: 12,
    status: true,
    is_featured: true,
    recdate: new Date('2024-03-20'),
  },
  {
    rectitle: 'AI Systems and GDPR: Navigating the Compliance Landscape',
    slug: 'ai-systems-gdpr-compliance-landscape',
    summary: 'As AI becomes ubiquitous, so do GDPR compliance challenges. This article explores the intersection of artificial intelligence, data protection, and emerging AI regulation.',
    recdesc: blogHtml(
      'Artificial intelligence systems that process personal data are subject to GDPR, and compliance is far from straightforward. From automated decision-making restrictions to data minimisation challenges in machine learning, organizations deploying AI must navigate a complex and evolving regulatory landscape that now includes the EU AI Act.',
      [
        ['GDPR Restrictions on Automated Decision-Making', 'Article 22 of GDPR gives individuals the right not to be subject to decisions based solely on automated processing, including profiling, where those decisions produce legal or similarly significant effects. Where such processing is necessary, organizations must provide meaningful information about the logic involved and implement suitable safeguards.'],
        ['Lawful Basis for AI Training Data', 'Training large AI models requires vast amounts of data. Organizations must identify a lawful basis for collecting and using training data. Web-scraped data, purchased datasets, and historical business data all carry compliance risks. Legitimate interests can sometimes justify AI training, but a careful balancing test is required.'],
        ['Data Minimisation vs. AI Effectiveness', 'Machine learning models often benefit from more data, but GDPR requires data minimisation. This tension can be resolved through techniques like federated learning (training on device rather than centralising data), differential privacy, and synthetic data generation. Privacy-enhancing technologies are increasingly essential for GDPR-compliant AI.'],
        ['The EU AI Act Interface', 'The EU AI Act, which entered into force in August 2024, creates a risk-based regulatory framework for AI systems. High-risk AI systems — including those used in employment, credit scoring, and law enforcement — face stringent requirements around transparency, human oversight, and accuracy. These requirements work alongside, not instead of, GDPR obligations.'],
        ['AI DPIAs and Algorithmic Audits', 'Deploying AI systems that process personal data at scale will almost always trigger the DPIA requirement. AI DPIAs must assess risks of discrimination, opaque decision-making, and scale of impact. Many organizations are also conducting voluntary algorithmic audits to demonstrate accountability and identify bias.'],
      ],
      'AI compliance is one of the most rapidly evolving areas of data protection. Organizations developing or deploying AI systems should involve their DPOs from the earliest stages of AI development, conduct AI-specific DPIAs, and monitor regulatory guidance from the European Data Protection Board and national supervisory authorities. Our AI compliance practice can help you navigate these challenges.'
    ),
    metadesc: 'How GDPR applies to AI systems: automated decision-making rules, AI training data requirements, EU AI Act intersection, and compliance best practices.',
    metakeyw: 'AI GDPR compliance, artificial intelligence data protection, EU AI Act, automated decision-making GDPR',
    recimg: 'https://picsum.photos/seed/ai-gdpr/800/450',
    imgalt: 'AI and GDPR Compliance',
    author: 'Vikram Nair',
    category: 'AI Compliance',
    tags: ['Artificial Intelligence', 'GDPR', 'EU AI Act', 'Machine Learning', 'Privacy'],
    read_time: 9,
    status: true,
    is_featured: false,
    recdate: new Date('2024-04-08'),
  },
  {
    rectitle: 'Third-Party Risk Management Under GDPR: A Complete Framework',
    slug: 'third-party-risk-management-gdpr-framework',
    summary: 'Your GDPR liability does not stop at your own systems. Third-party processors create significant risk. Here\'s how to build a robust vendor risk management programme.',
    recdesc: blogHtml(
      'GDPR makes data controllers legally responsible for the compliance of their data processors. High-profile breaches caused by third-party vendors — from payment processors to marketing platforms — have resulted in regulatory action against the organizations that engaged them. A robust third-party risk management programme is not optional; it is a core GDPR obligation.',
      [
        ['Understanding Controller-Processor Relationships', 'Under GDPR, a data controller determines the purposes and means of processing personal data. A data processor processes personal data on behalf of a controller. Controllers are responsible for ensuring their processors provide sufficient guarantees of GDPR compliance. Before engaging any third party that processes personal data, you must assess their compliance posture.'],
        ['Data Processing Agreements', 'Article 28 of GDPR requires a binding contract (Data Processing Agreement or DPA) between controllers and processors. The DPA must include specific provisions covering: the subject matter and duration of processing, the nature and purpose of the processing, the type of personal data and categories of data subjects, and the obligations and rights of the controller.'],
        ['Pre-Engagement Due Diligence', 'Before engaging a processor, conduct thorough due diligence including: reviewing their privacy policy and security documentation, requesting their data protection certifications (ISO 27001, SOC 2), reviewing their incident response procedures, and assessing their sub-processing practices. Many organizations use standardized questionnaires based on the EDPB guidelines.'],
        ['Ongoing Monitoring', 'Due diligence is not a one-time exercise. Controllers must conduct regular audits of their processors. This includes reviewing security certifications annually, monitoring for breach notifications from vendors, updating DPAs when processing activities change, and reviewing sub-processor notifications.'],
        ['International Data Transfers', 'When processors are located outside the EU/EEA, appropriate transfer mechanisms must be in place. Standard Contractual Clauses (SCCs) issued by the European Commission are the most common mechanism. Since the Schrems II ruling, organizations must also conduct Transfer Impact Assessments before transferring data to third countries.'],
      ],
      'Building a comprehensive third-party risk management programme requires dedicated resources, clear accountability, and systematic processes. Organizations with many vendors often benefit from specialized GRC (Governance, Risk, and Compliance) tools. Our third-party assessment service provides a structured approach to evaluating and managing vendor risk.'
    ),
    metadesc: 'GDPR third-party risk management framework. Learn about Data Processing Agreements, vendor due diligence, ongoing monitoring, and international transfer requirements.',
    metakeyw: 'GDPR third party risk, data processing agreement, vendor compliance, GDPR Article 28',
    recimg: 'https://picsum.photos/seed/third-party/800/450',
    imgalt: 'Third Party Risk Management GDPR',
    author: 'Priya Mehta',
    category: 'Third-Party Risk',
    tags: ['Third Party Risk', 'Data Processors', 'GDPR Article 28', 'Vendor Management', 'DPA'],
    read_time: 8,
    status: true,
    is_featured: false,
    recdate: new Date('2024-04-22'),
  },
  {
    rectitle: 'Employee Data Protection: The Essential HR Compliance Guide',
    slug: 'employee-data-protection-hr-compliance-guide',
    summary: 'HR departments process sensitive employee data daily. This guide covers GDPR obligations for employee data including recruitment, employment, and termination.',
    recdesc: blogHtml(
      'Human Resources functions process some of the most sensitive personal data in any organization — from health information and financial details to performance reviews and disciplinary records. Yet HR data protection is often overlooked in GDPR compliance programmes. With fines increasingly being imposed for HR data failures, organizations can no longer afford this gap.',
      [
        ['Lawful Bases for Employee Data Processing', 'Unlike customer data where consent is commonly used, employee data processing primarily relies on contract (processing necessary for the employment contract), legal obligation (payroll, tax, health and safety), and legitimate interests. Consent is rarely appropriate for employee data because the power imbalance between employer and employee means consent is unlikely to be freely given.'],
        ['Recruitment and Pre-Employment Screening', 'Data collected during recruitment must be limited to what is necessary and retained only as long as needed. Background checks and pre-employment screening must comply with local laws and GDPR. Criminal record checks are only permissible in specific circumstances. Unsuccessful candidates\' data should be deleted within a defined period (typically 6-12 months).'],
        ['Special Category Data in HR', 'HR routinely processes special category data including health information (sick leave, disability accommodations), trade union membership, and biometric data (for access control). This data requires an additional condition for processing under GDPR Article 9, most commonly substantial public interest or employment law necessity.'],
        ['Monitoring in the Workplace', 'Employee monitoring — whether email monitoring, CCTV, GPS tracking, or IT system monitoring — requires a lawful basis, is usually justified by legitimate interests, and must be proportionate. Employees must be clearly informed about monitoring. Covert monitoring is only permissible in very limited circumstances, such as investigating suspected criminal activity.'],
        ['Data Retention for HR Records', 'Establish and enforce clear retention schedules for HR records. Employment contracts and personal files are typically retained for 6-7 years after employment ends. Payroll records may need to be kept for tax compliance purposes. Performance management documents, disciplinary records, and recruitment materials all have different retention requirements.'],
      ],
      'HR data protection requires close collaboration between HR, legal, and data protection teams. HR staff should receive specific GDPR training covering their unique processing activities. Privacy notices for employees must be comprehensive and written in plain English. Regular HR data audits will help ensure ongoing compliance and identify areas for improvement.'
    ),
    metadesc: 'GDPR HR compliance guide covering employee data protection, recruitment screening, special category data, workplace monitoring, and retention requirements.',
    metakeyw: 'GDPR employee data, HR data protection, employment data GDPR, workplace privacy',
    recimg: 'https://picsum.photos/seed/hr-data/800/450',
    imgalt: 'Employee Data Protection HR Compliance',
    author: 'Sarah Johnson',
    category: 'HR Compliance',
    tags: ['HR Data', 'Employee Privacy', 'GDPR', 'Workplace Privacy', 'Recruitment'],
    read_time: 8,
    status: true,
    is_featured: false,
    recdate: new Date('2024-05-14'),
  },
  {
    rectitle: 'Cloud Computing and GDPR: Key Compliance Considerations',
    slug: 'cloud-computing-gdpr-compliance-considerations',
    summary: 'Moving to the cloud raises significant GDPR questions. From processor agreements to data residency requirements, this guide covers everything you need to know.',
    recdesc: blogHtml(
      'Cloud services have become the backbone of modern business IT infrastructure. AWS, Microsoft Azure, and Google Cloud Platform process enormous amounts of personal data on behalf of their enterprise customers. While cloud providers offer significant security and compliance capabilities, GDPR compliance ultimately remains the responsibility of the data controller — your organization.',
      [
        ['Cloud Providers as Data Processors', 'In most cloud deployments, the cloud provider acts as a data processor and your organization as the data controller. You must have a valid Data Processing Agreement in place with your cloud provider. Major providers (AWS, Azure, GCP) offer standard DPAs, but you should review these carefully to ensure they meet GDPR requirements.'],
        ['Data Residency and International Transfers', 'GDPR imposes restrictions on transferring personal data to countries outside the EU/EEA that do not provide adequate data protection. Many cloud providers offer EU data residency options. When data may be accessed from outside the EU (e.g., for support), Standard Contractual Clauses must be in place and a Transfer Impact Assessment conducted.'],
        ['Shared Responsibility Model', 'Cloud security operates on a shared responsibility model. The cloud provider is responsible for the security of the cloud infrastructure. You are responsible for security in the cloud — including access controls, encryption, application security, and data classification. GDPR holds you responsible for both sets of risks.'],
        ['Multi-Cloud and Data Visibility', 'Many organizations use multiple cloud providers and SaaS applications, creating significant data visibility challenges. You cannot protect or manage data you cannot see. Implementing a cloud access security broker (CASB) or similar visibility tool is essential for understanding where personal data resides across your cloud estate.'],
        ['Cloud-Native Compliance Tools', 'Major cloud providers offer compliance and privacy tools including data classification, access logging, key management, and DLP capabilities. AWS Macie, Azure Purview, and Google Cloud\'s DLP API can help identify and protect personal data in cloud storage. These tools are valuable components of a GDPR cloud compliance programme.'],
      ],
      'Cloud GDPR compliance is achievable, but requires deliberate effort. Start with a cloud data mapping exercise to understand where personal data is stored and processed. Ensure appropriate DPAs are in place with all cloud providers and SaaS vendors. Implement technical controls for data protection, access management, and audit logging. Review your cloud compliance posture at least annually.'
    ),
    metadesc: 'GDPR and cloud computing: processor agreements, data residency, international transfers, shared responsibility model, and compliance tools for AWS, Azure, and GCP.',
    metakeyw: 'GDPR cloud computing, cloud data protection, AWS GDPR, Azure data protection, Google Cloud GDPR',
    recimg: 'https://picsum.photos/seed/cloud-gdpr/800/450',
    imgalt: 'Cloud Computing GDPR Compliance',
    author: 'Aditya Patel',
    category: 'Cloud Compliance',
    tags: ['Cloud Computing', 'AWS', 'Azure', 'GDPR', 'Data Transfer', 'Cloud Security'],
    read_time: 10,
    status: true,
    is_featured: false,
    recdate: new Date('2024-06-03'),
  },
  {
    rectitle: 'GDPR Enforcement 2024: Top Fines, Trends, and Lessons Learned',
    slug: 'gdpr-enforcement-fines-trends-2024-lessons',
    summary: 'Over €4 billion in GDPR fines have been imposed since 2018. Analysing enforcement trends reveals what regulators prioritise and how to avoid becoming a case study.',
    recdesc: blogHtml(
      'GDPR enforcement has accelerated dramatically since 2020. Supervisory authorities across Europe are increasingly confident in using their full range of powers, including maximum fines, corrective orders, and public reprimands. Understanding enforcement trends is essential for any organization seeking to allocate its compliance resources effectively.',
      [
        ['The Biggest GDPR Fines to Date', 'Meta received a record €1.2 billion fine from the Irish DPC in 2023 for international data transfers. Amazon was fined €746 million by the Luxembourg CNPD for cookie consent failures. WhatsApp received €225 million for transparency failures. Google has been fined repeatedly across multiple EU jurisdictions for cookie and consent issues. These cases illustrate that no organization is too large for enforcement.'],
        ['Top Enforcement Priorities', 'Analysis of enforcement actions reveals consistent priorities: unlawful international data transfers (particularly to the US), inadequate cookie consent, failure to respond to data subject access requests within the statutory timeframe, inadequate security measures leading to data breaches, and inadequate transparency in privacy notices.'],
        ['The Role of Complaints', 'A significant proportion of enforcement actions begin with individual complaints. Privacy advocacy organisations like noyb (the European Center for Digital Rights) file systematic complaints on behalf of individuals across multiple jurisdictions simultaneously. Organizations with inadequate consent mechanisms or opaque privacy practices are particularly vulnerable to complaint-driven investigations.'],
        ['Factors in Penalty Calculation', 'Supervisory authorities consider numerous factors when setting fines: the nature, gravity, and duration of the infringement; intentional or negligent character; cooperation with the authority; categories of data affected; how the infringement became known to the authority; and previous infringements. Demonstrating accountability, cooperating with investigations, and self-reporting can significantly reduce penalties.'],
        ['Cross-Border Enforcement', 'The one-stop-shop mechanism means that organizations with a main establishment in one EU member state are primarily regulated by that state\'s DPA. However, consistency mechanisms and joint investigations mean that significant cases involve multiple DPAs. Organizations should understand which DPA has jurisdiction over their operations.'],
      ],
      'GDPR enforcement shows no signs of slowing. Regulators are becoming more sophisticated, more coordinated, and increasingly willing to use maximum penalties. The most effective defence against enforcement is genuine accountability: strong governance, documented processes, regular audits, and a culture of privacy by design. Our compliance programmes are designed to give you that accountability.'
    ),
    metadesc: 'Analysis of GDPR fines and enforcement trends in 2024. Key lessons from major penalties against Meta, Amazon, Google, and WhatsApp.',
    metakeyw: 'GDPR fines 2024, GDPR enforcement, ICO penalties, GDPR violations, data protection fines',
    recimg: 'https://picsum.photos/seed/gdpr-fines/800/450',
    imgalt: 'GDPR Enforcement and Fines 2024',
    author: 'Vikram Nair',
    category: 'Enforcement',
    tags: ['GDPR Fines', 'Enforcement', 'ICO', 'DPA Penalties', 'Compliance'],
    read_time: 8,
    status: true,
    is_featured: false,
    recdate: new Date('2024-06-18'),
  },
  {
    rectitle: 'Building a Privacy-First Culture: Moving Beyond Checkbox Compliance',
    slug: 'building-privacy-first-culture-beyond-checkbox-compliance',
    summary: 'Sustainable GDPR compliance requires cultural change, not just policy documents. This article explores how to embed privacy across your organisation.',
    recdesc: blogHtml(
      'The most common failure mode in GDPR compliance is treating it as a legal exercise rather than a fundamental change in how an organization thinks about and uses data. Organizations with policy documents, checklists, and annual training but no genuine commitment to privacy inevitably find themselves responding to breaches, complaints, and regulatory investigations rather than preventing them.',
      [
        ['What Privacy Culture Actually Means', 'A privacy-first culture means that privacy considerations are raised and addressed before, not after, decisions are made about data use. It means employees at all levels understand their role in protecting personal data. It means leadership actively champions privacy rather than viewing compliance as a cost centre. And it means privacy is a genuine value, not a legal requirement to be minimised.'],
        ['Leadership and Governance', 'Cultural change starts at the top. The DPO must have direct access to senior management and the board. Privacy should be a standing agenda item at board meetings. Executive sponsorship of privacy initiatives signals to the organization that privacy is a priority. Consider establishing a privacy steering committee with representation from legal, IT, marketing, HR, and operations.'],
        ['Privacy by Design in Practice', 'Privacy by Design, embedded in GDPR\'s accountability principle, means building privacy protections into systems and processes from the outset rather than bolting them on afterwards. In practice, this means involving the DPO in product development and IT projects from day one, conducting DPIAs for new processing activities, and making privacy controls the default, not an option.'],
        ['Meaningful Privacy Training', 'Annual GDPR training videos that employees click through are not a privacy culture. Effective training is role-specific (marketing teams need different training from HR or IT), scenario-based rather than theoretical, reinforced regularly throughout the year, and tested through phishing simulations and privacy awareness campaigns.'],
        ['Measuring Privacy Culture', 'You cannot improve what you cannot measure. Assess your privacy culture through: employee privacy awareness surveys, training completion and test scores, number of privacy incidents reported (higher is often better — it indicates a speak-up culture), DPO engagement requests from business teams, and time to resolve data subject requests.'],
      ],
      'Building a privacy-first culture is a multi-year journey that requires sustained commitment from leadership, dedicated resources, and ongoing effort. Organizations that achieve genuine privacy cultures find that compliance becomes easier, trust with customers deepens, and privacy becomes a competitive advantage rather than a burden. Let us help you start that journey.'
    ),
    metadesc: 'How to build a genuine privacy-first culture in your organization. Moving beyond checkbox compliance to embed privacy by design across all functions.',
    metakeyw: 'privacy culture, GDPR culture, privacy by design, data governance, compliance culture',
    recimg: 'https://picsum.photos/seed/privacy-culture/800/450',
    imgalt: 'Privacy First Culture Organisation',
    author: 'Rahul Sharma',
    category: 'Privacy Culture',
    tags: ['Privacy Culture', 'Data Governance', 'GDPR', 'Privacy by Design', 'Compliance'],
    read_time: 7,
    status: true,
    is_featured: false,
    recdate: new Date('2024-07-02'),
  },
];

const TEAMS = [
  {
    name: 'Rahul Sharma',
    designation: 'Chief Data Protection Officer',
    image: 'https://i.pravatar.cc/400?img=12',
    bio: 'Rahul is a Certified Information Privacy Professional (CIPP/E) with over 15 years of experience advising multinational corporations on GDPR and data protection compliance. He previously served as Group DPO for a FTSE 100 financial services company and has represented clients before the ICO, CNIL, and BfDI. Rahul leads our GDPR practice and oversees all DPO-as-a-Service engagements.',
    social_links: {
      linkedin: 'https://linkedin.com/in/rahul-sharma-dpo',
      twitter: 'https://twitter.com/rahulsharma_dpo',
      email: 'rahul.sharma@gdprconsultants.in',
    },
    expertise: ['GDPR Compliance', 'DPO Services', 'Regulatory Investigations', 'Privacy Governance'],
    order: 1,
    is_active: true,
  },
  {
    name: 'Priya Mehta',
    designation: 'Senior GDPR Consultant',
    image: 'https://i.pravatar.cc/400?img=5',
    bio: 'Priya is a CIPP/E and CIPM certified privacy professional with a decade of experience in data protection consulting across financial services, healthcare, and technology sectors. She specializes in building privacy management programmes, conducting DPIAs, and developing comprehensive data governance frameworks for complex organizations.',
    social_links: {
      linkedin: 'https://linkedin.com/in/priya-mehta-privacy',
      twitter: '',
      email: 'priya.mehta@gdprconsultants.in',
    },
    expertise: ['Privacy Programme Management', 'DPIA', 'Data Governance', 'Third-Party Risk'],
    order: 2,
    is_active: true,
  },
  {
    name: 'Vikram Nair',
    designation: 'Privacy Lawyer & Legal Advisor',
    image: 'https://i.pravatar.cc/400?img=52',
    bio: 'Vikram is a qualified barrister with 12 years of specialised experience in data protection and privacy law. He advises on regulatory enforcement, data subject rights litigation, and cross-border data transfer arrangements. Vikram has successfully represented clients in proceedings before multiple EU supervisory authorities and has contributed to European Data Protection Board guidelines.',
    social_links: {
      linkedin: 'https://linkedin.com/in/vikram-nair-privacy-law',
      twitter: '',
      email: 'vikram.nair@gdprconsultants.in',
    },
    expertise: ['Privacy Law', 'Regulatory Defence', 'Cross-Border Transfers', 'Data Subject Rights'],
    order: 3,
    is_active: true,
  },
  {
    name: 'Ananya Singh',
    designation: 'Cybersecurity & Compliance Expert',
    image: 'https://i.pravatar.cc/400?img=9',
    bio: 'Ananya holds CISSP and CISM certifications and brings 8 years of experience bridging the gap between cybersecurity and data protection compliance. She specializes in technical security controls for GDPR compliance, breach response, and security by design. Ananya leads our technical audit and penetration testing practice.',
    social_links: {
      linkedin: 'https://linkedin.com/in/ananya-singh-security',
      twitter: 'https://twitter.com/ananya_ciso',
      email: 'ananya.singh@gdprconsultants.in',
    },
    expertise: ['Cybersecurity', 'Data Breach Response', 'Security Audits', 'Technical Compliance'],
    order: 4,
    is_active: true,
  },
  {
    name: 'Rajesh Kumar',
    designation: 'DPDP Act Specialist',
    image: 'https://i.pravatar.cc/400?img=65',
    bio: 'Rajesh is one of India\'s foremost experts on the Digital Personal Data Protection Act 2023. With 9 years of experience in Indian data governance and having participated in consultations on the DPDP Bill, he provides authoritative guidance to Indian organizations navigating the new regulatory landscape. He is a frequent speaker at industry conferences and contributes regularly to academic journals.',
    social_links: {
      linkedin: 'https://linkedin.com/in/rajesh-kumar-dpdp',
      twitter: 'https://twitter.com/rajesh_dpdp',
      email: 'rajesh.kumar@gdprconsultants.in',
    },
    expertise: ['DPDP Act 2023', 'Indian Privacy Law', 'Digital Governance', 'Regulatory Strategy'],
    order: 5,
    is_active: true,
  },
  {
    name: 'Sarah Johnson',
    designation: 'International Privacy Advisor',
    image: 'https://i.pravatar.cc/400?img=47',
    bio: 'Sarah has 14 years of experience in international privacy law, having worked across the US, EU, and APAC regions. She advises multinational organizations on harmonising their privacy programmes across jurisdictions including GDPR, CCPA, PDPA, and PIPEDA. Sarah leads our international privacy advisory practice and manages our network of local counsel across 30 countries.',
    social_links: {
      linkedin: 'https://linkedin.com/in/sarah-johnson-privacy',
      twitter: '',
      email: 'sarah.johnson@gdprconsultants.in',
    },
    expertise: ['International Privacy', 'CCPA', 'Cross-Border Compliance', 'Privacy Harmonisation'],
    order: 6,
    is_active: true,
  },
  {
    name: 'Aditya Patel',
    designation: 'Data Governance & Analytics Lead',
    image: 'https://i.pravatar.cc/400?img=57',
    bio: 'Aditya specializes in data governance frameworks and privacy-compliant analytics for data-driven organizations. With 6 years of experience across technology and retail sectors, he helps organizations build data catalogues, implement privacy-enhancing technologies, and design compliant data architectures. He is a certified OneTrust Fellow and leads our technology compliance practice.',
    social_links: {
      linkedin: 'https://linkedin.com/in/aditya-patel-data',
      twitter: '',
      email: 'aditya.patel@gdprconsultants.in',
    },
    expertise: ['Data Governance', 'Privacy Tech', 'Analytics Compliance', 'Data Architecture'],
    order: 7,
    is_active: true,
  },
];

const LOGOS = [
  { company_name: 'TechNova Solutions', logo: 'https://ui-avatars.com/api/?name=TechNova&size=120&background=1e3a5f&color=ffffff&bold=true&format=png', website: 'https://example.com', order: 1, is_active: true },
  { company_name: 'GlobalFinance Corp', logo: 'https://ui-avatars.com/api/?name=GFC&size=120&background=0f172a&color=60a5fa&bold=true&format=png', website: 'https://example.com', order: 2, is_active: true },
  { company_name: 'SecureHealth Systems', logo: 'https://ui-avatars.com/api/?name=SHS&size=120&background=064e3b&color=6ee7b7&bold=true&format=png', website: 'https://example.com', order: 3, is_active: true },
  { company_name: 'DataStream Analytics', logo: 'https://ui-avatars.com/api/?name=DSA&size=120&background=1e1b4b&color=a5b4fc&bold=true&format=png', website: 'https://example.com', order: 4, is_active: true },
  { company_name: 'CloudNine Technologies', logo: 'https://ui-avatars.com/api/?name=CN9&size=120&background=0c4a6e&color=7dd3fc&bold=true&format=png', website: 'https://example.com', order: 5, is_active: true },
  { company_name: 'InfoSafe Enterprises', logo: 'https://ui-avatars.com/api/?name=ISE&size=120&background=1e3a5f&color=93c5fd&bold=true&format=png', website: 'https://example.com', order: 6, is_active: true },
  { company_name: 'PrivacyGuard Ltd', logo: 'https://ui-avatars.com/api/?name=PGL&size=120&background=312e81&color=c7d2fe&bold=true&format=png', website: 'https://example.com', order: 7, is_active: true },
  { company_name: 'NexusRetail Group', logo: 'https://ui-avatars.com/api/?name=NRG&size=120&background=7c2d12&color=fed7aa&bold=true&format=png', website: 'https://example.com', order: 8, is_active: true },
  { company_name: 'BankSecure Financial', logo: 'https://ui-avatars.com/api/?name=BSF&size=120&background=1e3a5f&color=bfdbfe&bold=true&format=png', website: 'https://example.com', order: 9, is_active: true },
  { company_name: 'MediCare Solutions', logo: 'https://ui-avatars.com/api/?name=MCS&size=120&background=134e4a&color=99f6e4&bold=true&format=png', website: 'https://example.com', order: 10, is_active: true },
  { company_name: 'EduTech Platform', logo: 'https://ui-avatars.com/api/?name=ETP&size=120&background=3b0764&color=e9d5ff&bold=true&format=png', website: 'https://example.com', order: 11, is_active: true },
  { company_name: 'LogiTrans Freight', logo: 'https://ui-avatars.com/api/?name=LTF&size=120&background=1c1917&color=d6d3d1&bold=true&format=png', website: 'https://example.com', order: 12, is_active: true },
  { company_name: 'SmartCity Infrastructure', logo: 'https://ui-avatars.com/api/?name=SCI&size=120&background=0369a1&color=bae6fd&bold=true&format=png', website: 'https://example.com', order: 13, is_active: true },
  { company_name: 'LegalTech Partners', logo: 'https://ui-avatars.com/api/?name=LTP&size=120&background=365314&color=bef264&bold=true&format=png', website: 'https://example.com', order: 14, is_active: true },
  { company_name: 'InnovateMfg Corp', logo: 'https://ui-avatars.com/api/?name=IMC&size=120&background=1e3a5f&color=e2e8f0&bold=true&format=png', website: 'https://example.com', order: 15, is_active: true },
  { company_name: 'GreenEnergy Solutions', logo: 'https://ui-avatars.com/api/?name=GES&size=120&background=14532d&color=86efac&bold=true&format=png', website: 'https://example.com', order: 16, is_active: true },
  { company_name: 'TravelSafe Networks', logo: 'https://ui-avatars.com/api/?name=TSN&size=120&background=0c4a6e&color=38bdf8&bold=true&format=png', website: 'https://example.com', order: 17, is_active: true },
  { company_name: 'AeroSpace Digital', logo: 'https://ui-avatars.com/api/?name=ASD&size=120&background=0f172a&color=94a3b8&bold=true&format=png', website: 'https://example.com', order: 18, is_active: true },
];

// ─── Main ──────────────────────────────────────────────────────────────────
async function main() {
  console.log('🔗  Connecting to MongoDB...');
  await mongoose.connect(MONGODB_URI);
  console.log('✅  Connected\n');

  const BlogPost = mongoose.models.BlogPost || mongoose.model('BlogPost', BlogSchema);
  const Team = mongoose.models.Team || mongoose.model('Team', TeamSchema);
  const ClientLogo = mongoose.models.ClientLogo || mongoose.model('ClientLogo', LogoSchema);

  // ── Blogs ─────────────────────────────────────────────────────────────────
  let blogsAdded = 0, blogsSkipped = 0;
  for (const blog of BLOGS) {
    const exists = await BlogPost.findOne({ slug: blog.slug });
    if (exists) { blogsSkipped++; continue; }
    await BlogPost.create(blog);
    blogsAdded++;
    process.stdout.write(`  📝  ${blog.rectitle.slice(0, 60)}...\n`);
  }
  console.log(`\n📚  Blogs: ${blogsAdded} added, ${blogsSkipped} already existed`);

  // ── Team ──────────────────────────────────────────────────────────────────
  let teamsAdded = 0, teamsSkipped = 0;
  for (const member of TEAMS) {
    const exists = await Team.findOne({ name: member.name });
    if (exists) { teamsSkipped++; continue; }
    await Team.create(member);
    teamsAdded++;
    process.stdout.write(`  👤  ${member.name} — ${member.designation}\n`);
  }
  console.log(`\n👥  Team: ${teamsAdded} added, ${teamsSkipped} already existed`);

  // ── Client Logos ──────────────────────────────────────────────────────────
  let logosAdded = 0, logosSkipped = 0;
  for (const logo of LOGOS) {
    const exists = await ClientLogo.findOne({ company_name: logo.company_name });
    if (exists) { logosSkipped++; continue; }
    await ClientLogo.create(logo);
    logosAdded++;
    process.stdout.write(`  🏢  ${logo.company_name}\n`);
  }
  console.log(`\n🏷️   Client Logos: ${logosAdded} added, ${logosSkipped} already existed`);

  await mongoose.disconnect();
  console.log('\n✅  Seed complete!');
}

main().catch(err => {
  console.error('\n❌ ', err.message || err);
  process.exit(1);
});
