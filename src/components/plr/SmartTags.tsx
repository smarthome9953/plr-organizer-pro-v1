import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusIcon, XIcon } from 'lucide-react';
import { useFileExplorer } from '@/context/FileExplorerContext';
import { supabase } from '@/integrations/supabase/client';

interface Tag {
  id: string;
  name: string;
  count: number;
}

export function SmartTags() {
  const [newTag, setNewTag] = useState('');
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { selectedFolders } = useFileExplorer();

  // Load tags for selected files
  React.useEffect(() => {
    const loadTags = async () => {
      if (!selectedFolders.length) return;

      const filePaths = selectedFolders.flatMap(folder => 
        folder.type === 'file' ? [folder.path] : []
      );

      if (!filePaths.length) return;

      const { data: fileTags, error: fileTagsError } = await supabase
        .from('plr_file_tags')
        .select(`
          tag_id,
          tags:tag_id (
            id,
            name
          )
        `)
        .in('file_path', filePaths);

      if (fileTagsError) {
        console.error('Error loading tags:', fileTagsError);
        return;
      }

      if (fileTags) {
        const tagCounts = fileTags.reduce((acc, { tags }) => {
          if (tags?.name) {
            acc[tags.name] = (acc[tags.name] || 0) + 1;
          }
          return acc;
        }, {} as Record<string, number>);

        setTags(Object.entries(tagCounts).map(([name, count]) => ({
          id: name,
          name,
          count
        })));
      }
    };

    loadTags();
  }, [selectedFolders]);

  const addTag = async () => {
    if (!newTag.trim() || !selectedFolders.length) return;

    const user = await supabase.auth.getUser();
    if (!user.data.user) return;

    // First create or get the tag
    const { data: existingTag, error: tagError } = await supabase
      .from('tags')
      .select('id')
      .eq('name', newTag.trim())
      .single();

    let tagId: string;

    if (tagError) {
      // Tag doesn't exist, create it
      const { data: newTagData, error: createError } = await supabase
        .from('tags')
        .insert({ name: newTag.trim(), user_id: user.data.user.id })
        .select('id')
        .single();

      if (createError) {
        console.error('Error creating tag:', createError);
        return;
      }

      tagId = newTagData.id;
    } else {
      tagId = existingTag.id;
    }

    // Then associate the tag with selected files
    const fileTags = selectedFolders
      .filter(folder => folder.type === 'file')
      .map(file => ({
        file_path: file.path,
        tag_id: tagId,
        user_id: user.data.user.id
      }));

    const { error: linkError } = await supabase
      .from('plr_file_tags')
      .insert(fileTags);

    if (linkError) {
      console.error('Error linking tags:', linkError);
      return;
    }

    // Update local state
    setNewTag('');
    setTags(prev => {
      const existing = prev.find(t => t.name === newTag.trim());
      if (existing) {
        return prev.map(t => 
          t.id === existing.id 
            ? { ...t, count: t.count + selectedFolders.length }
            : t
        );
      }
      return [...prev, { id: tagId, name: newTag.trim(), count: selectedFolders.length }];
    });
  };

  const removeTag = async (tagId: string) => {
    const { error } = await supabase
      .from('plr_file_tags')
      .delete()
      .eq('tag_id', tagId)
      .in('file_path', selectedFolders.map(f => f.path));

    if (error) {
      console.error('Error removing tag:', error);
      return;
    }

    setTags(prev => prev.filter(t => t.id !== tagId));
  };

  const toggleTagSelection = (tagId: string) => {
    setSelectedTags(prev => 
      prev.includes(tagId)
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center space-x-2">
        <Input
          placeholder="Add a tag..."
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTag()}
        />
        <Button 
          size="icon" 
          variant="outline"
          onClick={addTag}
        >
          <PlusIcon className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <Badge
            key={tag.id}
            variant={selectedTags.includes(tag.id) ? "default" : "secondary"}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => toggleTagSelection(tag.id)}
          >
            {tag.name} ({tag.count})
            <Button
              size="icon"
              variant="ghost"
              className="h-4 w-4 p-0"
              onClick={(e) => {
                e.stopPropagation();
                removeTag(tag.id);
              }}
            >
              <XIcon className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
      </div>
    </div>
  );
}