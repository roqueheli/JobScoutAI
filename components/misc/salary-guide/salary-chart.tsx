"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const data = [
  { year: 2019, salary: 75000 },
  { year: 2020, salary: 82000 },
  { year: 2021, salary: 90000 },
  { year: 2022, salary: 98000 },
  { year: 2023, salary: 110000 },
];

export function SalaryChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Salary Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              <Line
                type="monotone"
                dataKey="salary"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
