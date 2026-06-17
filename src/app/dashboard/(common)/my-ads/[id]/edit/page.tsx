import EditAdPage from "@/components/dashboard/common/my-ads/EditAdPage";

export const metadata = {
  title: "Edit Ad | Errand Hub",
  description: "Edit your business ad poster.",
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  return <EditAdPage id={params.id} />;
}
