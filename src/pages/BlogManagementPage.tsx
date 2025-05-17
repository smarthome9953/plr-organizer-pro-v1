
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import BlogManagement from '@/components/blog/BlogManagement';
import { Helmet } from 'react-helmet-async';

const BlogManagementPage = () => {
  return (
    <>
      <Helmet>
        <title>Blog Management | PLR Organizer Pro</title>
        <meta name="description" content="Manage your blog in PLR Organizer Pro" />
      </Helmet>
      
      <DashboardLayout>
        <BlogManagement />
      </DashboardLayout>
    </>
  );
};

export default BlogManagementPage;
