"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertTriangle,
  Bell,
  Calendar,
  CheckCircle2,
  Clock,
  Star,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

// This would typically come from your API
const NOTIFICATIONS = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  type: [
    "application",
    "candidate_update",
    "job_alert",
    "team_action",
    "system",
  ][Math.floor(Math.random() * 5)],
  priority: ["high", "medium", "low"][Math.floor(Math.random() * 3)],
  title: [
    "New Application Received",
    "Candidate Updated Profile",
    "Job Post Expiring Soon",
    "Team Member Action Required",
    "System Update",
  ][Math.floor(Math.random() * 5)],
  message:
    i % 2 === 0
      ? "Sarah Johnson has applied for the Senior Frontend Developer position."
      : "The job posting for Product Designer will expire in 2 days.",
  candidate:
    i % 2 === 0
      ? {
          id: 19,
          name: "Sarah Johnson",
          avatar:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
          matchScore: 85,
        }
      : null,
  job: {
    title: i % 2 === 0 ? "Senior Frontend Developer" : "Product Designer",
    id: i + 100,
  },
  date: "2024-03-15",
  read: i > 5,
  actionRequired: i < 3,
}));

const NOTIFICATION_STYLES = {
  application: "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100",
  candidate_update:
    "bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100",
  job_alert:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100",
  team_action:
    "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100",
  system: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100",
};

const PRIORITY_ICONS = {
  high: AlertTriangle,
  medium: Clock,
  low: Bell,
};

export default function CompanyNotificationsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("all");
  const itemsPerPage = 5;
  const router = useRouter();

  const filteredNotifications = NOTIFICATIONS.filter((notification) => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return !notification.read;
    if (activeTab === "action_required") return notification.actionRequired;
    return notification.type === activeTab;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNotifications = filteredNotifications.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);

  const markAsRead = (notificationId: number) => {
    // Here you would typically make an API call to mark the notification as read
    console.log(`Marking notification ${notificationId} as read`);
  };

  const deleteNotification = (notificationId: number) => {
    // Here you would typically make an API call to delete the notification
    console.log(`Deleting notification ${notificationId}`);
  };

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
            <p className="text-muted-foreground">
              Stay updated on applications, candidates, and job postings
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => console.log("Mark all as read")}
            >
              Mark all as read
            </Button>
            <Button onClick={() => router.push("/settings/company")} variant="outline" className="gap-2">
              <Bell className="h-4 w-4" />
              Notification Settings
            </Button>
          </div>
        </div>

        <Tabs
          defaultValue="all"
          className="space-y-6"
          onValueChange={setActiveTab}
        >
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="action_required">Action Required</TabsTrigger>
            <TabsTrigger value="application">Applications</TabsTrigger>
            <TabsTrigger value="candidate_update">
              Candidate Updates
            </TabsTrigger>
            <TabsTrigger value="job_alert">Job Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            <div className="space-y-4">
              {currentNotifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={`hover:shadow-md transition-shadow ${
                    !notification.read ? "border-l-4 border-l-primary" : ""
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      {notification.candidate ? (
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={notification.candidate.avatar}
                            alt={notification.candidate.name}
                          />
                          <AvatarFallback>
                            {notification.candidate.name[0]}
                          </AvatarFallback>
                        </Avatar>
                      ) : (
                        <div className="h-12 w-12 flex items-center justify-center rounded-full bg-muted">
                          {notification.type === "job_alert" ? (
                            <Calendar className="h-6 w-6" />
                          ) : (
                            <User className="h-6 w-6" />
                          )}
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">
                                {notification.title}
                              </h3>
                              {!notification.read && (
                                <Badge variant="secondary">New</Badge>
                              )}
                              <Badge
                                className={
                                  NOTIFICATION_STYLES[
                                    notification.type as keyof typeof NOTIFICATION_STYLES
                                  ]
                                }
                              >
                                {notification.type.replace("_", " ")}
                              </Badge>
                              {notification.priority === "high" && (
                                <Badge variant="destructive">
                                  High Priority
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {notification.date}
                              </span>
                              {notification.candidate && (
                                <span className="flex items-center gap-1">
                                  <Star className="h-4 w-4 text-yellow-500" />
                                  {notification.candidate.matchScore}% match
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => markAsRead(notification.id)}
                              >
                                <CheckCircle2 className="h-4 w-4" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                deleteNotification(notification.id)
                              }
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="mt-2 text-sm">{notification.message}</p>
                        {notification.actionRequired && (
                          <div className="mt-4 flex gap-2">
                            <Button size="sm" asChild>
                              <Link
                                href={`/company/jobs/${notification.job.id}`}
                              >
                                View Job
                              </Link>
                            </Button>
                            {notification.candidate && (
                              <Button size="sm" variant="outline" asChild>
                                <Link
                                  href={`/company/candidates/${notification.candidate.id}`}
                                >
                                  View Candidate
                                </Link>
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {currentNotifications.length === 0 && (
                <div className="text-center py-12">
                  <Bell className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No notifications</h3>
                  <p className="text-muted-foreground">
                    You're all caught up! Check back later for updates.
                  </p>
                </div>
              )}

              {filteredNotifications.length > itemsPerPage && (
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage > 1) setCurrentPage(currentPage - 1);
                        }}
                      />
                    </PaginationItem>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <PaginationItem key={page}>
                          <PaginationLink
                            href="#"
                            isActive={currentPage === page}
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(page);
                            }}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    )}

                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage < totalPages)
                            setCurrentPage(currentPage + 1);
                        }}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
