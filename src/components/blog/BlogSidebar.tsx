
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { blogPosts } from "@/data/blog-data";

export default function BlogSidebar() {
  const [email, setEmail] = useState("");
  
  // Get most popular posts (normally this would be based on view count)
  const popularPosts = [...blogPosts].sort(() => 0.5 - Math.random()).slice(0, 5);
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle subscription logic here
    console.log("Subscribing:", email);
    alert("Thanks for subscribing!");
    setEmail("");
  };
  
  return (
    <aside className="space-y-8">
      {/* Email Subscription */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Subscribe to Our Newsletter</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Get the latest PLR organization tips and exclusive content delivered to your inbox.
          </p>
          <form onSubmit={handleSubscribe}>
            <div className="flex flex-col space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="border rounded px-3 py-2 w-full"
              />
              <Button type="submit" className="w-full">Subscribe</Button>
            </div>
          </form>
        </CardContent>
      </Card>
      
      {/* Popular Posts */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Popular Posts</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <ul className="space-y-4">
            {popularPosts.map((post) => (
              <li key={post.id}>
                <Link 
                  to={`/blog/${post.category.slug}/${post.slug}`}
                  className="flex items-start gap-3 group"
                >
                  <div className="w-16 h-16 flex-shrink-0">
                    <img 
                      src={post.coverImage} 
                      alt={post.title} 
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div>
                    <h5 className="font-medium group-hover:text-primary line-clamp-2">{post.title}</h5>
                    <p className="text-xs text-muted-foreground">{post.publishDate}</p>
                  </div>
                </Link>
                {popularPosts.indexOf(post) < popularPosts.length - 1 && (
                  <Separator className="mt-4" />
                )}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      
      {/* Product Promotion */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-4">
          <h4 className="font-bold text-base mb-2">Organize Your PLR Content</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Stop wasting time searching for your PLR files. Try PLR Organizer Pro today!
          </p>
          <Link to="/dashboard">
            <Button size="sm" className="w-full">Try For Free</Button>
          </Link>
        </CardContent>
      </Card>
    </aside>
  );
}
