import ClientRegistrationPage from "@/components/auth/ClientRegistrationPage";
import SectionHeroBanner from "@/components/website/SectionHeroBanner";

const page = () => {
  return (
    <div>
      <SectionHeroBanner
        title={"Client Registration"}
        subtitle={"Create your free client account to post errands."}
      />
      <ClientRegistrationPage />
    </div>
  );
};

export default page;
