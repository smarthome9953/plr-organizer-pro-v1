
import React, { useState } from 'react';
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bold, Italic, AlignLeft, AlignCenter, AlignRight, Link2, Image, FileText, Code, Undo, Redo } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { toast } from "@/hooks/use-toast";

export default function HtmlEditorApp() {
  const [editorContent, setEditorContent] = useState('');
  const [htmlCode, setHtmlCode] = useState('');
  const [documentTitle, setDocumentTitle] = useState('Untitled Document');
  const [activeTab, setActiveTab] = useState('editor');
  
  // Mock templates data
  const templates = [
    { id: 1, name: "Blog Post Template" },
    { id: 2, name: "Sales Page Template" },
    { id: 3, name: "Product Description Template" },
    { id: 4, name: "Newsletter Template" }
  ];
  
  const handleSave = () => {
    // In a real app, this would save to a database
    toast({
      title: "Document saved",
      description: `${documentTitle} has been saved successfully.`,
    });
  };
  
  const handleExport = () => {
    // In a real app, this would generate a download
    toast({
      title: "Document exported",
      description: "Your HTML content has been exported.",
    });
  };
  
  const formatText = (command: string) => {
    // In a real implementation, this would apply formatting to the selected text
    toast({
      title: "Formatting applied",
      description: `Applied ${command} formatting to text.`,
    });
  };
  
  const insertElement = (element: string) => {
    // In a real implementation, this would insert HTML elements
    toast({
      title: "Element inserted",
      description: `Inserted ${element} element into document.`,
    });
  };
  
  const loadTemplate = (templateId: number) => {
    // In a real implementation, this would load template content
    const template = templates.find(t => t.id === templateId);
    if (template) {
      toast({
        title: "Template loaded",
        description: `${template.name} has been loaded.`,
      });
    }
  };
  
  const updateHtmlView = () => {
    // For demo purposes, we're just using a simple HTML wrapper
    // In a real implementation, this would generate proper HTML based on the WYSIWYG content
    setHtmlCode(`<!DOCTYPE html>
<html>
<head>
  <title>${documentTitle}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; }
    .container { max-width: 800px; margin: 0 auto; padding: 20px; }
    img { max-width: 100%; height: auto; }
  </style>
</head>
<body>
  <div class="container">
    <h1>${documentTitle}</h1>
    ${editorContent || '<p>Your content will appear here...</p>'}
  </div>
</body>
</html>`);
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === 'htmlView') {
      updateHtmlView();
    }
  };

  return (
    <DashboardLayout>
      <Helmet>
        <title>HTML Editor | PLR Organizer Pro</title>
        <meta name="description" content="Create and format website content without coding skills using our intuitive HTML editor." />
      </Helmet>
      
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">HTML Editor</h1>
            <p className="text-muted-foreground">Create and format website content without coding skills</p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button onClick={handleSave}>Save</Button>
            <Button variant="outline" onClick={handleExport}>Export HTML</Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Card className="mb-6">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <Input 
                    value={documentTitle} 
                    onChange={(e) => setDocumentTitle(e.target.value)}
                    className="text-lg font-medium w-1/2"
                  />
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => formatText('undo')}>
                      <Undo className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => formatText('redo')}>
                      <Redo className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md mb-4">
                  <div className="bg-muted p-2 border-b flex flex-wrap gap-1">
                    <Button variant="ghost" size="sm" onClick={() => formatText('bold')}>
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => formatText('italic')}>
                      <Italic className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => formatText('align-left')}>
                      <AlignLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => formatText('align-center')}>
                      <AlignCenter className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => formatText('align-right')}>
                      <AlignRight className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => insertElement('link')}>
                      <Link2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => insertElement('image')}>
                      <Image className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => insertElement('table')}>
                      <FileText className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => insertElement('code')}>
                      <Code className="h-4 w-4" />
                    </Button>
                    
                    <Select>
                      <SelectTrigger className="w-[180px] h-8">
                        <SelectValue placeholder="Paragraph" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="p">Paragraph</SelectItem>
                        <SelectItem value="h1">Heading 1</SelectItem>
                        <SelectItem value="h2">Heading 2</SelectItem>
                        <SelectItem value="h3">Heading 3</SelectItem>
                        <SelectItem value="blockquote">Blockquote</SelectItem>
                        <SelectItem value="pre">Preformatted</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                    <TabsList className="grid grid-cols-2 mx-4 mt-2">
                      <TabsTrigger value="editor">Visual Editor</TabsTrigger>
                      <TabsTrigger value="htmlView">HTML Code</TabsTrigger>
                    </TabsList>
                    <TabsContent value="editor" className="p-4">
                      <Textarea 
                        value={editorContent} 
                        onChange={(e) => setEditorContent(e.target.value)}
                        placeholder="Start typing your content here..."
                        rows={15}
                        className="min-h-[300px] border-none focus-visible:ring-0 p-0"
                      />
                    </TabsContent>
                    <TabsContent value="htmlView" className="p-4">
                      <Textarea 
                        value={htmlCode} 
                        onChange={(e) => setHtmlCode(e.target.value)}
                        placeholder="HTML code will appear here..."
                        rows={15}
                        className="min-h-[300px] font-mono text-sm"
                      />
                    </TabsContent>
                  </Tabs>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
                <CardDescription>See how your content will look on different devices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md p-4 min-h-[300px] bg-white">
                  <div className="prose max-w-none">
                    <h1>{documentTitle}</h1>
                    {editorContent ? (
                      <div dangerouslySetInnerHTML={{ __html: editorContent }} />
                    ) : (
                      <p>Your content will appear here...</p>
                    )}
                  </div>
                </div>
                <div className="flex justify-center mt-4 gap-4">
                  <Button variant="outline" size="sm">Desktop View</Button>
                  <Button variant="outline" size="sm">Tablet View</Button>
                  <Button variant="outline" size="sm">Mobile View</Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Templates</CardTitle>
                <CardDescription>Start with a premade template</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {templates.map((template) => (
                    <Button 
                      key={template.id}
                      variant="outline" 
                      className="w-full justify-start" 
                      onClick={() => loadTemplate(template.id)}
                    >
                      {template.name}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>SEO Tools</CardTitle>
                <CardDescription>Optimize for search engines</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="meta-title">Meta Title</Label>
                    <Input id="meta-title" placeholder="Enter meta title..." className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="meta-description">Meta Description</Label>
                    <Textarea id="meta-description" placeholder="Enter meta description..." className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="keywords">Keywords</Label>
                    <Input id="keywords" placeholder="keyword1, keyword2..." className="mt-1" />
                  </div>
                  <Button variant="outline" className="w-full">Run SEO Analysis</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Custom CSS</CardTitle>
                <CardDescription>Add custom styling</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea 
                  placeholder="Enter custom CSS styles..." 
                  className="font-mono text-sm"
                  rows={8}
                />
                <Button className="w-full mt-4">Apply Custom CSS</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
