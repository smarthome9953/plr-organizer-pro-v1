
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import BlogHeader from "@/components/blog/BlogHeader";
import BlogCategories from "@/components/blog/BlogCategories";
import BlogSidebar from "@/components/blog/BlogSidebar";
import { BlogPost, blogPosts, featuredPosts } from "@/data/blog-data";

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <BlogHeader />
      
      <main className="container mx-auto px-4 py-8">
        {/* Featured Posts Carousel */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Featured Articles</h2>
          <Carousel className="w-full">
            <CarouselContent>
              {featuredPosts.map((post) => (
                <CarouselItem key={post.id} className="md:basis-1/2 lg:basis-1/3">
                  <Link to={`/blog/${post.category.slug}/${post.slug}`}>
                    <Card className="h-full">
                      <CardHeader className="p-0">
                        <AspectRatio ratio={16/9}>
                          <img 
                            src={post.coverImage} 
                            alt={post.title} 
                            className="object-cover w-full h-full rounded-t-lg"
                          />
                        </AspectRatio>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <p className="text-sm text-primary font-medium">{post.category.name}</p>
                        <CardTitle className="mt-2 line-clamp-2">{post.title}</CardTitle>
                        <CardDescription className="mt-2 line-clamp-3">{post.excerpt}</CardDescription>
                      </CardContent>
                      <CardFooter className="flex justify-between border-t pt-4 text-sm text-muted-foreground">
                        <span>{post.author}</span>
                        <span>{post.publishDate}</span>
                      </CardFooter>
                    </Card>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        </section>

        {/* Search and Categories Section */}
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="w-full md:w-3/4">
            {/* Search Bar */}
            <div className="relative mb-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 py-2 border rounded-md"
              />
            </div>

            {/* Categories */}
            <BlogCategories />

            {/* Recent Posts */}
            <section className="mt-12">
              <h2 className="text-2xl font-bold mb-4">Recent Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {blogPosts.slice(0, 6).map((post) => (
                  <Link key={post.id} to={`/blog/${post.category.slug}/${post.slug}`}>
                    <Card className="h-full hover:shadow-md transition-shadow">
                      <AspectRatio ratio={16/9}>
                        <img 
                          src={post.coverImage} 
                          alt={post.title} 
                          className="object-cover w-full h-full rounded-t-lg"
                        />
                      </AspectRatio>
                      <CardContent className="pt-4">
                        <p className="text-sm text-primary font-medium">{post.category.name}</p>
                        <h3 className="text-lg font-semibold mt-2 line-clamp-2">{post.title}</h3>
                        <p className="text-muted-foreground mt-2 line-clamp-3">{post.excerpt}</p>
                      </CardContent>
                      <CardFooter className="flex justify-between border-t pt-4 text-sm text-muted-foreground">
                        <span>{post.author}</span>
                        <span>{post.publishDate}</span>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>
              <div className="flex justify-center mt-8">
                <Button variant="outline">Load More Articles</Button>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="w-full md:w-1/4">
            <BlogSidebar />
          </div>
        </div>
      </main>
    </div>
  );
}
