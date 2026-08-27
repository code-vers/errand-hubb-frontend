import ErrandPage from "@/components/errand/ErrandPage";
import SectionHeroBanner from "@/components/website/SectionHeroBanner";

export const metadata = {
  title: "Errands | Errand Hub",
  description: "Browse trusted errand professionals and local services.",
};

const page = () => {
  return (
    <div style={{ fontFamily: "Helvetica, Arial, sans-serif" }}>
      <SectionHeroBanner
        title={"Errands"}
        subtitle={
          "Connecting you with reliable Errandrs for every task. From personal shopping to specialized services, find the help you need to reclaim your time."
        }
      />
      <ErrandPage />
    </div>
  );
};

export default page;
