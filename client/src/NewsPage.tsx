import React, { useState, useEffect } from 'react';

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  source: string;
  category: string;
}

function NewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<'all' | 'forex' | 'finance'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5174';

  async function fetchNews() {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      params.append('category', category);
      if (searchQuery) params.append('search', searchQuery);
      
      const res = await fetch(`${apiUrl}/api/news?${params.toString()}`);
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.message || 'Failed to fetch news');
      
      setArticles(data.articles || []);
      setLastUpdated(new Date());
    } catch (e: any) {
      setError(e?.message || 'Failed to fetch news');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchNews();
  }, [category]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchNews();
    }, 300000); // Refresh every 5 minutes for real-time updates

    return () => clearInterval(interval);
  }, [category]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    fetchNews();
  }

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  }

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed" style={{ backgroundImage: "url('/assets/images/news page backoground.jpg')" }}>
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative py-6 sm:py-8 lg:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-6 sm:mb-8 text-center">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">Financial News</h1>
            <p className="text-sm sm:text-base text-white/70">Latest updates from trusted financial sources</p>
          </div>

          {/* Controls */}
          <div className="mb-6 sm:mb-8 flex flex-col gap-4">
            <div className="flex gap-2 flex-wrap justify-center">
              {(['all', 'forex', 'finance'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium capitalize transition ${
                    category === cat
                      ? 'bg-emerald-500 text-white'
                      : 'bg-white/10 text-white/80 hover:bg-white/20'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <form onSubmit={handleSearch} className="flex gap-2 w-full max-w-md mx-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="flex-1 rounded-lg border border-white/20 bg-white/10 px-3 sm:px-4 py-2 text-sm text-white placeholder-white/50 focus:border-emerald-400 focus:outline-none"
              />
              <button
                type="submit"
                className="px-3 sm:px-4 py-2 rounded-lg bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-400 transition"
              >
                Search
              </button>
            </form>
          </div>

          {/* News Grid */}
          {loading ? (
            <div className="text-center py-20 text-white/70">Loading news...</div>
          ) : error ? (
            <div className="text-center py-20 text-red-300">{error}</div>
          ) : articles.length === 0 ? (
            <div className="text-center py-20 text-white/70">No news found</div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article, index) => (
                <a
                  key={`${article.url}-${index}`}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <div className="relative rounded-xl overflow-hidden bg-white/5 hover:bg-white/10 transition">
                    {article.urlToImage ? (
                      <img 
                        src={article.urlToImage} 
                        alt={article.title} 
                        className="w-full object-cover transition group-hover:scale-105"
                        style={{ aspectRatio: '16/9' }}
                      />
                    ) : (
                      <div 
                        className="w-full bg-gradient-to-br from-emerald-900/30 to-blue-900/30 flex items-center justify-center"
                        style={{ aspectRatio: '16/9' }}
                      >
                        <span className="text-4xl text-white/20 font-serif">FT</span>
                      </div>
                    )}
                    <div className="p-3 sm:p-4">
                      <div className="flex items-center gap-2 text-xs text-emerald-400 mb-2">
                        <span className="font-medium">{article.source}</span>
                        <span>•</span>
                        <span>{formatDate(article.publishedAt)}</span>
                      </div>
                      <h3 className="text-sm sm:text-base font-semibold text-white group-hover:text-emerald-300 transition line-clamp-2">
                        {article.title}
                      </h3>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NewsPage;
