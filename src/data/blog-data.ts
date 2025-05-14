
export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishDate: string;
  author: string;
  category: BlogCategory;
  coverImage: string;
  featured: boolean;
  tags: string[];
}

export const blogCategories: BlogCategory[] = [
  {
    id: "cat-1",
    name: "PLR Organization Strategies",
    slug: "organization",
    description: "Learn how to structure and organize your PLR content for maximum efficiency and accessibility."
  },
  {
    id: "cat-2",
    name: "PLR Rights & Licensing",
    slug: "rights-licensing",
    description: "Understanding the legal aspects and licensing terms associated with PLR content."
  },
  {
    id: "cat-3",
    name: "PLR Content Enhancement",
    slug: "content-enhancement",
    description: "Techniques and strategies to improve and customize PLR content for your specific needs."
  },
  {
    id: "cat-4",
    name: "PLR Monetization Strategies",
    slug: "monetization",
    description: "Discover effective ways to generate income from your PLR investments."
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: "post-1",
    title: "The Ultimate Guide to Organizing Your PLR Content Library in 2025",
    slug: "ultimate-guide-organizing-plr-content-library",
    excerpt: "Learn the best practices for structuring your PLR content library for maximum productivity and ease of use in 2025.",
    content: "Full article content here...",
    publishDate: "May 10, 2025",
    author: "Sarah Johnson",
    category: blogCategories[0],
    coverImage: "https://images.unsplash.com/photo-1586282391129-76a6df230234?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    featured: true,
    tags: ["organization", "productivity", "file management"]
  },
  {
    id: "post-2",
    title: "PLR, MRR, RR: Understanding Different Content Licenses",
    slug: "understanding-plr-mrr-rr-content-licenses",
    excerpt: "Confused about content licensing terms? This comprehensive guide breaks down the differences between PLR, MRR, and RR content.",
    content: "Full article content here...",
    publishDate: "May 8, 2025",
    author: "David Miller",
    category: blogCategories[1],
    coverImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    featured: true,
    tags: ["licensing", "legal", "content rights"]
  },
  {
    id: "post-3",
    title: "10 Ways to Make PLR Content Uniquely Yours in Under 30 Minutes",
    slug: "ways-make-plr-content-unique-under-30-minutes",
    excerpt: "Discover quick and effective techniques to transform generic PLR content into personalized material that stands out.",
    content: "Full article content here...",
    publishDate: "May 5, 2025",
    author: "Jessica Thompson",
    category: blogCategories[2],
    coverImage: "https://images.unsplash.com/photo-1516383274235-5f42d6c6412d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    featured: true,
    tags: ["customization", "content creation", "repurposing"]
  },
  {
    id: "post-4",
    title: "How to Turn a $27 PLR Package Into a $997 Digital Product",
    slug: "turn-plr-package-into-premium-digital-product",
    excerpt: "Learn the step-by-step process of transforming an affordable PLR package into a high-value digital product that sells.",
    content: "Full article content here...",
    publishDate: "May 2, 2025",
    author: "Michael Anderson",
    category: blogCategories[3],
    coverImage: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    featured: true,
    tags: ["monetization", "digital products", "marketing"]
  },
  {
    id: "post-5",
    title: "7 Folder Systems That Make PLR Content Management Effortless",
    slug: "folder-systems-for-plr-content-management",
    excerpt: "Discover seven proven folder structures that will transform your PLR content organization and save you hours of searching.",
    content: "Full article content here...",
    publishDate: "Apr 30, 2025",
    author: "Sarah Johnson",
    category: blogCategories[0],
    coverImage: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    featured: false,
    tags: ["folder structure", "organization", "productivity"]
  },
  {
    id: "post-6",
    title: "The Legal Side of PLR: What You Can and Cannot Do With Your Content",
    slug: "legal-side-of-plr-content-usage",
    excerpt: "A detailed breakdown of the legal considerations when using PLR content, including restrictions and permitted uses.",
    content: "Full article content here...",
    publishDate: "Apr 28, 2025",
    author: "David Miller",
    category: blogCategories[1],
    coverImage: "https://images.unsplash.com/photo-1593115057322-e94b77572f20?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    featured: false,
    tags: ["legal", "content rights", "compliance"]
  },
  {
    id: "post-7",
    title: "The Complete Guide to Repurposing One PLR Package Into 10 Different Content Pieces",
    slug: "repurposing-plr-package-multiple-content-pieces",
    excerpt: "Maximize your PLR investment by learning how to transform a single package into ten diverse content formats.",
    content: "Full article content here...",
    publishDate: "Apr 25, 2025",
    author: "Jessica Thompson",
    category: blogCategories[2],
    coverImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    featured: false,
    tags: ["repurposing", "content creation", "marketing"]
  },
  {
    id: "post-8",
    title: "PLR ROI Tracking: How to Calculate Your Return on PLR Investments",
    slug: "plr-roi-tracking-calculating-returns",
    excerpt: "Learn effective methods to measure and optimize the return on investment for your PLR content purchases.",
    content: "Full article content here...",
    publishDate: "Apr 23, 2025",
    author: "Michael Anderson",
    category: blogCategories[3],
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    featured: false,
    tags: ["ROI", "analytics", "business strategy"]
  }
];

// Featured posts for the carousel
export const featuredPosts = blogPosts.filter(post => post.featured);
