"use client";

import { ResumeForm } from "@/components/misc/resume-builder/resume-form";
import { ResumePreview } from "@/components/misc/resume-builder/resume-preview";
import { ResumeTips } from "@/components/misc/resume-builder/resume-tips";
import { useState } from "react";

export interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
  };
  experience: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  education: Array<{
    school: string;
    degree: string;
    field: string;
    graduationDate: string;
  }>;
  skills: string[];
}

const initialResumeData: ResumeData = {
  personalInfo: {
    name: "",
    email: "",
    phone: "",
    location: "",
  },
  experience: [],
  education: [],
  skills: [],
};

export default function ResumeBuilderPage() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Resume Builder</h1>
          <p className="text-muted-foreground">
            Create a professional resume in minutes
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-8">
            <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />
            <ResumeTips />
          </div>
          <div className="lg:sticky lg:top-8 lg:h-[calc(100vh-8rem)]">
            <ResumePreview resumeData={resumeData} />
          </div>
        </div>
      </div>
    </div>
  );
}
