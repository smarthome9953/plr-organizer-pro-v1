
import React from 'react';
import { Check } from 'lucide-react';

const ComparisonTable = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center mb-8">How PLR Organizer Pro Compares</h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
          See why dedicated PLR content management software outperforms traditional organization methods and generic solutions not designed for private label rights content.
        </p>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-muted">
                <th className="p-4 text-left">Features</th>
                <th className="p-4 text-center">PLR Organizer Pro</th>
                <th className="p-4 text-center">Manual File Management</th>
                <th className="p-4 text-center">General Document Systems</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="p-4 font-medium">Auto-Categorization</td>
                <td className="p-4 text-center"><Check className="h-5 w-5 text-purple-600 mx-auto" /></td>
                <td className="p-4 text-center">✕</td>
                <td className="p-4 text-center">Partial</td>
              </tr>
              <tr className="border-t">
                <td className="p-4 font-medium">PLR License Tracking</td>
                <td className="p-4 text-center"><Check className="h-5 w-5 text-purple-600 mx-auto" /></td>
                <td className="p-4 text-center">✕</td>
                <td className="p-4 text-center">✕</td>
              </tr>
              <tr className="border-t">
                <td className="p-4 font-medium">Content Usage History</td>
                <td className="p-4 text-center"><Check className="h-5 w-5 text-purple-600 mx-auto" /></td>
                <td className="p-4 text-center">✕</td>
                <td className="p-4 text-center">Partial</td>
              </tr>
              <tr className="border-t">
                <td className="p-4 font-medium">ROI Analytics</td>
                <td className="p-4 text-center"><Check className="h-5 w-5 text-purple-600 mx-auto" /></td>
                <td className="p-4 text-center">✕</td>
                <td className="p-4 text-center">✕</td>
              </tr>
              <tr className="border-t">
                <td className="p-4 font-medium">Duplicate Detection</td>
                <td className="p-4 text-center"><Check className="h-5 w-5 text-purple-600 mx-auto" /></td>
                <td className="p-4 text-center">✕</td>
                <td className="p-4 text-center">Partial</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;
