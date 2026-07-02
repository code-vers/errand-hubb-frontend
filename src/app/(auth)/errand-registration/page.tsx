import ErrandRegistrationPage from "@/components/auth/ErrandRegistration";
import SectionHeroBanner from "@/components/website/SectionHeroBanner";

const page = () => {
  return (
    <div>
      <SectionHeroBanner
        title={"Errandr Registration"}
        subtitle={
          "Join and start earning by running errands in your community."
        }
      />
      <ErrandRegistrationPage />
    </div>
  );
};

export default page;
