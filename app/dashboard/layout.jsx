import React from 'react';
import Header from './_components/Header';
import Footer from './_components/Footer';
import "../globals.css";

function DashboardLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen gap-5">
      <Header />
      <main className="flex-grow mx-5 md:mx-20 lg:mx-36">{children}</main>
      <Footer />
    </div>
  );
}

export default DashboardLayout;
