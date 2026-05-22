import UsersPage from "@/components/dashboard/admin/users/UsersPage";

export const metadata = {
  title: "User Management | Errand Hub",
  description: "Manage users and errands on Errand Hub",
};

const page = () => {
  return <UsersPage />;
};

export default page;
