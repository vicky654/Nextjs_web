import connectDB from './mongodb';
import ClientLogo from '@/models/ClientLogo';

export interface LogoItem {
  id: string;
  company_name: string;
  logo: string;
  website: string;
  order: number;
}

export async function getActiveClientLogos(): Promise<LogoItem[]> {
  try {
    await connectDB();
    const docs = await ClientLogo.find({ is_active: true }).sort({ order: 1 }).lean();
    return docs.map((d) => ({
      id: (d._id as { toString(): string }).toString(),
      company_name: d.company_name ?? '',
      logo: d.logo ?? '',
      website: d.website ?? '',
      order: d.order ?? 0,
    }));
  } catch {
    return [];
  }
}
