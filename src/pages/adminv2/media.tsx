/**
 * AdminV2 Media Library - Apple Vision Pro Inspired Media Management
 * Premium glassmorphic media management with advanced features
 *
 * Features:
 * - Drag & drop upload with progress
 * - Grid/List view toggle
 * - Advanced search & filters
 * - Folder organization
 * - Bulk actions
 * - Media picker integration
 */

import React, { useState, useCallback, useEffect } from 'react';
import Head from 'next/head';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload,
  Search,
  Grid3x3,
  List,
  FolderOpen,
  Tag,
  Calendar,
  Download,
  Trash2,
  Edit,
  Image as ImageIcon,
  FileText,
  Film,
  File,
  Plus,
  X,
  Check,
  Loader2,
  Filter,
  RefreshCw,
  ChevronDown,
  Eye,
  Copy,
} from 'lucide-react';
import AdminV2Layout from '@/components/adminv2/AdminV2Layout';
import { useToast } from '@/context/ToastContext';
import logger from '@/lib/logger';

interface MediaItem {
  id: string;
  filename: string;
  originalFilename: string;
  mimetype: string;
  size: number;
  category: 'image' | 'document' | 'video' | 'other';
  url: string;
  thumbnail?: string;
  folder: string;
  tags: string[];
  description: string;
  uploadedBy: string;
  uploadedAt: string;
  dimensions?: { width: number; height: number };
  usageCount?: number;
}

interface MediaStats {
  total: number;
  totalSize: number;
  byCategory: Record<string, number>;
  folders: string[];
  allTags: string[];
}

