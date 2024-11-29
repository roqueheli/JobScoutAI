"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { SettingsHeader } from "@/components/commons/settings/settings-header";

const notificationsFormSchema = z.object({
  applicationUpdates: z.boolean(),
  newMessages: z.boolean(),
  jobRecommendations: z.boolean(),
  marketingEmails: z.boolean(),
  securityAlerts: z.boolean(),
  // Company admin specific notifications
  newApplications: z.boolean().optional(),
  interviewReminders: z.boolean().optional(),
  teamUpdates: z.boolean().optional(),
});

type NotificationsFormValues = z.infer<typeof notificationsFormSchema>;

export default function NotificationsSettings() {
  const isCompanyAdmin = true; // Replace with actual auth logic

  const form = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues: {
      applicationUpdates: true,
      newMessages: true,
      jobRecommendations: true,
      marketingEmails: false,
      securityAlerts: true,
      newApplications: true,
      interviewReminders: true,
      teamUpdates: true,
    },
  });

  function onSubmit(data: NotificationsFormValues) {
    console.log(data);
    // Handle form submission
  }

  return (
    <div className="space-y-6">
      <SettingsHeader
        title="Notifications"
        description="Manage your notification preferences."
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div>
            <h3 className="text-lg font-medium">General Notifications</h3>
            <div className="space-y-4 mt-4">
              <FormField
                control={form.control}
                name="applicationUpdates"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Application Updates
                      </FormLabel>
                      <FormDescription>
                        Receive notifications about your job applications status
                        changes.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="newMessages"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">New Messages</FormLabel>
                      <FormDescription>
                        Get notified when you receive new messages from
                        employers.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="jobRecommendations"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Job Recommendations
                      </FormLabel>
                      <FormDescription>
                        Receive personalized job recommendations based on your
                        profile.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          {isCompanyAdmin && (
            <>
              <Separator />
              <div>
                <h3 className="text-lg font-medium">
                  Company Administrator Notifications
                </h3>
                <div className="space-y-4 mt-4">
                  <FormField
                    control={form.control}
                    name="newApplications"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            New Applications
                          </FormLabel>
                          <FormDescription>
                            Get notified when candidates apply to your job
                            postings.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="interviewReminders"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Interview Reminders
                          </FormLabel>
                          <FormDescription>
                            Receive reminders about upcoming interviews with
                            candidates.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="teamUpdates"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Team Updates
                          </FormLabel>
                          <FormDescription>
                            Get notified about team member activities and
                            updates.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </>
          )}

          <Separator />

          <div>
            <h3 className="text-lg font-medium">Other Notifications</h3>
            <div className="space-y-4 mt-4">
              <FormField
                control={form.control}
                name="marketingEmails"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Marketing Emails
                      </FormLabel>
                      <FormDescription>
                        Receive emails about new features and special offers.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="securityAlerts"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Security Alerts
                      </FormLabel>
                      <FormDescription>
                        Get important notifications about your account security.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button type="submit">Save preferences</Button>
        </form>
      </Form>
    </div>
  );
}
