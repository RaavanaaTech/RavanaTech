import React, { useState } from 'react';
import { BLOG_POSTS } from '../../data/blogData';
import { BlogPost } from '../../types';
import { FileText, Eye, Clock, Calendar, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminBlogPage: React.FC = () => {
  const [posts] = useState<BlogPost[]>(BLOG_POSTS);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-emerald-500" />
            <span>Articles & Guides CMS</span>
          </h1>
          <p className="text-xs text-stone-400">
            Published educational guides addressing Sri Lankan small-business website needs.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {posts.map((post) => (
          <div
            key={post.slug}
            className="p-4 sm:p-5 bg-stone-900 border border-stone-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-3 text-xs text-stone-400">
                <span className="px-2 py-0.5 rounded bg-stone-800 text-stone-300 font-semibold">
                  {post.category}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {post.publishedDate}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {post.readTime}
                </span>
              </div>
              <h3 className="font-bold text-base text-white">{post.title}</h3>
              <p className="text-xs text-stone-400 line-clamp-1">{post.excerpt}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Link
                to={`/blog/${post.slug}`}
                className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Live</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
