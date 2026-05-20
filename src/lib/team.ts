import connectDB from './mongodb';
import Team from '@/models/Team';

export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  image: string;
  bio: string;
  social_links: { linkedin?: string; twitter?: string; email?: string };
  expertise: string[];
  order: number;
  is_active: boolean;
}

export async function getActiveTeam(): Promise<TeamMember[]> {
  try {
    await connectDB();
    const docs = await Team.find({ is_active: true })
      .sort({ order: 1, created_at: 1 })
      .lean();
    return docs.map((d) => ({
      id: (d._id as { toString(): string }).toString(),
      name: d.name ?? '',
      designation: d.designation ?? '',
      image: d.image ?? '',
      bio: d.bio ?? '',
      social_links: d.social_links ?? {},
      expertise: Array.isArray(d.expertise) ? d.expertise : [],
      order: d.order ?? 0,
      is_active: d.is_active ?? true,
    }));
  } catch {
    return [];
  }
}
