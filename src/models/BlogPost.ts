import mongoose, { Schema, type Document, type Model } from 'mongoose';
import type { FAQItem } from '@/types';

export interface IBlogPost extends Document {
  status: boolean;
  recdate: Date;
  recpub: string | null;
  rectitle: string;
  recdesc: string;
  summary: string | null;
  metadesc: string | null;
  metakeyw: string | null;
  recimg: string | null;
  imgalt: string | null;
  recfile: string | null;
  slug: string;
  author: string;
  author_image: string | null;
  category: string;
  tags: string[];
  read_time: number | null;
  faq_schema: FAQItem[] | null;
  updated_at: Date | null;
  is_featured: boolean;
  is_archived: boolean;
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    status: { type: Boolean, default: false, index: true },
    recdate: { type: Date, default: Date.now, index: true },
    recpub: { type: String, default: null },
    rectitle: { type: String, required: true },
    recdesc: { type: String, default: '' },
    summary: { type: String, default: null },
    metadesc: { type: String, default: null },
    metakeyw: { type: String, default: null },
    recimg: { type: String, default: null },
    imgalt: { type: String, default: null },
    recfile: { type: String, default: null },
    slug: { type: String, unique: true, sparse: true },
    author: { type: String, default: 'GDPR Consultants' },
    author_image: { type: String, default: null },
    category: { type: String, default: 'GDPR', index: true },
    tags: { type: [String], default: [] },
    read_time: { type: Number, default: null },
    faq_schema: { type: Schema.Types.Mixed, default: null },
    updated_at: { type: Date, default: null },
    is_featured: { type: Boolean, default: false },
    is_archived: { type: Boolean, default: false, index: true },
  },
  { timestamps: false }
);

const BlogPost: Model<IBlogPost> =
  mongoose.models.BlogPost ?? mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);

export default BlogPost;
