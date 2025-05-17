
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import UserManagement from '@/components/admin/UserManagement';
import { Helmet } from 'react-helmet-async';

const UserManagementPage = () => {
  return (
    <>
      <Helmet>
        <title>User Management | PLR Organizer Pro</title>
        <meta name="description" content="Manage users in PLR Organizer Pro" />
      </Helmet>
      
      <DashboardLayout>
        <UserManagement />
      </DashboardLayout>
    </>
  );
};

export default UserManagementPage;
