import { Home } from "@/components/home";
import { MobileCta } from "@/components/mobile-cta";
import { site } from "@/lib/site";

export default function Page() {
  const jsonLd = { "@context": "https://schema.org", "@type": "ProfessionalService", name: site.name, url: site.url, email: site.email, founder: { "@type": "Person", name: site.founder } };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /><Home /><MobileCta /></>;
}
