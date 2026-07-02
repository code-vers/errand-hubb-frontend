import LegalPage from "@/components/website/legal/LegalPage";
import SectionHeroBanner from "@/components/website/SectionHeroBanner";

export const metadata = {
  title: "Legal & Policies | ErrandHubb",
  description: "Read ErrandHubb's Privacy Policy, Terms of Service, and Refund Policy.",
};

const LegalRoutePage = () => {
  return (
    <div>
      <SectionHeroBanner
        title={"Legal Center"}
        subtitle={
          "Our Privacy Policy, Terms of Service, and Refund Policy guidelines."
        }
      />
      <LegalPage />
    </div>
  );
};

export default LegalRoutePage;
