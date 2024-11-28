"use client";

import { ResumeData } from "@/app/misc/resume-builder/page";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Mail, MapPin, Phone } from "lucide-react";

interface ResumePreviewProps {
  resumeData: ResumeData;
}

export function ResumePreview({ resumeData }: ResumePreviewProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Preview</h2>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
      </div>

      <Card className="p-8">
        <CardContent className="p-0 space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">
              {resumeData.personalInfo.name}
            </h1>
            <div className="flex flex-wrap gap-4 text-muted-foreground">
              {resumeData.personalInfo.email && (
                <div className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  {resumeData.personalInfo.email}
                </div>
              )}
              {resumeData.personalInfo.phone && (
                <div className="flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  {resumeData.personalInfo.phone}
                </div>
              )}
              {resumeData.personalInfo.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {resumeData.personalInfo.location}
                </div>
              )}
            </div>
          </div>

          {resumeData.experience.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Experience</h2>
              <div className="space-y-6">
                {resumeData.experience.map((exp, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium">{exp.position}</h3>
                        <div className="text-muted-foreground">
                          {exp.company}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {exp.startDate} - {exp.endDate}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {resumeData.education.length > 0 && (
            <div className="space-y-4">
              {/* <boltAction
                type="file"
                filePath="components/resume-builder/resume-preview.tsx"
              /> */}
              <h2 className="text-xl font-semibold">Education</h2>
              <div className="space-y-4">
                {resumeData.education.map((edu, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium">{edu.school}</h3>
                        <div className="text-muted-foreground">
                          {edu.degree} in {edu.field}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {edu.graduationDate}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {resumeData.skills.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="px-3 py-1 bg-secondary rounded-full text-sm"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
