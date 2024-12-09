"use client";

import { Icons } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { useToast } from "@/components/ui/use-toast";
import { profileService } from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileText, Trash2, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_RESUME_TYPES = ["application/pdf"];

const profileSchema = z.object({
  first_name: z.string().min(2, "First name must be at least 2 characters"),
  last_name: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  role: z
    .enum(["ADMIN", "COMPANY_ADMIN", "INTERVIEWER", "APPLICANT"])
    .default("APPLICANT"),
  phone: z.string().nullable(),
  profile_picture: z.string().nullable(),
  profession: z.string().nullable(),
  location: z.string().nullable(),
  bio: z.string().nullable(),
  experience_years: z.string().nullable(),
  education: z.string().nullable(),
  languages: z.string().nullable(),
  resume_url: z.string().nullable(),
  linkedin_url: z.string().url().nullable(),
  github_url: z.string().url().nullable(),
  website: z.string().url().nullable(),
  is_active: z.boolean().default(true),
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
      "Only PDF files are accepted"
    )
    .optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function UserProfilePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      role: "APPLICANT",
      phone: null,
      profile_picture: null,
      profession: null,
      location: null,
      bio: null,
      experience_years: null,
      education: null,
      languages: null,
      resume_url: null,
      linkedin_url: null,
      github_url: null,
      website: null,
      is_active: true,
    },
  });

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await profileService.getProfile(); // Pass the token to the service
        form.reset(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load profile data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }

    loadProfile();
  }, [form, toast]);

  const handleResumeDelete = async () => {
    try {
      await profileService.deleteResume(); // Pass the token to the service
      form.setValue("resume_url", null);
      toast({
        title: "Success",
        description: "Resume deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete resume",
        variant: "destructive",
      });
    }
  };

  async function onSubmit(data: ProfileFormValues) {
    setIsSubmitting(true);
    try {
      // Handle resume upload if present
      if (data.resume && data.resume.length > 0) {
        const { resume_url } = await profileService.uploadResume(
          data.resume[0]
        );
        data.resume_url = resume_url;
      } // Transformar los datos para eliminar nulls

      const { resume, ...updateData } = data;
      const transformedData = {
        ...updateData,
        phone: data.phone || undefined,
        profile_picture: data.profile_picture || undefined,
        profession: data.profession || undefined,
        location: data.location || undefined,
        bio: data.bio || undefined,
        experience_years: data.experience_years || undefined,
        education: data.education || undefined,
        languages: data.languages || undefined,
        resume_url: data.resume_url || undefined,
        linkedin_url: data.linkedin_url || undefined,
        github_url: data.github_url || undefined,
        website: data.website || undefined,
      };

      await profileService.updateProfile(transformedData); // Pass the token to the service
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Icons.spinner className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <Form {...form}>
      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
              <p className="text-muted-foreground">
                Manage your personal information
              </p>
            </div>

            <Button
              onClick={form.handleSubmit(onSubmit)}
              disabled={isSubmitting}
            >
              {isSubmitting && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Save Changes
            </Button>
          </div>
          <div className="space-y-8">
            {/* Basic Information Card */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="flex items-center gap-6">
                    <Avatar className="h-24 w-24">
                      <AvatarImage
                        src={form.getValues("profile_picture") || ""}
                        alt={`${form.getValues("first_name")} ${form.getValues(
                          "last_name"
                        )}`}
                      />
                      <AvatarFallback>
                        {form.getValues("first_name")?.[0]}

                        {form.getValues("last_name")?.[0]}
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
                      name="first_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="last_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
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
                            <Input {...field} value={field.value || ""} />
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
                          <Textarea
                            {...field}
                            value={field.value || ""}
                            className="min-h-[100px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
            {/* Professional Information Card */}

            <Card>
              <CardHeader>
                <CardTitle>Professional Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="profession"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Profession</FormLabel>
                          <FormControl>
                            <Input {...field} value={field.value || ""} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="experience_years"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Years of Experience</FormLabel>
                          <FormControl>
                            <Input {...field} value={field.value || ""} />
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
                            <Input {...field} value={field.value || ""} />
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
                            <Input {...field} value={field.value || ""} />
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
                            <Input {...field} value={field.value || ""} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Online Presence Card */}
            <Card>
              <CardHeader>
                <CardTitle>Online Presence</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Personal Website</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="url"
                              value={field.value || ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="linkedin_url"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>LinkedIn</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="url"
                              value={field.value || ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="github_url"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>GitHub</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="url"
                              value={field.value || ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Resume Card */}
            <Card>
              <CardHeader>
                <CardTitle>Resume</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {form.getValues("resume_url") ? (
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Current Resume</p>
                        <p className="text-sm text-muted-foreground">
                          PDF Document
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          window.open(
                            form.getValues("resume_url") || "",
                            "_blank"
                          )
                        }
                      >
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
                              accept=".pdf"
                              onChange={(e) => onChange(e.target.files)}
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormDescription>
                          Upload your resume (PDF only, max 5MB)
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
    </Form>
  );
}
