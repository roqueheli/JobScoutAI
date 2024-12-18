"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FileText, Plus, Trash2, Upload, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Components
import ConfirmationModal from "@/components/commons/confirmation-modal";
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
import { useToast } from "@/components/ui/use-toast";

// Services
import { skillsService } from "@/services/skills";
import { profileService } from "@/services/user-profile";

// Constants
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_RESUME_TYPES = ["application/pdf"];

// Schema
const profileSchema = z.object({
  first_name: z.string().min(2, "First name must be at least 2 characters"),
  last_name: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  role: z.enum(["APPLICANT", "ADMIN", "COMPANY_ADMIN", "INTERVIEWER"]).default("APPLICANT"),
  phone: z.string().nullable(),
  profile_picture: z.string().nullable(),
  profession: z.string().nullable(),
  location: z.string().nullable(),
  bio: z.string().nullable(),
  experience_years: z.string().nullable(),
  education: z.string().nullable(),
  languages: z.array(z.string()).default([]),
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
  skills: z.array(z.string()).default([]),
  picture: z.custom<FileList>().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function UserProfilePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const [newSkill, setNewSkill] = useState(""); // Estado para el nuevo skill
  const [skills, setSkills] = useState<string[]>([]); // Estado para la lista de skills
  const [newLanguage, setNewLanguage] = useState(""); // Estado para el nuevo idioma
  const [languages, setLanguages] = useState<string[]>([]); // Estado para la lista de idiomas
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal
  const [isDeletingResume, setIsDeletingResume] = useState(false);
  const [filteredSkills, setFilteredSkills] = useState<string[]>([]); // Sugerencias filtradas
  const [showSkillSuggestions, setShowSkillSuggestions] = useState(false); // Mostrar sugerencias

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
      languages: [],
      resume_url: null,
      linkedin_url: null,
      github_url: null,
      website: null,
      skills: [],
      is_active: true,
    },
  });

  // Helper function to handle unauthorized errors
  function isUnauthorizedError(error: unknown): error is { message: string } {
    return (
      typeof error === "object" &&
      error !== null &&
      "message" in error &&
      error.message === "Unauthorized"
    );
  }

  // Helper function to extract error messages
  function getErrorMessage(error: unknown): string {
    if (error instanceof Error) return error.message;
    if (typeof error === "object" && error !== null && "message" in error) {
      return String((error as { message: unknown }).message);
    }
    return "Failed to update profile";
  }

  // Load profile data on component mount
  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await profileService.getProfile();        
        form.reset({
          ...data,
          languages: data.languages || [],
          skills: data.skills || [],
        });
        setSkills(data.skills || []);
        setLanguages(data.languages || []);
      } catch (error) {
        if (isUnauthorizedError(error)) {
          window.location.href = "/auth/login";
          return;
        }
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

  // Handle adding a new skill
  const addSkill = (skillToAdd: string = newSkill.trim()) => {
    if (
      skillToAdd &&
      !skills.includes(skillToAdd) &&
      filteredSkills.includes(skillToAdd)
    ) {
      const updatedSkills = [...skills, skillToAdd];
      setSkills(updatedSkills);
      form.setValue("skills", updatedSkills);
      setNewSkill("");
      setFilteredSkills([]);
      setShowSkillSuggestions(false);
    } else if (!filteredSkills.includes(skillToAdd)) {
      toast({
        title: "Invalid Skill",
        description: "Please select a skill from the suggestions",
        variant: "destructive",
      });
    }
  };

  // Handle removing a skill
  const removeSkill = (skillToRemove: string) => {
    const updatedSkills = skills.filter((skill) => skill !== skillToRemove);
    setSkills(updatedSkills);
    form.setValue("skills", updatedSkills);
  };

  // Handle skill input change for suggestions
  const handleSkillInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setNewSkill(value);

    if (value.length > 0) {
      try {
        const suggestions = await skillsService.searchSkills(value); // Consultar skills desde el backend
        setFilteredSkills(
          suggestions.filter((skill) => !skills.includes(skill))
        );
        setShowSkillSuggestions(true);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch skill suggestions",
          variant: "destructive",
        });
      }
    } else {
      setFilteredSkills([]);
      setShowSkillSuggestions(false);
    }
  };

  // Handle adding a new language
  const addLanguage = () => {
    if (newLanguage && !languages.includes(newLanguage)) {
      setLanguages([...languages, newLanguage]);
      setNewLanguage(""); // Clear input
    }
  };

  // Handle removing a language
  const removeLanguage = (languageToRemove: string) => {
    setLanguages(languages.filter((language) => language !== languageToRemove));
  };

  // Handle form submission
  async function onSubmit(data: ProfileFormValues) {
    setIsSubmitting(true);

    try {
      // Handle resume upload if present
      if (data.resume && data.resume.length > 0) {
        const { resume_url } = await profileService.uploadResume(
          data.resume[0]
        );
        form.setValue("resume_url", resume_url);
      }

      // Handle profile picture upload if present
      if (data.picture && data.picture.length > 0) {
        const { url } = await profileService.uploadProfilePicture(
          data.picture[0]
        );
        form.setValue("profile_picture", url);
      }

      // Transform data for update
      const { resume, picture, ...updateData } = data;

      const transformedData = {
        ...updateData,
        phone: data.phone || undefined,
        profile_picture: data.profile_picture || undefined,
        profession: data.profession || undefined,
        location: data.location || undefined,
        bio: data.bio || undefined,
        experience_years: data.experience_years || undefined,
        education: data.education || undefined,
        languages: languages || [],
        resume_url: form.getValues("resume_url") || undefined,
        linkedin_url: data.linkedin_url || undefined,
        github_url: data.github_url || undefined,
        website: data.website || undefined,
        skills: skills || [],
      };

      const updatedProfile = await profileService.updateProfile(
        transformedData
      );
      form.reset(updatedProfile);
      setSkills(updatedProfile.skills || []);
      setLanguages(updatedProfile.languages || []);

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: getErrorMessage(error),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleResumeDelete = () => {
    setIsModalOpen(true); // Abre el modal
  };

  // Handle deleting the resume
  const confirmDeleteResume = async () => {
    setIsDeletingResume(true);
    try {
      await profileService.deleteResume();
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
    } finally {
      setIsDeletingResume(false);
      setIsModalOpen(false);
    }
  };

  // Handle downloading the resume
  const handleDownloadResume = async () => {
    try {
      const blob = await profileService.downloadResume();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `resume-${form.getValues("first_name")}-${form.getValues(
        "last_name"
      )}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download resume",
        variant: "destructive",
      });
    }
  };

  // Handle uploading the profile picture
  const handleProfilePictureUpload = async (file: File) => {
    if (!file) {
      toast({
        title: "Error",
        description: "No file selected",
        variant: "destructive",
      });
      return;
    }

    try {
      const { url } = await profileService.uploadProfilePicture(file);
      form.setValue("profile_picture", url);
      toast({
        title: "Success",
        description: "Profile picture uploaded successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload profile picture",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Icons.spinner className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Form {...form}>
        <div className="container py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  My Profile
                </h1>
                <p className="text-muted-foreground">
                  Manage your personal information
                </p>
              </div>

              <Button
                onClick={form.handleSubmit(onSubmit)}
                disabled={isSubmitting || !form.formState.isDirty}
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
                          alt={`${form.getValues(
                            "first_name"
                          )} ${form.getValues("last_name")}`}
                        />
                        <AvatarFallback delayMs={200}>
                          {form.getValues("first_name")?.[0]}
                          {form.getValues("last_name")?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <Button
                        variant="outline"
                        onClick={() =>
                          document.getElementById("file-input")?.click()
                        }
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Photo
                      </Button>
                      <Input
                        id="file-input"
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={(e) => {
                          const files = e.target.files;
                          if (files && files.length > 0) {
                            handleProfilePictureUpload(files[0]);
                          } else {
                            toast({
                              title: "Error",
                              description: "No file selected",
                              variant: "destructive",
                            });
                          }
                        }}
                      />
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
              {/* Languages Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Languages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <div className="flex gap-2">
                      <Input
                        value={newLanguage}
                        onChange={(e) => setNewLanguage(e.target.value)}
                        placeholder="Add a language..."
                        onKeyPress={(e) => e.key === "Enter" && addLanguage()}
                      />
                      <Button onClick={addLanguage}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {languages.map((language) => (
                        <Badge
                          key={language}
                          variant="secondary"
                          className="gap-1 pr-1"
                        >
                          {language}
                          <button
                            onClick={() => removeLanguage(language)}
                            className="ml-2 hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* Skills Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <div className="flex gap-2">
                      <Input
                        value={newSkill}
                        onChange={handleSkillInputChange}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (newSkill.length > 0) {
                            setShowSkillSuggestions(true);
                          }
                        }}
                        placeholder="Add a skill..."
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addSkill();
                          }
                        }}
                      />
                      <Button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          addSkill();
                        }}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    {showSkillSuggestions && filteredSkills.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-background border rounded-md shadow-lg">
                        <div className="py-1">
                          {filteredSkills.map((suggestion) => (
                            <button
                              key={suggestion} // Asegúrate de que esto sea único
                              className="w-full text-left px-4 py-2 hover:bg-accent"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                addSkill(suggestion);
                              }}
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {/* {skills.map((skill) => (
                        <Badge
                          key={skill} // Asegúrate de que esto sea único
                          variant="secondary"
                          className="gap-1 pr-1"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              removeSkill(skill);
                            }}
                            className="ml-2 hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))} */}
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
                          onClick={handleDownloadResume}
                        >
                          Download
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleResumeDelete} // Abre el modal
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
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDeleteResume}
        title="Confirm Delete"
        message="Are you sure you want to delete your resume?"
        isConfirming={isDeletingResume}
      />
    </>
  );
}
