"use client";

import { Icons } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileText, Plus, Trash2, Upload, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_RESUME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const profileSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  profession: z.string().min(2, "Profession is required"),
  location: z.string().min(2, "Location is required"),
  bio: z.string().min(100, "Bio must be at least 100 characters"),
  experience: z.string().min(2, "Experience is required"),
  education: z.string().min(2, "Education is required"),
  languages: z.string().min(2, "Languages are required"),
  website: z.string().url().optional(),
  linkedin: z.string().url().optional(),
  github: z.string().url().optional(),
  resume: z
    .custom<FileList>()
    .refine(
      (files) => !files || files.length === 0 || files.length === 1,
      "Please upload only one file"
    )
    .refine(
      (files) => !files || files.length === 0 || files[0].size <= MAX_FILE_SIZE,
      "Max file size is 5MB"
    )
    .refine(
      (files) =>
        !files ||
        files.length === 0 ||
        ACCEPTED_RESUME_TYPES.includes(files[0].type),
      "Only PDF, DOC, and DOCX files are accepted"
    )
    .optional(),
});

// This would typically come from your API
const USER_PROFILE = {
  fullName: "John Doe",
  email: "john@example.com",
  phone: "+1 (555) 000-0000",
  avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop",
  profession: "Senior Frontend Developer",
  location: "San Francisco, CA",
  bio: "Experienced frontend developer with a passion for creating beautiful and functional user interfaces. Specialized in React and modern JavaScript frameworks.",
  experience: "8 years",
  education: "BS in Computer Science",
  languages: "English, Spanish",
  skills: [
    "React",
    "TypeScript",
    "Next.js",
    "Node.js",
    "GraphQL",
    "TailwindCSS",
  ],
  website: "https://johndoe.dev",
  linkedin: "https://linkedin.com/in/johndoe",
  github: "https://github.com/johndoe",
  currentResume: {
    name: "john-doe-resume.pdf",
    uploadedAt: "2024-02-15",
  },
};

export default function UserProfilePage() {
  const [skills, setSkills] = useState(USER_PROFILE.skills);
  const [newSkill, setNewSkill] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentResume, setCurrentResume] = useState(
    USER_PROFILE.currentResume
  );

  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: USER_PROFILE,
  });

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleResumeDelete = () => {
    setCurrentResume(null);
    form.setValue("resume", undefined);
  };

  async function onSubmit(data: z.infer<typeof profileSchema>) {
    setIsSubmitting(true);
    try {
      // Here you would typically make an API call to update the profile
      console.log(data);
      // Show success message
    } catch (error) {
      // Show error message
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
            <p className="text-muted-foreground">
              Manage your personal information and career details
            </p>
          </div>
          <Button onClick={form.handleSubmit(onSubmit)} disabled={isSubmitting}>
            {isSubmitting && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Save Changes
          </Button>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form className="space-y-8">
                  <div className="flex items-center gap-6">
                    <Avatar className="h-24 w-24">
                      <AvatarImage
                        src={USER_PROFILE.avatar}
                        alt={USER_PROFILE.fullName}
                      />
                      <AvatarFallback>
                        {USER_PROFILE.fullName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <Button variant="outline">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Photo
                    </Button>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea {...field} className="min-h-[100px]" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Professional Information</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form className="space-y-8">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="profession"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Profession</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="experience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Years of Experience</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="education"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Education</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="languages"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Languages</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Skills</label>
                    <div className="flex gap-2 mt-2">
                      <Input
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="Add a skill..."
                        onKeyPress={(e) => e.key === "Enter" && addSkill()}
                      />
                      <Button onClick={addSkill}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="gap-1 pr-1"
                        >
                          {skill}
                          <button
                            onClick={() => removeSkill(skill)}
                            className="ml-2 hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Online Presence</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form className="space-y-8">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Personal Website</FormLabel>
                          <FormControl>
                            <Input {...field} type="url" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="linkedin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>LinkedIn</FormLabel>
                          <FormControl>
                            <Input {...field} type="url" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="github"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>GitHub</FormLabel>
                          <FormControl>
                            <Input {...field} type="url" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resume</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentResume ? (
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{currentResume.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Uploaded on {currentResume.uploadedAt}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleResumeDelete}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <FormField
                  control={form.control}
                  name="resume"
                  render={({ field: { onChange, value, ...field } }) => (
                    <FormItem>
                      <FormControl>
                        <div className="grid w-full gap-4">
                          <Input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => onChange(e.target.files)}
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Upload your resume (PDF, DOC, or DOCX, max 5MB)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
