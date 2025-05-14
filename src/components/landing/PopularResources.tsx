
import React from 'react';
import { Link } from 'react-router-dom';

const PopularResources = () => {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container px-4 md:px-6">
        <h3 className="text-xl font-bold mb-6">Popular PLR Resources</h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/blog/organization" className="text-primary hover:underline">PLR Organization Best Practices</Link>
          <Link to="/blog/rights-licensing" className="text-primary hover:underline">Understanding PLR Licenses</Link>
          <Link to="/resources/templates" className="text-primary hover:underline">Free PLR Organization Templates</Link>
          <Link to="/resources/faq" className="text-primary hover:underline">PLR Content Management FAQ</Link>
        </div>
      </div>
    </section>
  );
};

export default PopularResources;
