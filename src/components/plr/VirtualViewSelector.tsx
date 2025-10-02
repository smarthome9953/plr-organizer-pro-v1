import React from 'react';
import { useFileExplorer } from '@/context/FileExplorerContext';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ViewType } from '@/context/FileExplorerContext';

export function VirtualViewSelector() {
  const { 
    activeView,
    setActiveView,
    generateVirtualView
  } = useFileExplorer();

  const handleViewChange = (value: ViewType) => {
    setActiveView(value);
    generateVirtualView(value);
  };

  return (
    <div className="flex items-center space-x-4 mb-4 p-2">
      <Select
        value={activeView}
        onValueChange={handleViewChange}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="View Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="physical">Physical View</SelectItem>
          <SelectItem value="category">By Category</SelectItem>
          <SelectItem value="date">By Date</SelectItem>
          <SelectItem value="license">By License</SelectItem>
          <SelectItem value="quality">By Quality</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}