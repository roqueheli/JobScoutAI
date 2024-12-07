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
import { Bell, Building, CheckCircle2, Clock, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// This would typically come from your API
const NOTIFICATIONS = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  type: ["application_status", "interview", "offer", "message"][
    Math.floor(Math.random() * 4)
  ],
  title: i % 2 === 0 ? "Application Status Update" : "Interview Invitation",
  message:
    i % 2 === 0
      ? "Your application for Senior Frontend Developer at TechCorp has moved to the next stage."
      : "You've been invited for an interview for the Product Designer position at DesignStudio.",
  company: {
    name: i % 2 === 0 ? "TechCorp" : "DesignStudio",
    logo: `https://images.unsplash.com/photo-${
      i % 2 === 0 ? "1611162617474-5b21e879e113" : "1680795456548-92f85b44f7c7"
    }?q=80&w=100&auto=format&fit=crop`,
  },
  date: "2024-03-15",
  read: i > 5,
  actionRequired: i < 3,
}));

const NOTIFICATION_STYLES = {
  application_status:
    "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100",
  interview:
    "bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100",
  offer: "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100",
  message:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100",
};

const NOTIFICATION_LABELS = {
  application_status: "Application Update",
  interview: "Interview",
  offer: "Job Offer",
  message: "New Message",
};

export default function NotificationsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNotifications = NOTIFICATIONS.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(NOTIFICATIONS.length / itemsPerPage);

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
              Stay updated on your job applications and opportunities
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => console.log("Mark all as read")}
          >
            Mark all as read
          </Button>
        </div>

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
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={notification.company.logo}
                      alt={notification.company.name}
                    />
                    <AvatarFallback>
                      {notification.company.name[0]}
                    </AvatarFallback>
                  </Avatar>
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
                            {
                              NOTIFICATION_LABELS[
                                notification.type as keyof typeof NOTIFICATION_LABELS
                              ]
                            }
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <Building className="h-4 w-4" />
                            {notification.company.name}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {notification.date}
                          </span>
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
                          onClick={() => deleteNotification(notification.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="mt-2 text-sm">{notification.message}</p>
                    {notification.actionRequired && (
                      <div className="mt-4">
                        <Button size="sm" asChild>
                          <Link href="/applications">View Application</Link>
                        </Button>
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

          {NOTIFICATIONS.length > itemsPerPage && (
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
      </div>
    </div>
  );
}
