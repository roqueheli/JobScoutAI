import { FEATURED_JOBS } from "@/components/featured-jobs";
import JobDetailClient from "./page.container";

export async function generateStaticParams() {
  // Aquí defines los parámetros estáticos. Por ejemplo, si estás trabajando con `FEATURED_JOBS`:
  return FEATURED_JOBS.map((job) => ({
    id: job.id.toString(),
  }));
}

const JobDetailPage = async ({ params }: { params: { id: string } }) => {
  const job = await FEATURED_JOBS.find((job) => job.id === parseInt(params.id, 10));

  return <JobDetailClient job={job} />;
};

export default JobDetailPage;
