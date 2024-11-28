"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

export function SalaryCalculator() {
  const [experience, setExperience] = useState(3);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Salary Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="role">Job Role</Label>
          <Select>
            <SelectTrigger id="role">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="software-engineer">
                Software Engineer
              </SelectItem>
              <SelectItem value="product-manager">Product Manager</SelectItem>
              <SelectItem value="data-scientist">Data Scientist</SelectItem>
              <SelectItem value="ux-designer">UX Designer</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Select>
            <SelectTrigger id="location">
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sf">San Francisco</SelectItem>
              <SelectItem value="ny">New York</SelectItem>
              <SelectItem value="london">London</SelectItem>
              <SelectItem value="remote">Remote</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <Label>Years of Experience: {experience}</Label>
          <Slider
            value={[experience]}
            onValueChange={([value]) => setExperience(value)}
            max={20}
            step={1}
          />
        </div>

        <div className="space-y-2">
          <Label>Estimated Salary Range</Label>
          <div className="text-2xl font-bold">$80,000 - $120,000</div>
          <p className="text-sm text-muted-foreground">
            Based on market data and recent placements
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
