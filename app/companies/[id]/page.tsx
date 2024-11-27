import { COMPANIES } from "@/components/companies/company-list";
import CompanyProfileDetail from "./page.container";

export function generateStaticParams() {
  return COMPANIES.map((company) => ({
    id: company.id.toString(),
  }));
}

const CompanyProfilePage = async ({ params }: { params: { id: string } }) => {
  const company = await COMPANIES.find(
    (company) => company.id === parseInt(params.id, 10)
  );

  return <CompanyProfileDetail company={company} />;
};

export default CompanyProfilePage;
