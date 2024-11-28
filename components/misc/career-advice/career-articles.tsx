"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const articles = [
  {
    title: "10 Essential Skills for Remote Work Success",
    excerpt:
      "Learn the key skills needed to thrive in a remote work environment...",
    author: {
      name: "Emma Wilson",
      avatar: "https://i.pravatar.cc/150?u=emma",
      role: "Career Coach",
    },
    category: "Remote Work",
    readTime: "5 min read",
    href: "/career-advice/articles/remote-work-skills",
  },
  {
    title: "Negotiating Your Tech Salary: A Complete Guide",
    excerpt:
      "Master the art of salary negotiation with these proven strategies...",
    author: {
      name: "David Chen",
      avatar: "https://i.pravatar.cc/150?u=david",
      role: "Tech Recruiter",
    },
    category: "Negotiation",
    readTime: "8 min read",
    href: "/career-advice/articles/salary-negotiation",
  },
];

export function CareerArticles() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">Featured Articles</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {articles.map((article) => (
          <Link key={article.title} href={article.href}>
            <Card className="hover:bg-muted/50 transition-colors h-full">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge>{article.category}</Badge>
                  <span className="text-sm text-muted-foreground">
                    {article.readTime}
                  </span>
                </div>
                <CardTitle className="line-clamp-2">{article.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage
                      src={article.author.avatar}
                      alt={article.author.name}
                    />
                    <AvatarFallback>
                      {article.author.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{article.author.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {article.author.role}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
