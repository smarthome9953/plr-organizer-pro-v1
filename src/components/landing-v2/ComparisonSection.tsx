import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Check, X, Minus } from 'lucide-react';

const features = [
  { name: "Auto-detect PLR content", plrPro: true, manual: false, generic: false },
  { name: "Organize by niche automatically", plrPro: true, manual: false, generic: false },
  { name: "Track license terms", plrPro: true, manual: "partial", generic: false },
  { name: "Detect duplicates", plrPro: true, manual: false, generic: false },
  { name: "Virtual views without moving files", plrPro: true, manual: false, generic: false },
  { name: "Built-in content tools", plrPro: true, manual: false, generic: false },
  { name: "Works with compressed files", plrPro: true, manual: "partial", generic: "partial" },
  { name: "Cross-platform support", plrPro: true, manual: true, generic: true },
];

const FeatureIcon = ({ value }: { value: boolean | string }) => {
  if (value === true) {
    return <Check className="h-5 w-5 text-status-success mx-auto" />;
  }
  if (value === "partial") {
    return <Minus className="h-5 w-5 text-status-warning mx-auto" />;
  }
  return <X className="h-5 w-5 text-muted-foreground mx-auto" />;
};

const ComparisonSection = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose PLR Organizer Pro?
          </h2>
          <p className="text-lg text-muted-foreground">
            See how we compare to other methods of organizing PLR content.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40%]">Feature</TableHead>
                <TableHead className="text-center bg-primary/10">
                  <span className="font-bold text-primary">PLR Organizer Pro</span>
                </TableHead>
                <TableHead className="text-center">Manual Folders</TableHead>
                <TableHead className="text-center">Generic Organizers</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {features.map((feature, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{feature.name}</TableCell>
                  <TableCell className="bg-primary/5">
                    <FeatureIcon value={feature.plrPro} />
                  </TableCell>
                  <TableCell>
                    <FeatureIcon value={feature.manual} />
                  </TableCell>
                  <TableCell>
                    <FeatureIcon value={feature.generic} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
