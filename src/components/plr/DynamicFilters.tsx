import React, { useState, useEffect } from 'react';
import { useFileExplorer } from '@/context/FileExplorerContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface FilterCriteria {
  name: string;
  category: string;
  licenseType: string;
  minQuality: number;
  dateRange: 'all' | 'lastWeek' | 'lastMonth' | 'lastYear';
}

export function DynamicFilters() {
  const { virtualViews, activeView } = useFileExplorer();
  const [filters, setFilters] = useState<FilterCriteria>({
    name: '',
    category: 'all',
    licenseType: 'all',
    minQuality: 0,
    dateRange: 'all'
  });

  // Get unique categories from virtual views
  const categories = React.useMemo(() => {
    if (activeView !== 'category' || !virtualViews.length) return [];
    const categoryView = virtualViews.find(v => v.type === 'category');
    return categoryView ? ['all', ...categoryView.nodes.map(n => n.name)] : ['all'];
  }, [virtualViews, activeView]);

  // Get unique license types from virtual views
  const licenseTypes = React.useMemo(() => {
    if (activeView !== 'license' || !virtualViews.length) return [];
    const licenseView = virtualViews.find(v => v.type === 'license');
    return licenseView ? ['all', ...licenseView.nodes.map(n => n.name)] : ['all'];
  }, [virtualViews, activeView]);

  const handleFilterChange = (key: keyof FilterCriteria, value: string | number) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      name: '',
      category: 'all',
      licenseType: 'all',
      minQuality: 0,
      dateRange: 'all'
    });
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-background">
      <div className="space-y-2">
        <Label htmlFor="name-filter">Name</Label>
        <Input
          id="name-filter"
          placeholder="Search by name..."
          value={filters.name}
          onChange={(e) => handleFilterChange('name', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category-filter">Category</Label>
        <Select
          value={filters.category}
          onValueChange={(value) => handleFilterChange('category', value)}
        >
          <SelectTrigger id="category-filter">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="license-filter">License Type</Label>
        <Select
          value={filters.licenseType}
          onValueChange={(value) => handleFilterChange('licenseType', value)}
        >
          <SelectTrigger id="license-filter">
            <SelectValue placeholder="Select license type" />
          </SelectTrigger>
          <SelectContent>
            {licenseTypes.map(type => (
              <SelectItem key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Minimum Quality Score</Label>
        <Slider
          value={[filters.minQuality]}
          onValueChange={([value]) => handleFilterChange('minQuality', value)}
          max={100}
          step={10}
          className="w-full"
        />
        <div className="text-sm text-muted-foreground text-right">
          {filters.minQuality}%
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="date-filter">Date Range</Label>
        <Select
          value={filters.dateRange}
          onValueChange={(value: 'all' | 'lastWeek' | 'lastMonth' | 'lastYear') => 
            handleFilterChange('dateRange', value)
          }
        >
          <SelectTrigger id="date-filter">
            <SelectValue placeholder="Select date range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="lastWeek">Last Week</SelectItem>
            <SelectItem value="lastMonth">Last Month</SelectItem>
            <SelectItem value="lastYear">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button 
        variant="outline" 
        className="w-full"
        onClick={clearFilters}
      >
        Clear Filters
      </Button>
    </div>
  );
}