'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  searchCustomers,
  searchProjects,
  searchStories,
  MOCK_DATA,
} from '@/lib/mock-data';
import type { Customer, Project, Story, FileAttachment } from '@/lib/types';
import { Search, Clock, Users, FolderKanban, Layers, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchResult {
  type: 'customer' | 'project' | 'story' | 'file';
  id: string;
  title: string;
  subtitle?: string;
  url: string;
}

const RECENT_SEARCHES_KEY = 'recentSearches';
const MAX_RECENT = 5;

export function GlobalSearch() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Load recent searches from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  // Keyboard shortcut to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Search function
  const performSearch = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const allResults: SearchResult[] = [];

    // Search customers
    const customers = searchCustomers(searchQuery);
    customers.slice(0, 3).forEach(customer => {
      allResults.push({
        type: 'customer',
        id: customer.id,
        title: customer.name,
        subtitle: customer.email,
        url: `/customers`,
      });
    });

    // Search projects
    const projects = searchProjects(searchQuery);
    projects.slice(0, 3).forEach(project => {
      allResults.push({
        type: 'project',
        id: project.id,
        title: project.title,
        subtitle: project.type,
        url: `/projects/${project.id}`,
      });
    });

    // Search stories
    const stories = searchStories(searchQuery);
    stories.slice(0, 3).forEach(story => {
      allResults.push({
        type: 'story',
        id: story.id,
        title: story.title,
        subtitle: `Story ${story.id}`,
        url: `/stories/${story.id}`,
      });
    });

    // Search files
    const files = MOCK_DATA.files.filter(f =>
      f.filename.toLowerCase().includes(searchQuery.toLowerCase())
    );
    files.slice(0, 3).forEach(file => {
      allResults.push({
        type: 'file',
        id: file.id,
        title: file.filename,
        subtitle: `${(file.fileSize / 1024).toFixed(1)} KB`,
        url: `/files`,
      });
    });

    setResults(allResults);
    setSelectedIndex(0);
  }, []);

  // Handle search input change
  useEffect(() => {
    performSearch(query);
  }, [query, performSearch]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % results.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
      } else if (e.key === 'Enter' && results.length > 0) {
        e.preventDefault();
        handleSelect(results[selectedIndex]);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  const handleSelect = (result: SearchResult) => {
    // Save to recent searches
    const newRecent = [query, ...recentSearches.filter(q => q !== query)].slice(0, MAX_RECENT);
    setRecentSearches(newRecent);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(newRecent));

    // Navigate
    router.push(result.url);

    // Close modal
    handleClose();
  };

  const handleClose = () => {
    setIsOpen(false);
    setQuery('');
    setResults([]);
    setSelectedIndex(0);
  };

  const handleRecentSearch = (recentQuery: string) => {
    setQuery(recentQuery);
  };

  const getIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'customer': return Users;
      case 'project': return FolderKanban;
      case 'story': return Layers;
      case 'file': return FileText;
    }
  };

  const getTypeColor = (type: SearchResult['type']) => {
    switch (type) {
      case 'customer': return 'bg-blue-500';
      case 'project': return 'bg-purple-500';
      case 'story': return 'bg-green-500';
      case 'file': return 'bg-orange-500';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl p-0 gap-0">
        {/* Search Input */}
        <div className="flex items-center border-b px-4 py-3">
          <Search className="h-5 w-5 text-muted-foreground mr-2" />
          <Input
            placeholder="Search customers, projects, stories, files..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            autoFocus
          />
          <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[400px] overflow-y-auto p-2">
          {!query && recentSearches.length > 0 ? (
            // Recent Searches
            <div className="p-2">
              <p className="text-xs font-medium text-muted-foreground mb-2 px-2">
                Recent Searches
              </p>
              <div className="space-y-1">
                {recentSearches.map((recent, index) => (
                  <button
                    key={index}
                    onClick={() => handleRecentSearch(recent)}
                    className="flex items-center gap-2 w-full rounded-lg px-3 py-2 hover:bg-muted/50 text-left"
                  >
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{recent}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            // Search Results
            <div className="space-y-1">
              {results.map((result, index) => {
                const Icon = getIcon(result.type);
                const isSelected = index === selectedIndex;

                return (
                  <button
                    key={`${result.type}-${result.id}`}
                    onClick={() => handleSelect(result)}
                    className={cn(
                      'flex items-center gap-3 w-full rounded-lg px-3 py-2 text-left transition-colors',
                      isSelected ? 'bg-muted' : 'hover:bg-muted/50'
                    )}
                  >
                    <div className={cn('rounded p-1.5', getTypeColor(result.type))}>
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{result.title}</p>
                      {result.subtitle && (
                        <p className="text-xs text-muted-foreground truncate">
                          {result.subtitle}
                        </p>
                      )}
                    </div>
                    <Badge variant="outline" className="text-xs capitalize">
                      {result.type}
                    </Badge>
                  </button>
                );
              })}
            </div>
          ) : query ? (
            // No Results
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Search className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-sm font-medium">No results found</p>
              <p className="text-xs text-muted-foreground mt-1">
                Try searching for customers, projects, stories, or files
              </p>
            </div>
          ) : (
            // Empty State
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Search className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-sm font-medium">Start typing to search</p>
              <p className="text-xs text-muted-foreground mt-1">
                Search across all customers, projects, stories, and files
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t px-4 py-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <kbd className="inline-flex h-5 items-center rounded border bg-muted px-1 font-mono">
                ↑↓
              </kbd>
              <span>Navigate</span>
            </div>
            <div className="flex items-center gap-1">
              <kbd className="inline-flex h-5 items-center rounded border bg-muted px-1.5 font-mono">
                ↵
              </kbd>
              <span>Select</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <kbd className="inline-flex h-5 items-center rounded border bg-muted px-1 font-mono">
              ESC
            </kbd>
            <span>Close</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
