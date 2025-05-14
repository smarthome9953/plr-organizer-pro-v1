
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { blogCategories } from "@/data/blog-data";

export default function BlogCategories() {
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      
      <div className="flex overflow-x-auto pb-2 space-x-2">
        <Link 
          to="/blog"
          onClick={() => setActiveCategory("all")}
          className={`px-4 py-2 rounded-md whitespace-nowrap ${
            activeCategory === "all" 
              ? "bg-primary text-primary-foreground" 
              : "bg-secondary hover:bg-secondary/80"
          }`}
        >
          All Posts
        </Link>
        
        {blogCategories.map((category) => (
          <Link
            key={category.slug}
            to={`/blog/${category.slug}`}
            onClick={() => setActiveCategory(category.slug)}
            className={`px-4 py-2 rounded-md whitespace-nowrap ${
              activeCategory === category.slug 
                ? "bg-primary text-primary-foreground" 
                : "bg-secondary hover:bg-secondary/80"
            }`}
          >
            {category.name}
          </Link>
        ))}
      </div>

      {/* Category Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {blogCategories.map((category) => (
          <Card key={category.slug} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <h3 className="font-bold text-lg mb-2">{category.name}</h3>
              <p className="text-muted-foreground text-sm mb-4">{category.description}</p>
              <Link 
                to={`/blog/${category.slug}`}
                className="text-primary font-medium text-sm hover:underline"
              >
                View Articles &rarr;
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
