"use client";

import { SalaryCalculator } from "@/components/misc/salary-guide/salary-calculator";
import { SalaryChart } from "@/components/misc/salary-guide/salary-chart";
import { SalaryInsights } from "@/components/misc/salary-guide/salary-insights";

export default function SalaryGuidePage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Salary Guide</h1>
          <p className="text-muted-foreground">
            Explore salary insights and trends for your career path
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <SalaryCalculator />
          <SalaryChart />
        </div>

        <SalaryInsights />
      </div>
    </div>
  );
}
