
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import PLRLibrary from '@/components/plr/PLRLibrary';
import { Helmet } from 'react-helmet-async';

const PLRLibraryPage = () => {
  return (
    <>
      <Helmet>
        <title>PLR Library | PLR Organizer Pro</title>
        <meta name="description" content="Manage your PLR content in PLR Organizer Pro" />
      </Helmet>
      
      <DashboardLayout>
        <PLRLibrary />
      </DashboardLayout>
    </>
  );
};

export default PLRLibraryPage;
