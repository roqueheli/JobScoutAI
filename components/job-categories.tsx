import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CodeIcon, PenToolIcon, LineChartIcon, DatabaseIcon, MonitorIcon, BrainCircuitIcon } from "lucide-react";

const CATEGORIES = [
  {
    icon: CodeIcon,
    title: "Development",
    count: 420,
    color: "text-blue-500",
  },
  {
    icon: PenToolIcon,
    title: "Design",
    count: 230,
    color: "text-purple-500",
  },
  {
    icon: LineChartIcon,
    title: "Marketing",
    count: 180,
    color: "text-green-500",
  },
  {
    icon: DatabaseIcon,
    title: "Data Science",
    count: 150,
    color: "text-yellow-500",
  },
  {
    icon: MonitorIcon,
    title: "IT & Networking",
    count: 190,
    color: "text-red-500",
  },
  {
    icon: BrainCircuitIcon,
    title: "AI & ML",
    count: 120,
    color: "text-indigo-500",
  },
] as const;

export function JobCategories() {
  return (
    <section className="container">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Popular Categories</h2>
        <p className="text-muted-foreground">
          Browse jobs by category
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((category) => (
          <Card key={category.title} className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-4">
                <category.icon className={`h-8 w-8 ${category.color}`} />
                <div>
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {category.count} open positions
                  </p>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}