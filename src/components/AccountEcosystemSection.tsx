import React, { useState } from 'react';
import {
  ExternalLink,
  CheckCircle2,
  Clock,
  Sparkles,
  Copy,
  Check,
  Globe,
  Share2,
  HelpCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { ACCOUNT_ECOSYSTEM, AccountPlatform } from '../lib/config';

export const AccountEcosystemSection: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'core' | 'portfolio' | 'marketplace'>('all');
  const [showGuide, setShowGuide] = useState<boolean>(false);
  const [expandedSpecsId, setExpandedSpecsId] = useState<string | null>(null);

  const platforms = Object.values(ACCOUNT_ECOSYSTEM);

  const filteredPlatforms = selectedCategory === 'all'
    ? platforms
    : platforms.filter((p) => p.category === selectedCategory);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getCategoryBadge = (category: AccountPlatform['category']) => {
    switch (category) {
      case 'core':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
            🔴 Core Leads
          </span>
        );
      case 'portfolio':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
            🟡 Search & Portfolio
          </span>
        );
      case 'marketplace':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-50 text-sky-700 border border-sky-200">
            🔵 Freelance Market
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1.5 rounded-lg bg-sky-100 text-sky-700">
              <Share2 className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Official Network
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
            Ravana Tech Digital Account Ecosystem
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl leading-relaxed">
            Connect with Ravana Tech across official social networks, local search, creative portfolios, and global freelance marketplaces.
          </p>
        </div>

        {/* Quick Instructions Toggle */}
        <button
          onClick={() => setShowGuide(!showGuide)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 bg-stone-50 hover:bg-stone-100 border border-stone-200 px-3.5 py-2 rounded-xl transition-colors cursor-pointer self-start sm:self-auto shrink-0"
        >
          <HelpCircle className="w-3.5 h-3.5 text-stone-500" />
          <span>{showGuide ? 'Hide Setup Guide' : 'How to update links?'}</span>
          {showGuide ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Expandable Setup Instructions for Shanthapriya */}
      {showGuide && (
        <div className="p-4 sm:p-5 rounded-2xl bg-sky-50/70 border border-sky-200/80 text-xs text-sky-950 space-y-2">
          <div className="flex items-center gap-2 font-bold text-sky-900 text-sm">
            <Sparkles className="w-4 h-4 text-sky-600" />
            <span>අලුත් Accounts හදන විට Links Update කරගන්නේ මෙහෙමයි:</span>
          </div>
          <p className="leading-relaxed">
            ඔබ එක් එක් Social හෝ Freelance Account එක සාදන විට, එහි Link එක අපේ කේත පද්ධතියේ <strong>src/lib/config.ts</strong> ගොනුව විවෘත කර, <strong>ACCOUNT_ECOSYSTEM</strong> යටතේ ඇති අදාළ platform එකෙහි <code>url</code> එකට Paste කර, <code>status: 'active'</code> කරන්න. එවිට මුළු වෙබ් අඩවියේම සියලුම බොත්තම් ඉබේම යාවත්කාලීන වේ!
          </p>
          <div className="font-mono bg-white/80 p-2.5 rounded-lg border border-sky-200 text-[11px] text-stone-800">
            // File: src/lib/config.ts<br />
            instagram: &#123; url: 'https://instagram.com/ravanatechofficial', status: 'active' &#125;
          </div>
        </div>
      )}

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            selectedCategory === 'all'
              ? 'bg-stone-900 text-white shadow-xs'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          }`}
        >
          All 15 Channels
        </button>
        <button
          onClick={() => setSelectedCategory('core')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            selectedCategory === 'core'
              ? 'bg-rose-700 text-white shadow-xs'
              : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
          }`}
        >
          🔴 Core Discovery & Leads (8)
        </button>
        <button
          onClick={() => setSelectedCategory('portfolio')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            selectedCategory === 'portfolio'
              ? 'bg-amber-800 text-white shadow-xs'
              : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
          }`}
        >
          🟡 Search & Portfolio (5)
        </button>
        <button
          onClick={() => setSelectedCategory('marketplace')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            selectedCategory === 'marketplace'
              ? 'bg-sky-700 text-white shadow-xs'
              : 'bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200'
          }`}
        >
          🔵 Freelance Marketplaces (2)
        </button>
      </div>

      {/* Platforms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPlatforms.map((account) => {
          const isActive = account.status === 'active';
          const isExpanded = expandedSpecsId === account.id;

          return (
            <div
              key={account.id}
              className={`p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
                isActive
                  ? 'bg-white border-stone-200 hover:border-stone-300 hover:shadow-xs'
                  : 'bg-stone-50/70 border-stone-200/80'
              }`}
            >
              <div>
                {/* Header row: Category & Status */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  {getCategoryBadge(account.category)}

                  {isActive ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Active Link
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full border border-stone-200">
                      <Clock className="w-3 h-3 text-stone-400" />
                      Setting Up
                    </span>
                  )}
                </div>

                {/* Account Name & Type */}
                <div className="space-y-0.5">
                  <h4 className="font-bold text-sm text-stone-900 flex items-center justify-between">
                    <span>{account.name}</span>
                    <span className="text-[11px] font-normal text-stone-500">
                      {account.type}
                    </span>
                  </h4>
                  <p className="text-[11px] text-stone-600 leading-normal line-clamp-2">
                    {account.purpose}
                  </p>
                </div>
              </div>

              {/* Action row */}
              <div className="pt-2 border-t border-stone-100 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-stone-500 truncate max-w-[170px]">
                    <Globe className="w-3 h-3 shrink-0" />
                    <span className="truncate font-mono text-[10px]">{account.username}</span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => handleCopy(account.id, account.url)}
                      title="Copy Link"
                      className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
                    >
                      {copiedId === account.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>

                    <a
                      href={account.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors ${
                        isActive
                          ? 'bg-stone-900 hover:bg-stone-800 text-white'
                          : 'bg-stone-200/80 hover:bg-stone-300 text-stone-700'
                      }`}
                    >
                      <span>{isActive ? 'Visit' : 'Preview'}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Optional Design Specs Accordion (Banner / Profile sizes) */}
                {account.recommendedSizes && (
                  <div className="text-[10px] text-stone-500 pt-1">
                    <button
                      onClick={() => setExpandedSpecsId(isExpanded ? null : account.id)}
                      className="text-stone-400 hover:text-stone-700 font-medium inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Design Dimensions</span>
                      {isExpanded ? <ChevronUp className="w-2.5 h-2.5" /> : <ChevronDown className="w-2.5 h-2.5" />}
                    </button>
                    {isExpanded && (
                      <div className="mt-1.5 p-2 bg-stone-100 rounded-lg text-[10px] font-mono space-y-0.5">
                        {account.recommendedSizes.profile && (
                          <div>Profile: {account.recommendedSizes.profile}</div>
                        )}
                        {account.recommendedSizes.cover && (
                          <div>Cover: {account.recommendedSizes.cover}</div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
