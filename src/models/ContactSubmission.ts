import mongoose, { Schema, type Document, type Model } from 'mongoose';

export interface IContactSubmission extends Document {
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  submitted_at: Date;
}

const ContactSubmissionSchema = new Schema<IContactSubmission>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: null },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    submitted_at: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

const ContactSubmission: Model<IContactSubmission> =
  mongoose.models.ContactSubmission ??
  mongoose.model<IContactSubmission>('ContactSubmission', ContactSubmissionSchema);

export default ContactSubmission;
