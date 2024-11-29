"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Upload, X } from "lucide-react";
import { useState } from "react";

// This would typically come from your API
const COMPANY_PROFILE = {
  name: "TechCorp",
  logo: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=100&auto=format&fit=crop",
  website: "https://techcorp.com",
  industry: "Technology",
  founded: "2010",
  size: "1000+",
  location: "San Francisco, CA",
  description:
    "Leading technology company focused on innovation and building cutting-edge solutions for enterprise clients worldwide. Our mission is to transform businesses through technology.",
  benefits: [
    "Remote Work Options",
    "Health Insurance",
    "401(k) Matching",
    "Professional Development",
    "Flexible Hours",
    "Stock Options",
    "Gym Membership",
    "Annual Retreats",
  ],
  culture: [
    "Innovation-driven",
    "Collaborative Environment",
    "Work-Life Balance",
    "Diversity & Inclusion",
    "Continuous Learning",
  ],
  socialLinks: {
    linkedin: "https://linkedin.com/company/techcorp",
    twitter: "https://twitter.com/techcorp",
    github: "https://github.com/techcorp",
  },
  techStack: [
    "React",
    "Node.js",
    "Python",
    "AWS",
    "Docker",
    "Kubernetes",
    "TypeScript",
    "GraphQL",
  ],
};

export default function CompanyProfilePage() {
  const [benefits, setBenefits] = useState(COMPANY_PROFILE.benefits);
  const [newBenefit, setNewBenefit] = useState("");
  const [culture, setCulture] = useState(COMPANY_PROFILE.culture);
  const [newCultureValue, setNewCultureValue] = useState("");
  const [techStack, setTechStack] = useState(COMPANY_PROFILE.techStack);
  const [newTech, setNewTech] = useState("");

  const handleSave = () => {
    // Here you would typically make an API call to save the profile
    console.log("Saving profile...");
  };

  const addBenefit = () => {
    if (newBenefit.trim()) {
      setBenefits([...benefits, newBenefit.trim()]);
      setNewBenefit("");
    }
  };

  const removeBenefit = (index: number) => {
    setBenefits(benefits.filter((_, i) => i !== index));
  };

  const addCultureValue = () => {
    if (newCultureValue.trim()) {
      setCulture([...culture, newCultureValue.trim()]);
      setNewCultureValue("");
    }
  };

  const removeCultureValue = (index: number) => {
    setCulture(culture.filter((_, i) => i !== index));
  };

  const addTech = () => {
    if (newTech.trim()) {
      setTechStack([...techStack, newTech.trim()]);
      setNewTech("");
    }
  };

  const removeTech = (index: number) => {
    setTechStack(techStack.filter((_, i) => i !== index));
  };

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Company Profile
            </h1>
            <p className="text-muted-foreground">
              Manage your company information and employer brand
            </p>
          </div>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>

        <div className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src={COMPANY_PROFILE.logo}
                    alt={COMPANY_PROFILE.name}
                  />
                  <AvatarFallback>{COMPANY_PROFILE.name[0]}</AvatarFallback>
                </Avatar>
                <Button variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Logo
                </Button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Company Name</label>
                  <Input defaultValue={COMPANY_PROFILE.name} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Website</label>
                  <Input defaultValue={COMPANY_PROFILE.website} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Industry</label>
                  <Input defaultValue={COMPANY_PROFILE.industry} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Founded</label>
                  <Input defaultValue={COMPANY_PROFILE.founded} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Company Size</label>
                  <Input defaultValue={COMPANY_PROFILE.size} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <Input defaultValue={COMPANY_PROFILE.location} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  defaultValue={COMPANY_PROFILE.description}
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card>
            <CardHeader>
              <CardTitle>Benefits & Perks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Add a benefit..."
                  value={newBenefit}
                  onChange={(e) => setNewBenefit(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addBenefit()}
                />
                <Button onClick={addBenefit}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {benefits.map((benefit, index) => (
                  <Badge key={index} variant="secondary" className="gap-1">
                    {benefit}
                    <button
                      onClick={() => removeBenefit(index)}
                      className="ml-1 hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Company Culture */}
          <Card>
            <CardHeader>
              <CardTitle>Company Culture</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Add a culture value..."
                  value={newCultureValue}
                  onChange={(e) => setNewCultureValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addCultureValue()}
                />
                <Button onClick={addCultureValue}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {culture.map((value, index) => (
                  <Badge key={index} variant="secondary" className="gap-1">
                    {value}
                    <button
                      onClick={() => removeCultureValue(index)}
                      className="ml-1 hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tech Stack */}
          <Card>
            <CardHeader>
              <CardTitle>Tech Stack</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Add a technology..."
                  value={newTech}
                  onChange={(e) => setNewTech(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addTech()}
                />
                <Button onClick={addTech}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech, index) => (
                  <Badge key={index} variant="outline" className="gap-1">
                    {tech}
                    <button
                      onClick={() => removeTech(index)}
                      className="ml-1 hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Social Links */}
          <Card>
            <CardHeader>
              <CardTitle>Social Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">LinkedIn</label>
                  <Input defaultValue={COMPANY_PROFILE.socialLinks.linkedin} />
                </div>
                <div className="space-y-2">
                  {/* <boltAction type="file" filePath="app/company/profile/page.tsx"> */}
                  <label className="text-sm font-medium">Twitter</label>
                  <Input defaultValue={COMPANY_PROFILE.socialLinks.twitter} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">GitHub</label>
                  <Input defaultValue={COMPANY_PROFILE.socialLinks.github} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
