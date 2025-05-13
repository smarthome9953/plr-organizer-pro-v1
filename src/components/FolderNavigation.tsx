
import React from 'react';
import { Folder, FolderOpen, HardDrive, ChevronRight, ChevronDown } from 'lucide-react';
import { useFileExplorer, FileSystemNode } from '@/context/FileExplorerContext';
import { formatBytes } from '@/lib/utils';

const FolderNavigation = () => {
  const { 
    fileSystem, 
    selectedFolders, 
    expandFolder, 
    collapseFolder, 
    toggleFolderSelection 
  } = useFileExplorer();

  const renderFileSystem = (nodes: FileSystemNode[]) => {
    return nodes.map((node) => {
      const isSelected = selectedFolders.some(selected => selected.id === node.id);
      
      if (node.type === 'drive') {
        const usedSpace = node.usedSpace || 0;
        const totalSpace = node.totalSpace || 1;
        const percentage = Math.floor((usedSpace / totalSpace) * 100);
        
        return (
          <div key={node.id} className="mb-2">
            <div 
              className={`tree-item ${isSelected ? 'active' : ''}`}
              onClick={() => toggleFolderSelection(node)}
            >
              {node.expanded ? (
                <ChevronDown 
                  className="h-4 w-4 cursor-pointer" 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    collapseFolder(node.id); 
                  }}
                />
              ) : (
                <ChevronRight 
                  className="h-4 w-4 cursor-pointer" 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    expandFolder(node.id); 
                  }}
                />
              )}
              <HardDrive className="h-4 w-4" />
              <span>{node.name}</span>
            </div>
            
            <div className="px-4 mt-1">
              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary" 
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>{formatBytes(usedSpace)} used</span>
                <span>{formatBytes(totalSpace - usedSpace)} free</span>
              </div>
            </div>
            
            {node.expanded && node.children && (
              <div className="folder-expanded ml-2">
                {renderFileSystem(node.children)}
              </div>
            )}
          </div>
        );
      }
      
      if (node.type === 'folder') {
        return (
          <div key={node.id}>
            <div 
              className={`tree-item ${isSelected ? 'active' : ''}`}
              onClick={() => toggleFolderSelection(node)}
            >
              {node.children && node.children.length > 0 ? (
                node.expanded ? (
                  <ChevronDown 
                    className="h-4 w-4 cursor-pointer" 
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      collapseFolder(node.id); 
                    }}
                  />
                ) : (
                  <ChevronRight 
                    className="h-4 w-4 cursor-pointer" 
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      expandFolder(node.id); 
                    }}
                  />
                )
              ) : (
                <div className="w-4" />
              )}
              
              {node.expanded ? 
                <FolderOpen className="h-4 w-4 text-primary" /> : 
                <Folder className="h-4 w-4" />
              }
              <span>{node.name}</span>
            </div>
            
            {node.expanded && node.children && (
              <div className="folder-expanded ml-2">
                {renderFileSystem(node.children)}
              </div>
            )}
          </div>
        );
      }
      
      return null; // Don't render files in navigation
    });
  };

  return (
    <div className="p-4 h-full overflow-auto border-r">
      <h2 className="font-semibold mb-4">Folders</h2>
      <div className="space-y-2">
        {renderFileSystem(fileSystem)}
      </div>
    </div>
  );
};

export default FolderNavigation;
