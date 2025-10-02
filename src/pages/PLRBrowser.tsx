import React from 'react';
import { VirtualViewSelector } from '@/components/plr/VirtualViewSelector';
import { DynamicFilters } from '@/components/plr/DynamicFilters';
import { SmartTags } from '@/components/plr/SmartTags';
import { useFileExplorer } from '@/context/FileExplorerContext';
import { VirtualView, FileSystemNode } from '@/context/FileExplorerContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronDown, File, Folder } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface FileTreeNodeProps {
  node: FileSystemNode;
  level?: number;
}

const FileTreeNode: React.FC<FileTreeNodeProps> = ({ node, level = 0 }) => {
  const { 
    expandFolder, 
    collapseFolder, 
    toggleFolderSelection,
    selectedFolders
  } = useFileExplorer();

  const isSelected = selectedFolders.some(f => f.id === node.id);
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = node.expanded;

  const handleToggle = () => {
    if (hasChildren) {
      if (isExpanded) {
        collapseFolder(node.id);
      } else {
        expandFolder(node.id);
      }
    }
  };

  const handleSelect = () => {
    toggleFolderSelection(node);
  };

  return (
    <div style={{ marginLeft: `${level * 20}px` }}>
      <div 
        className={`flex items-center gap-2 p-1 hover:bg-accent rounded-md cursor-pointer ${
          isSelected ? 'bg-accent' : ''
        }`}
        onClick={handleSelect}
      >
        <Button
          variant="ghost"
          size="icon"
          className="h-4 w-4 p-0"
          onClick={(e) => {
            e.stopPropagation();
            handleToggle();
          }}
        >
          {hasChildren && (
            isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
          )}
        </Button>
        {node.type === 'file' ? (
          <File className="h-4 w-4" />
        ) : (
          <Folder className="h-4 w-4" />
        )}
        <span className="text-sm">{node.name}</span>
        {node.isPlr && (
          <span className="text-xs text-muted-foreground ml-2">
            PLR ({Math.round(node.confidence! * 100)}%)
          </span>
        )}
      </div>
      {isExpanded && hasChildren && (
        <div>
          {node.children!.map(child => (
            <FileTreeNode 
              key={child.id} 
              node={child} 
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface VirtualViewNodeProps {
  view: VirtualView;
}

const VirtualViewNode: React.FC<VirtualViewNodeProps> = ({ view }) => {
  const { expandVirtualView, collapseVirtualView } = useFileExplorer();

  return (
    <div className="space-y-2">
      <div 
        className="flex items-center gap-2 p-2 hover:bg-accent rounded-md cursor-pointer"
        onClick={() => view.expanded ? collapseVirtualView(view.id) : expandVirtualView(view.id)}
      >
        <Button
          variant="ghost"
          size="icon"
          className="h-4 w-4 p-0"
        >
          {view.expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
        <span className="font-medium">{view.name}</span>
        <span className="text-xs text-muted-foreground">
          ({view.nodes.length} items)
        </span>
      </div>
      {view.expanded && (
        <div className="pl-6">
          {view.nodes.map(node => (
            <FileTreeNode key={node.id} node={node} />
          ))}
        </div>
      )}
    </div>
  );
};

export function PLRBrowser() {
  const { 
    fileSystem,
    virtualViews,
    activeView
  } = useFileExplorer();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto py-8">
        <div className="h-full flex">
          {/* Left Sidebar - Tree View */}
          <div className="w-1/4 border-r p-4">
            <VirtualViewSelector />
            <ScrollArea className="h-[calc(100vh-200px)]">
              {activeView === 'physical' ? (
                <div className="space-y-2">
                  {fileSystem.map(node => (
                    <FileTreeNode key={node.id} node={node} />
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {virtualViews
                    .filter(view => view.type === activeView)
                    .map(view => (
                      <VirtualViewNode key={view.id} view={view} />
                    ))}
                </div>
              )}
            </ScrollArea>
          </div>

          {/* Right Sidebar - Filters and Tags */}
          <div className="w-3/4 p-4">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Filters</h3>
              <DynamicFilters />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Tags</h3>
              <SmartTags />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default PLRBrowser;