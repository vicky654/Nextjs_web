import type { Metadata } from 'next';
import GdprIssuePage from '@/components/sections/GdprIssuePage';
import { buildPageMeta } from '@/lib/seo';

export const metadata: Metadata = buildPageMeta({
  title: 'GDPR and Crypto World — Blockchain Data Protection',
  description: 'The tension between GDPR requirements and blockchain immutability — how crypto and Web3 businesses manage data subject rights and pseudonymisation.',
  keywords: 'GDPR blockchain, GDPR crypto, GDPR Web3, blockchain data protection, GDPR immutability',
  canonicalPath: '/GDPR-and-crypto-world/',
});

export default function GdprCryptoPage() {
  return (
    <GdprIssuePage
      title="GDPR and Crypto World"
      subtitle="Navigating the fundamental tension between blockchain immutability and GDPR's right to erasure."
      canonicalPath="/GDPR-and-crypto-world/"
      description="Blockchain technology and GDPR create significant legal tensions. The immutability principle that makes blockchains valuable directly conflicts with GDPR's right to erasure (Article 17). Meanwhile, the decentralised nature of many crypto systems complicates controller/processor role assignment."
      points={[
        'Public blockchain addresses may constitute personal data if linkable to an individual',
        'Right to erasure conflicts with blockchain immutability — pseudonymisation is the primary mitigation',
        'Smart contracts storing personal data on-chain require careful GDPR architecture review',
        'Decentralised systems make controller identification complex — EDPB guidance still evolving',
        'KYC/AML data collected by crypto exchanges falls squarely within GDPR as a controller',
        'DeFi protocols may face regulatory examination as the EU MiCA framework matures',
        'Off-chain storage for personal data with on-chain hashes is the recommended architecture',
      ]}
    />
  );
}
