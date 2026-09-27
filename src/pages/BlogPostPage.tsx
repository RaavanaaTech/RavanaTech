import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { BLOG_POSTS } from '../data/blogData';
import { SEO } from '../components/seo/SEO';
import { JsonLd } from '../components/seo/JsonLd';
import { ArrowLeft, Clock, Calendar, User, MessageSquare, ArrowRight, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from '../lib/config';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-2xl font-bold text-stone-900">Article Not Found</h1>
        <p className="text-stone-600 text-sm">The article you are looking for does not exist or has been relocated.</p>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Articles</span>
        </Link>
      </div>
    );
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedDate,
    author: {
      '@type': 'Person',
      name: post.author,
      jobTitle: SITE_CONFIG.founderTitle,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.brandName,
      url: SITE_CONFIG.siteUrl,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_CONFIG.siteUrl}/blog/${post.slug}`,
    },
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-20">
      <SEO
        title={post.title}
        description={post.excerpt}
        canonicalPath={`/blog/${post.slug}`}
        type="article"
      />
      <JsonLd data={articleSchema} />

      {/* Breadcrumb Top Strip */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6">
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Guides</span>
        </Link>
      </div>

      {/* Main Article Header */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8">
        <header className="space-y-4 border-b border-stone-200 pb-8">
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
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5" />
              {post.author}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-stone-900 leading-tight">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-medium">
            {post.excerpt}
          </p>
        </header>

        {/* Content Body */}
        <div className="space-y-5 text-sm sm:text-base text-stone-700 leading-relaxed">
          {post.content.map((paragraph, index) => (
            <p key={index} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Service & Contact CTA Box */}
        <div className="mt-12 p-6 sm:p-8 bg-stone-900 text-white rounded-2xl space-y-4">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Practical Implementation</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold">
            Ready to plan a clean website for your business?
          </h3>
          <p className="text-xs sm:text-sm text-stone-300 max-w-lg">
            Let's discuss what your business actually needs without high agency overheads or complicated jargon.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors inline-flex items-center gap-1.5"
            >
              <span>Request a Website Consultation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=Hi%20Shanthapriya,%20I%20read%20your%20article%20"${encodeURIComponent(post.title)}"%20and%20would%20like%20to%20ask%20a%20question.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-xl transition-colors inline-flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Ask on WhatsApp</span>
            </a>
          </div>
        </div>
      </article>
    </div>
  );
};
