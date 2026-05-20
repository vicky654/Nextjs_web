import mongoose, { Schema, Document } from 'mongoose';

export interface IClientLogo extends Document {
  company_name: string;
  logo: string;
  website: string;
  order: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

const ClientLogoSchema = new Schema<IClientLogo>(
  {
    company_name: { type: String, required: true, trim: true },
    logo: { type: String, default: '' },
    website: { type: String, default: '' },
    order: { type: Number, default: 0 },
    is_active: { type: Boolean, default: true },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export default mongoose.models.ClientLogo || mongoose.model<IClientLogo>('ClientLogo', ClientLogoSchema);
