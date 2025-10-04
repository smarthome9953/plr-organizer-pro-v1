import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Folder, FileText, Bookmark, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { WebAppBanner } from '@/components/dashboard/WebAppBanner';

type CategoryStat = {
  category: string | null;
  count: number;
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const PLRDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [plrStats, setPlrStats] = useState<CategoryStat[]>([]);
  const [totalFiles, setTotalFiles] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPLRStats = async () => {
      if (!user) return;

      setLoading(true);
      
      try {
        // Get category stats using count aggregation
        const { data, error: categoryError } = await supabase
          .from('plr_files')
          .select('category_id')
          .eq('user_id', user.id);
          
        if (categoryError) {
          console.error('Error fetching category stats:', categoryError);
        } else if (data) {
          // Get category names
          const categoryIds = Array.from(new Set(data.map(f => f.category_id).filter(Boolean)));
          
          let categoryMap: Record<string, string> = {};
          if (categoryIds.length > 0) {
            const { data: categoriesData } = await supabase
              .from('plr_categories')
              .select('id, name')
              .in('id', categoryIds);
            
            if (categoriesData) {
              categoryMap = Object.fromEntries(categoriesData.map(c => [c.id, c.name]));
            }
          }
          
          // Manual grouping since supabase-js doesn't support group directly
          const stats: Record<string, number> = {};
          data.forEach(row => {
            const category = row.category_id ? categoryMap[row.category_id] || 'Unknown' : 'Uncategorized';
            stats[category] = (stats[category] || 0) + 1;
          });
          
          // Convert to expected format
          const categoryStats = Object.entries(stats).map(([category, count]) => ({
            category: category === 'Uncategorized' ? null : category,
            count
          }));
          
          setPlrStats(categoryStats);
          setTotalFiles(data.length);
        }
      } catch (error) {
        console.error('Error in fetching PLR stats:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPLRStats();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Loading your PLR library...</span>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Web App Banner - Shows "Download Desktop App" when accessing from browser */}
        <WebAppBanner />
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Your PLR Library</h1>
          <div className="space-x-2">
            <Button 
              variant="outline" 
              onClick={() => navigate('/scan')}
              className="flex items-center"
            >
              <Folder className="mr-2 h-4 w-4" />
              Scan PLR Files
            </Button>
            <Button 
              variant="default"
              onClick={() => navigate('/plr-browser')}
              className="flex items-center"
            >
              <FileText className="mr-2 h-4 w-4" />
              Browse Files
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Summary Cards */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total PLR Files</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-primary mr-3" />
                <span className="text-3xl font-bold">{totalFiles}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Bookmark className="h-8 w-8 text-primary mr-3" />
                <span className="text-3xl font-bold">{plrStats.length}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/scan')}>
                <Folder className="mr-2 h-4 w-4" /> Scan New Content
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/plr-categories')}>
                <Bookmark className="mr-2 h-4 w-4" /> Manage Categories
              </Button>
            </CardContent>
          </Card>
          
          {/* Category Chart */}
          {plrStats.length > 0 ? (
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>PLR Content by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={plrStats}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="count"
                        nameKey="category"
                        label={({ category }) => category || 'Uncategorized'}
                      >
                        {plrStats.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value, name, props) => [`${value} files`, props.payload.category || 'Uncategorized']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Get Started with Your PLR Library</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center p-8">
                  <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">No PLR Content Found</h3>
                  <p className="mb-6 text-muted-foreground">
                    Start by scanning your PLR content to organize and categorize your digital assets.
                  </p>
                  <Button onClick={() => navigate('/scan')}>
                    Scan PLR Content Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PLRDashboard;
