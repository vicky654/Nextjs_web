"use client";

/**
 * BlogCard Component
 * Card component for displaying blog post information
 */

import Link from "next/link";
import { BlogPost } from "@/types";
import { formatDate } from "@/lib/utils";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <div className="blog-card">
      <div className="blog-image">
        <div className="blog-image-placeholder">
          <i className="bi bi-file-earmark-text"></i>
        </div>
        <span className="blog-category">{post.category}</span>
      </div>
      <div className="blog-content">
        <div className="blog-meta">
          <span className="blog-date">
            <i className="bi bi-calendar3"></i>
            {formatDate(post.publishedAt)}
          </span>
          <span className="blog-read-time">
            <i className="bi bi-clock"></i>
            {post.readTime} min read
          </span>
        </div>
        <h3 className="blog-title">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="blog-excerpt">{post.excerpt}</p>
        <div className="blog-footer">
          <div className="blog-author">
            <div className="author-avatar">
              <span>{post.author.charAt(0)}</span>
            </div>
            <span className="author-name">{post.author}</span>
          </div>
          <Link href={`/blog/${post.slug}`} className="blog-link">
            Read More <i className="bi bi-arrow-right"></i>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .blog-card {
          background: #fff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .blog-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
        }

        .blog-image {
          position: relative;
          height: 200px;
          background: linear-gradient(135deg, #1e3a5f 0%, #00a8cc 100%);
        }

        .blog-image-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .blog-image-placeholder i {
          font-size: 4rem;
          color: rgba(255, 255, 255, 0.3);
        }

        .blog-category {
          position: absolute;
          top: 15px;
          left: 15px;
          background: #00a8cc;
          color: #fff;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .blog-content {
          padding: 24px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .blog-meta {
          display: flex;
          gap: 16px;
          margin-bottom: 12px;
          font-size: 0.85rem;
          color: #6c757d;
        }

        .blog-meta span {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .blog-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: #1e3a5f;
          margin-bottom: 12px;
          line-height: 1.4;
        }

        .blog-title a {
          color: inherit;
          transition: color 0.3s ease;
        }

        .blog-title a:hover {
          color: #00a8cc;
        }

        .blog-excerpt {
          color: #6c757d;
          line-height: 1.7;
          margin-bottom: 20px;
          flex: 1;
        }

        .blog-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 16px;
          border-top: 1px solid #f0f0f0;
        }

        .blog-author {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .author-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, #1e3a5f 0%, #00a8cc 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .author-name {
          font-weight: 500;
          color: #495057;
          font-size: 0.9rem;
        }

        .blog-link {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #00a8cc;
          font-weight: 600;
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }

        .blog-link:hover {
          gap: 10px;
          color: #1e3a5f;
        }
      `}</style>
    </div>
  );
}
