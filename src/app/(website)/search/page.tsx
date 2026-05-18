import SearchPage from "@/components/website/search/SearchPage";
import SectionHeroBanner from "@/components/website/SectionHeroBanner";

const page = () => {
  return (
    <div>
      <SectionHeroBanner
        title='Find an ErrandR'
        subtitle='Search your city and state to connect with someone ready to help.'
      />
      <SearchPage />
    </div>
  );
};

export default page;
