import React from 'react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../data/blogData';
import { SEO } from '../components/seo/SEO';
import { ArrowRight, BookOpen, Clock, Calendar, Sparkles } from 'lucide-react';

export const BlogPage: React.FC = () => {
  return (
    <div className="space-y-12 sm:space-y-16 pb-20">
      <SEO
        title="Practical Guides for Sri Lankan Small Businesses"
        description="Actionable advice on website design, WhatsApp ordering, pricing, and digital presence for small business owners in Sri Lanka."
        canonicalPath="/blog"
      />

      {/* Header */}
      <section className="pt-10 sm:pt-14 max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-semibold border border-stone-200">
          <BookOpen className="w-3.5 h-3.5 text-stone-600" />
          <span>Practical Knowledge Base</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900">
          Small Business Web Guides
        </h1>
        <p className="text-sm sm:text-base text-stone-600 max-w-lg mx-auto leading-relaxed">
          No buzzwords. Honest, realistic guidance on how Sri Lankan shops, salons, and services can get practical value from a website.
        </p>
      </section>

      {/* Articles Grid */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="space-y-6">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="p-6 sm:p-7 bg-white rounded-2xl border border-stone-200 hover:border-stone-400 hover:shadow-xs transition-all space-y-3 group"
            >
              <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500">
                <span className="px-2.5 py-0.5 rounded-full font-bold bg-stone-100 text-stone-700">
                  {post.category}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readTime}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {post.publishedDate}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-stone-900 group-hover:text-stone-700 transition-colors">
                <Link to={`/blog/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </h2>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {post.excerpt}
              </p>

              <div className="pt-2">
                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-900 hover:text-emerald-700 transition-colors"
                >
                  <span>Read full guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
