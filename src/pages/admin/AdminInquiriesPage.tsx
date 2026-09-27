import React, { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { InquiryRecord } from '../../types';
import {
  Inbox,
  Clock,
  Phone,
  Building,
  CheckCircle,
  Archive,
  RefreshCw,
  MessageSquare,
  Search,
  Filter,
  Trash2,
  ExternalLink
} from 'lucide-react';
import { SITE_CONFIG } from '../../lib/config';

export const AdminInquiriesPage: React.FC = () => {
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<'all' | 'new' | 'contacted' | 'closed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryRecord | null>(null);

  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items: InquiryRecord[] = [];
        snapshot.forEach((docSnap) => {
          items.push({
            id: docSnap.id,
            ...(docSnap.data() as any),
          });
        });
        setInquiries(items);
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching inquiries:', err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: 'new' | 'contacted' | 'closed') => {
    try {
      await updateDoc(doc(db, 'inquiries', id), {
        status: newStatus,
        updatedAt: new Date(),
      });
      if (selectedInquiry && selectedInquiry.id === id) {
        setSelectedInquiry({ ...selectedInquiry, status: newStatus });
      }
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this inquiry record?')) return;
    try {
      await deleteDoc(doc(db, 'inquiries', id));
      if (selectedInquiry?.id === id) {
        setSelectedInquiry(null);
      }
    } catch (err) {
      console.error('Failed to delete inquiry', err);
    }
  };

  const filtered = inquiries.filter((item) => {
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    const matchesSearch =
      (item.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.businessName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.phone || '').includes(searchQuery) ||
      (item.need || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Inbox className="w-6 h-6 text-emerald-500" />
            <span>Project Inquiries</span>
          </h1>
          <p className="text-xs text-stone-400">
            Real-time prospective customer submissions captured from website forms and concept customizations.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-stone-500 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Search by client or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 bg-stone-900 border border-stone-800 rounded-lg text-white placeholder-stone-600 focus:outline-none focus:border-stone-700 text-xs w-48 sm:w-60"
            />
          </div>

          <div className="flex rounded-lg border border-stone-800 p-0.5 bg-stone-900">
            {(['all', 'new', 'contacted', 'closed'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-2.5 py-1 rounded capitalize font-medium transition-colors ${
                  filterStatus === status
                    ? 'bg-stone-800 text-white font-semibold'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid View: List & Detail Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Inquiries Table / Cards (8 cols) */}
        <div className="lg:col-span-7 bg-stone-900/80 border border-stone-800 rounded-xl overflow-hidden shadow-md">
          {loading ? (
            <div className="p-12 text-center text-xs text-stone-400 space-y-2">
              <RefreshCw className="w-5 h-5 animate-spin mx-auto text-emerald-500" />
              <p>Loading inquiries from Firestore...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center text-xs text-stone-500 space-y-1">
              <Inbox className="w-8 h-8 mx-auto text-stone-600" />
              <p className="font-semibold text-stone-400">No inquiries found</p>
              <p>Submitted inquiries from your website will appear here in real-time.</p>
            </div>
          ) : (
            <div className="divide-y divide-stone-800">
              {filtered.map((inq) => {
                const isSelected = selectedInquiry?.id === inq.id;
                return (
                  <div
                    key={inq.id}
                    onClick={() => setSelectedInquiry(inq)}
                    className={`p-4 transition-colors cursor-pointer space-y-1.5 ${
                      isSelected
                        ? 'bg-stone-800/90 border-l-4 border-emerald-500'
                        : 'hover:bg-stone-800/40'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-white">{inq.name}</span>
                        <span className="text-xs text-stone-400">• {inq.businessName}</span>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          inq.status === 'new'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : inq.status === 'contacted'
                            ? 'bg-amber-950 text-amber-300 border border-amber-800'
                            : 'bg-stone-800 text-stone-400'
                        }`}
                      >
                        {inq.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-stone-400">
                      <span className="text-emerald-400 font-mono">{inq.phone}</span>
                      <span>{inq.need}</span>
                    </div>

                    {inq.message && (
                      <p className="text-xs text-stone-400 line-clamp-1 italic">
                        "{inq.message}"
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Selected Details Pane (5 cols) */}
        <div className="lg:col-span-5 bg-stone-900 border border-stone-800 rounded-xl p-5 space-y-4 sticky top-6">
          {selectedInquiry ? (
            <div className="space-y-4">
              <div className="flex items-start justify-between border-b border-stone-800 pb-3">
                <div>
                  <h3 className="font-bold text-base text-white">{selectedInquiry.name}</h3>
                  <p className="text-xs text-stone-400">{selectedInquiry.businessName} ({selectedInquiry.businessType})</p>
                </div>
                <button
                  onClick={() => selectedInquiry.id && handleDelete(selectedInquiry.id)}
                  className="text-stone-500 hover:text-rose-400 transition-colors p-1"
                  title="Delete record"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Status Update Strip */}
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block">
                  Update Lead Status
                </span>
                <div className="flex gap-2 text-xs">
                  {(['new', 'contacted', 'closed'] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => selectedInquiry.id && handleUpdateStatus(selectedInquiry.id, s)}
                      className={`flex-1 py-1.5 rounded-lg capitalize font-semibold transition-colors cursor-pointer text-center ${
                        selectedInquiry.status === s
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-stone-800 text-stone-400 hover:bg-stone-700'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Detail fields */}
              <div className="space-y-2.5 text-xs text-stone-300">
                <div>
                  <span className="text-stone-500 block text-[10px] uppercase font-bold">Contact Number</span>
                  <div className="flex items-center gap-2 pt-0.5">
                    <span className="font-mono text-white text-sm font-semibold">{selectedInquiry.phone}</span>
                    <a
                      href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-0.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[11px] font-bold inline-flex items-center gap-1"
                    >
                      <MessageSquare className="w-3 h-3" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>

                <div>
                  <span className="text-stone-500 block text-[10px] uppercase font-bold">Requested Service / Scope</span>
                  <p className="font-medium text-white">{selectedInquiry.need}</p>
                </div>

                {selectedInquiry.customizingConceptTitle && (
                  <div>
                    <span className="text-stone-500 block text-[10px] uppercase font-bold">Base Concept Selected</span>
                    <p className="font-semibold text-amber-400">{selectedInquiry.customizingConceptTitle}</p>
                  </div>
                )}

                {selectedInquiry.budget && (
                  <div>
                    <span className="text-stone-500 block text-[10px] uppercase font-bold">Budget Expectation</span>
                    <p>{selectedInquiry.budget}</p>
                  </div>
                )}

                <div>
                  <span className="text-stone-500 block text-[10px] uppercase font-bold">Client Notes & Requirements</span>
                  <div className="p-3 bg-stone-950 rounded-lg border border-stone-800/80 text-stone-200 mt-1 whitespace-pre-wrap leading-relaxed">
                    {selectedInquiry.message || 'No additional notes provided.'}
                  </div>
                </div>

                <div className="pt-2 text-[10px] text-stone-500 flex items-center justify-between">
                  <span>Source: {selectedInquiry.source || 'Website'}</span>
                  <span>ID: {selectedInquiry.id}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-stone-500 space-y-1">
              <Inbox className="w-8 h-8 mx-auto text-stone-700" />
              <p>Select an inquiry on the left to inspect details or reply via WhatsApp.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
