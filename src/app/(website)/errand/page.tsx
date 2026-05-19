import ErrandPage from "@/components/errand/ErrandPage";
import SectionHeroBanner from "@/components/website/SectionHeroBanner";

const page = () => {
  return (
    <div>
      <SectionHeroBanner
        title={"Trusted Errand Professionals"}
        subtitle={
          "Connecting you with reliable Errandrs for every task. From personal shopping to specialized services, find the help you need to reclaim your time."
        }
      />
      <ErrandPage />
    </div>
  );
};

export default page;
