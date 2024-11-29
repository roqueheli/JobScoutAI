"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useState } from "react";

// This would typically come from your API based on the job ID
const MOCK_APPLICANTS = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Applicant ${i + 1}`,
  email: `applicant${i + 1}@example.com`,
  avatar: `https://i.pravatar.cc/150?u=${i + 1}`,
  appliedDate: "2024-03-15",
  stage: ["Applied", "Screening", "Interview", "Offer", "Scheduled"][
    Math.floor(Math.random() * 5)
  ],
  experience: `${Math.floor(Math.random() * 10) + 1} years`,
  match: Math.floor(Math.random() * 30) + 70,
}));

const STAGE_STYLES = {
  Applied: "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100",
  Screening:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100",
  Interview:
    "bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100",
  Offer: "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100",
  Scheduled: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100",
};

interface JobApplicantsListProps {
  jobId: number;
}

export function JobApplicantsList({ jobId }: JobApplicantsListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentApplicants = MOCK_APPLICANTS.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(MOCK_APPLICANTS.length / itemsPerPage);

  const handleStageChange = (applicantId: number, newStage: string) => {
    // Here you would typically update the applicant's stage via API
    console.log(`Updating applicant ${applicantId} stage to ${newStage}`);
  };

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Applicant</TableHead>
            <TableHead>Stage</TableHead>
            <TableHead>Experience</TableHead>
            <TableHead>Match</TableHead>
            <TableHead>Applied</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentApplicants.map((applicant) => (
            <TableRow key={applicant.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={applicant.avatar} alt={applicant.name} />
                    <AvatarFallback>{applicant.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{applicant.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {applicant.email}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Select
                  defaultValue={applicant.stage}
                  onValueChange={(value) =>
                    handleStageChange(applicant.id, value)
                  }
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue>
                      <Badge
                        className={
                          STAGE_STYLES[
                            applicant.stage as keyof typeof STAGE_STYLES
                          ]
                        }
                      >
                        {applicant.stage}
                      </Badge>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Applied">Applied</SelectItem>
                    <SelectItem value="Screening">Screening</SelectItem>
                    <SelectItem value="Interview">Interview</SelectItem>
                    <SelectItem value="Scheduled">Scheduled</SelectItem>
                    <SelectItem value="Offer">Offer</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>{applicant.experience}</TableCell>
              <TableCell>
                <Badge variant="secondary">{applicant.match}% match</Badge>
              </TableCell>
              <TableCell>{applicant.appliedDate}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">
                  View Profile
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

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

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
          ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) setCurrentPage(currentPage + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
