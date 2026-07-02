import ContactPage from "@/components/website/contact/ContactPage";
import SectionHeroBanner from "@/components/website/SectionHeroBanner";

const page = () => {
  return (
    <div>
      <SectionHeroBanner
        title={"Get In Touch"}
        subtitle={
          "Join and start earning by running errands in your community."
        }
      />
      <ContactPage />
    </div>
  );
};

export default page;
