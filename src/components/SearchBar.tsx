import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query as firestoreQuery, where, getDocs, limit } from 'firebase/firestore';
import { db } from '../config/firebase';
import './SearchBar.css';

export interface SearchResult {
  id: string;
  title: string;
  excerpt: string;
  type: 'blog' | 'document' | 'qa' | 'family-law';
  path: string;
  keywords?: string[];
  image?: string;
  views?: number;
}

interface SearchBarProps {
  onSearch?: (results: SearchResult[]) => void;
  placeholder?: string;
}

/**
 * Advanced Search Bar with autocomplete and filters
 * Supports full-text search, keyword matching, and result filtering
 */
export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = 'Tìm kiếm bài viết, tài liệu pháp luật...',
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedType, setSelectedType] = useState<'all' | 'blog' | 'document' | 'qa'>('all');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /**
   * Search across all content types
   */
  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);
    try {
      const allResults: SearchResult[] = [];

      // Search in blog posts
      if (selectedType === 'all' || selectedType === 'blog') {
        const blogRef = collection(db, 'blogPosts');
        const blogQueryRef = firestoreQuery(
          blogRef,
          where('title', '>=', searchQuery),
          where('title', '<=', searchQuery + '\uf8ff'),
          limit(5)
        );

        const snapshot = await getDocs(blogQueryRef);
        snapshot.forEach((doc) => {
          const data = doc.data() as any;
          allResults.push({
            id: doc.id,
            title: data.title,
            excerpt: data.excerpt || data.content?.substring(0, 150),
            type: 'blog',
            path: `/blog/${doc.id}`,
            keywords: data.tags,
            image: data.image,
            views: data.views,
          });
        });
      }

      // Search in documents
      if (selectedType === 'all' || selectedType === 'document') {
        const docRef = collection(db, 'documents');
        const docQueryRef = firestoreQuery(
          docRef,
          where('title', '>=', searchQuery),
          where('title', '<=', searchQuery + '\uf8ff'),
          limit(5)
        );

        const snapshot = await getDocs(docQueryRef);
        snapshot.forEach((doc) => {
          const data = doc.data() as any;
          allResults.push({
            id: doc.id,
            title: data.title,
            excerpt: data.description || data.content?.substring(0, 150),
            type: 'document',
            path: `/documents/${doc.id}`,
            keywords: data.category ? [data.category] : [],
          });
        });
      }

      // Search in Q&A
      if (selectedType === 'all' || selectedType === 'qa') {
        const qaRef = collection(db, 'qa');
        const qaQueryRef = firestoreQuery(
          qaRef,
          where('question', '>=', searchQuery),
          where('question', '<=', searchQuery + '\uf8ff'),
          limit(5)
        );

        const snapshot = await getDocs(qaQueryRef);
        snapshot.forEach((doc) => {
          const data = doc.data() as any;
          allResults.push({
            id: doc.id,
            title: data.question,
            excerpt: data.answer?.substring(0, 150) || data.question,
            type: 'qa',
            path: `/qa/${doc.id}`,
            keywords: data.category ? [data.category] : [],
          });
        });
      }

      // Remove duplicates and limit results
      const uniqueResults = Array.from(
        new Map(allResults.map((item) => [item.id, item])).values()
      ).slice(0, 8);

      setResults(uniqueResults);
      setIsOpen(true);
      onSearch?.(uniqueResults);

      // Save to recent searches
      const newRecent = [
        searchQuery,
        ...recentSearches.filter((s) => s !== searchQuery),
      ].slice(0, 5);
      setRecentSearches(newRecent);
      localStorage.setItem('recentSearches', JSON.stringify(newRecent));
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length >= 2) {
      performSearch(value);
    } else {
      setResults([]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/blog?search=${encodeURIComponent(searchTerm)}`);
      setIsOpen(false);
    }
  };

  const handleResultClick = (path: string) => {
    navigate(path);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleRecentClick = (term: string) => {
    setSearchTerm(term);
    performSearch(term);
  };

  return (
    <div ref={searchRef} className="search-bar-container">
      <form onSubmit={handleSubmit} className="search-bar">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => searchTerm.length >= 2 && setIsOpen(true)}
          placeholder={placeholder}
          className="search-input"
          autoComplete="off"
        />
        <button type="submit" className="search-button" aria-label="Tìm kiếm">
          <span>🔍</span>
        </button>
      </form>

      {isOpen && (
        <div className="search-dropdown">
          {/* Type filters */}
          <div className="search-filters">
            <button
              className={`filter-btn ${selectedType === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedType('all')}
            >
              Tất cả
            </button>
            <button
              className={`filter-btn ${selectedType === 'blog' ? 'active' : ''}`}
              onClick={() => setSelectedType('blog')}
            >
              Bài viết
            </button>
            <button
              className={`filter-btn ${selectedType === 'document' ? 'active' : ''}`}
              onClick={() => setSelectedType('document')}
            >
              Tài liệu
            </button>
            <button
              className={`filter-btn ${selectedType === 'qa' ? 'active' : ''}`}
              onClick={() => setSelectedType('qa')}
            >
              Hỏi đáp
            </button>
          </div>

          {/* Search results */}
          {isLoading ? (
            <div className="search-loading">Đang tìm kiếm...</div>
          ) : results.length > 0 ? (
            <div className="search-results">
              {results.map((result) => (
                <div
                  key={result.id}
                  className="search-result-item"
                  onClick={() => handleResultClick(result.path)}
                >
                  <div className="result-header">
                    <h4 className="result-title">{result.title}</h4>
                    <span className="result-type">{getTypeLabel(result.type)}</span>
                  </div>
                  <p className="result-excerpt">{result.excerpt}</p>
                  {result.keywords && result.keywords.length > 0 && (
                    <div className="result-keywords">
                      {result.keywords.slice(0, 3).map((kw) => (
                        <span key={kw} className="keyword-tag">
                          {kw}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : searchTerm.length >= 2 ? (
            <div className="search-empty">Không tìm thấy kết quả</div>
          ) : null}

          {/* Recent searches */}
          {!searchTerm && recentSearches.length > 0 && (
            <div className="search-recent">
              <h5>Tìm kiếm gần đây</h5>
              <div className="recent-list">
                {recentSearches.map((term) => (
                  <button
                    key={term}
                    className="recent-item"
                    onClick={() => handleRecentClick(term)}
                  >
                    🕐 {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Suggestions */}
          {!searchTerm && (
            <div className="search-suggestions">
              <h5>Tìm kiếm phổ biến</h5>
              <div className="suggestion-list">
                {[
                  'Thừa phát lại là gì',
                  'Lập vi bằng',
                  'Thi hành án',
                  'Ly hôn',
                  'Chia tài sản',
                ].map((term) => (
                  <button
                    key={term}
                    className="suggestion-item"
                    onClick={() => handleRecentClick(term)}
                  >
                    ✨ {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

function getTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    blog: 'Bài viết',
    document: 'Tài liệu',
    qa: 'Hỏi đáp',
    'family-law': 'Gia đình',
  };
  return labels[type] || type;
}

export default SearchBar;
