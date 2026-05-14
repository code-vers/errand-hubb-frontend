import SectionHeroBanner from "../SectionHeroBanner";
import Gallery from "./Gallery";

const GalleryPage = () => {
  return (
    <div>
      <SectionHeroBanner
        title={"Errand Gallery"}
        subtitle={
          "Browse through a diverse collection of errands completed by our community. From deliveries to professional services, see how we make tasks easier every day"
        }
      />
      <Gallery />
    </div>
  );
};

export default GalleryPage;
