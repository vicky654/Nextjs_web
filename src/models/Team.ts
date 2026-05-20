import mongoose, { Schema, Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  designation: string;
  image: string;
  bio: string;
  social_links: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
  expertise: string[];
  order: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

const TeamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true, trim: true },
    designation: { type: String, required: true, trim: true },
    image: { type: String, default: '' },
    bio: { type: String, default: '' },
    social_links: {
      linkedin: { type: String, default: '' },
      twitter: { type: String, default: '' },
      email: { type: String, default: '' },
    },
    expertise: [{ type: String }],
    order: { type: Number, default: 0 },
    is_active: { type: Boolean, default: true },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export default mongoose.models.Team || mongoose.model<ITeam>('Team', TeamSchema);
