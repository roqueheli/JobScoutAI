"use client";

import { SettingsHeader } from "@/components/commons/settings/settings-header";
import { Button } from "@/components/ui/button";
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
import { useForm } from "react-hook-form";
import * as z from "zod";

const companyFormSchema = z.object({
  companyName: z
    .string()
    .min(2, { message: "Company name must be at least 2 characters." })
    .max(100, {
      message: "Company name must not be longer than 100 characters.",
    }),
  website: z.string().url({ message: "Please enter a valid URL." }).optional(),
  description: z
    .string()
    .max(1000, {
      message: "Description must not be longer than 1000 characters.",
    })
    .optional(),
  industry: z.string().min(2, { message: "Please select an industry." }),
  location: z.string().min(2, { message: "Please enter a location." }),
});

type CompanyFormValues = z.infer<typeof companyFormSchema>;

export default function CompanySettings() {
  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      companyName: "",
      website: "",
      description: "",
      industry: "",
      location: "",
    },
  });

  function onSubmit(data: CompanyFormValues) {
    console.log(data);
    // Handle form submission
  }

  return (
    <div className="space-y-6">
      <SettingsHeader
        title="Company Profile"
        description="Manage your company's public information and settings."
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter company name" {...field} />
                </FormControl>
                <FormDescription>Your company's official name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com" {...field} />
                </FormControl>
                <FormDescription>Your company's website URL.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your company"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Brief description of your company and what you do.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Industry</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Technology, Healthcare" {...field} />
                </FormControl>
                <FormDescription>
                  The primary industry your company operates in.
                </FormDescription>
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
                  <Input placeholder="City, Country" {...field} />
                </FormControl>
                <FormDescription>
                  Your company's primary location.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Save changes</Button>
        </form>
      </Form>
    </div>
  );
}
