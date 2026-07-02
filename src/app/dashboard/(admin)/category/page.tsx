import CategoriesManagement from "@/components/dashboard/admin/categories/CategoriesManagement";

export const metadata = {
  title: "Category Management | Errand Hub",
  description: "Manage task categories and visibility on Errand Hub",
};

const page = () => {
  return <CategoriesManagement />;
};

export default page;