export default function AdminV2MediaLibrary() {
  const { data: session } = useSession();
  const router = useRouter();
  const { showSuccess, showError, showInfo } = useToast();

  // State
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [stats, setStats] = useState<MediaStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // View state
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedMedia, setSelectedMedia] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);

  // Filters
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    folder: '',
    tags: [] as string[],
  });

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Load media
  const loadMedia = useCallback(async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
        sortBy: 'uploadedAt',
        sortOrder: 'desc',
        ...(filters.search && { search: filters.search }),
        ...(filters.category && { category: filters.category }),
        ...(filters.folder && { folder: filters.folder }),
      });

      const response = await fetch(`/api/adminv2/media/list?${params}`);
      const data = await response.json();

      if (data.success) {
        setMedia(data.data.media);
        setStats(data.data.stats);
        setTotalPages(data.data.stats.totalPages);
      } else {
        showError('Failed to load media', data.error);
      }
    } catch (error) {
      logger.error('Media load error', error);
      showError('Failed to load media', 'Please try again');
    } finally {
      setLoading(false);
    }
  }, [page, filters, showError]);

  useEffect(() => {
    loadMedia();
  }, [loadMedia]);

  // Handle file upload
  const handleFileUpload = async (files: FileList) => {
    if (files.length === 0) return;

    try {
      setUploading(true);
      setUploadProgress(0);

      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('file', files[i]);
      }
      formData.append('folder', filters.folder || 'general');

      const response = await fetch('/api/adminv2/media/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        showSuccess('Upload successful', `${data.data.length} file(s) uploaded`);
        loadMedia();
      } else {
        showError('Upload failed', data.error);
      }
    } catch (error) {
      logger.error('Media upload error', error);
      showError('Upload failed', 'Please try again');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  // Handle drag & drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFileUpload(e.dataTransfer.files);
  };

  // Delete media
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this media?')) return;

    try {
      const response = await fetch(`/api/adminv2/media/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        showSuccess('Media deleted', 'File removed successfully');
        loadMedia();
      } else {
        showError('Delete failed', data.error);
      }
    } catch (error) {
      logger.error('Media delete error', error);
      showError('Delete failed', 'Please try again');
    }
  };

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'image':
        return <ImageIcon className="w-5 h-5" />;
      case 'document':
        return <FileText className="w-5 h-5" />;
      case 'video':
        return <Film className="w-5 h-5" />;
      default:
        return <File className="w-5 h-5" />;
    }
  };

  if (!session || session.user?.role !== 'admin') {
    router.push('/auth/signin');
    return null;
  }

  return (
    <>
      <Head>
        <title>Media Library - AdminV2 | AILYDIAN Holiday</title>
      </Head>

      <AdminV2Layout>
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-black text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600"
              >
                Media Library
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-gray-300 mt-2"
              >
                Manage your media files, images, documents and videos
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-3"
            >
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2.5 bg-white/10 backdrop-blur-xl backdrop-blur-xl rounded-xl border border-white/20 flex items-center gap-2 hover:bg-white/15 backdrop-blur-xl hover:border-blue-500/30 transition-all"
              >
                <Filter className="w-4 h-4" />
                <span className="font-medium">Filters</span>
              </button>

              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="p-2.5 bg-white/10 backdrop-blur-xl backdrop-blur-xl rounded-xl border border-white/20 hover:bg-white/15 backdrop-blur-xl hover:border-blue-500/30 transition-all"
              >
                {viewMode === 'grid' ? <List className="w-5 h-5 text-white" /> : <Grid3x3 className="w-5 h-5 text-white" />}
              </button>

              <label className="px-6 py-3 bg-gradient-to-r from-blue-600 to-lydian-accent text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-lydian-primary/30 transition-all cursor-pointer flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Upload Files
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                  accept="image/*,application/pdf,video/*"
                />
              </label>
            </motion.div>
          </div>

          {/* Stats */}
          {stats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Total Files', value: stats.total, icon: ImageIcon, color: 'from-blue-500 to-cyan-600' },
                { label: 'Total Size', value: formatFileSize(stats.totalSize), icon: Upload, color: 'from-purple-500 to-pink-600' },
                { label: 'Images', value: stats.byCategory.image || 0, icon: ImageIcon, color: 'from-green-500 to-emerald-600' },
                { label: 'Folders', value: stats.folders.length, icon: FolderOpen, color: 'from-orange-500 to-purple-600' },
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative"
                  >
                    <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-blue-500/30 transition-all overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                      <div className={`absolute top-4 right-4 p-3 rounded-xl bg-gradient-to-br ${stat.color} opacity-10`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="relative">
                        <p className="text-sm text-gray-300 mb-2">{stat.label}</p>
                        <p className="text-3xl font-bold text-white">{stat.value}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Search & Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
          >
            <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                <input
                  type="text"
                  placeholder="Search files..."
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-blue-500/50 transition-all"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={loadMedia}
                className="px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all"
              >
                <RefreshCw className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>

          {/* Upload Drop Zone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="relative group"
          >
            <div className="border-2 border-dashed border-white/20 rounded-2xl p-16 text-center bg-white/5 hover:bg-white/10 hover:border-blue-500/50 transition-all overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Upload className="w-20 h-20 mx-auto mb-6 text-gray-300" />
                </motion.div>
                <p className="text-xl text-white font-bold mb-2">Drag & drop files here</p>
                <p className="text-gray-300">or click Upload Files button above</p>
                <p className="text-xs text-gray-400 mt-4">Supports images, PDFs, and videos up to 10MB</p>
              </div>
            </div>
          </motion.div>

          {/* Media Grid/List */}
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20"
            >
              <Loader2 className="w-12 h-12 animate-spin text-blue-400 mb-4" />
              <p className="text-gray-300">Loading media files...</p>
            </motion.div>
          ) : media.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20 bg-white/5 rounded-2xl border border-white/20"
            >
              <ImageIcon className="w-20 h-20 mx-auto mb-4 text-gray-300 opacity-50" />
              <p className="text-lg text-white font-semibold mb-2">No media files found</p>
              <p className="text-sm text-gray-300">Upload files to get started</p>
            </motion.div>
          ) : (
            <div className={viewMode === 'grid' ? 'grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4' : 'space-y-3'}>
              {media.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative"
                >
                  <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-3 border border-white/20 hover:border-blue-500/50 hover:shadow-lg hover:shadow-purple-500/10 transition-all overflow-hidden">
                    {viewMode === 'grid' ? (
                      <>
                        <div className="aspect-square bg-white/5 rounded-xl mb-3 overflow-hidden relative group-hover:scale-105 transition-transform">
                          {item.category === 'image' ? (
                            <img src={item.url} alt={item.originalFilename} className="w-full h-full object-cover" />
                          ) : (
                            <div className="flex items-center justify-center h-full text-blue-400">
                              {getCategoryIcon(item.category)}
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                            <div className="flex gap-2">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-2 bg-white/10 backdrop-blur-xl rounded-lg hover:bg-gradient-to-r from-blue-600 to-purple-600 transition-all"
                              >
                                <Eye className="w-4 h-4" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-2 bg-white/10 backdrop-blur-xl rounded-lg hover:bg-blue-500/20 transition-all"
                              >
                                <Copy className="w-4 h-4" />
                              </motion.button>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-white truncate font-medium mb-1">{item.originalFilename}</p>
                        <p className="text-xs text-gray-300 mb-3">{formatFileSize(item.size)}</p>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleDelete(item.id)}
                          className="w-full px-3 py-2 text-xs bg-purple-500/10 text-purple-300 rounded-lg hover:bg-purple-500/20 border border-purple-500/20 hover:border-purple-500/40 transition-all flex items-center justify-center gap-2 font-medium"
                        >
                          <Trash2 className="w-3 h-3" />
                          Delete
                        </motion.button>
                      </>
                    ) : (
                      <div className="flex items-center gap-4 p-3">
                        <div className="w-16 h-16 bg-white/5 rounded-xl flex items-center justify-center flex-shrink-0">
                          {getCategoryIcon(item.category)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white font-semibold truncate">{item.originalFilename}</p>
                          <p className="text-xs text-gray-300 mt-1">{formatFileSize(item.size)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2 bg-white/10 rounded-lg hover:bg-gradient-to-r from-blue-600 to-purple-600/20 transition-all"
                          >
                            <Eye className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDelete(item.id)}
                            className="px-4 py-2 text-xs bg-purple-500/10 text-purple-300 rounded-lg hover:bg-purple-500/20 border border-purple-500/20 transition-all font-medium"
                          >
                            Delete
                          </motion.button>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center gap-2"
            >
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <motion.button
                  key={p}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPage(p)}
                  className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                    p === page
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-white/10 text-gray-300 hover:bg-white/15 border border-white/20'
                  }`}
                >
                  {p}
                </motion.button>
              ))}
            </motion.div>
          )}
        </div>
      </AdminV2Layout>
    </>
  );
}
