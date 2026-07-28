import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Gallery } from "@/components/Gallery";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PATH_TO_SECTION_ID, scrollToSection } from "@/lib/sections";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    // Add structured data for SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Dentist",
      "name": "Dr. Marcell Parente",
      "image": "https://drmarcellparente.com.br/dr-marcell-profile.jpg",
      "description": "Cirurgião Dentista especialista em Endodontia e Implantodontia em Copacabana, Rio de Janeiro. CRO-RJ 43846.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Avenida Nossa Senhora de Copacabana, 330, sala 707",
        "addressLocality": "Rio de Janeiro",
        "addressRegion": "RJ",
        "postalCode": "22020-001",
        "addressCountry": "BR"
      },
      "telephone": "+5521998667979",
      "email": "cerocopacabana@gmail.com",
      "priceRange": "$$",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
          ],
          "opens": "00:00",
          "closes": "23:59"
        }
      ],
      "medicalSpecialty": ["Endodontics", "Dental Implants", "Dentistry"],
      "hasCredential": [
        {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "Professional License",
          "name": "CRO-RJ 43846"
        },
        {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "Specialization",
          "name": "Especialista em Endodontia — ABO-DF | Implantodontia — IBPG-DF"
        }
      ],
      "availableService": [
        {
          "@type": "MedicalProcedure",
          "name": "Tratamento de Canal (Endodontia)",
          "description": "Especialista em endodontia com técnicas avançadas e microscopia operatória"
        },
        {
          "@type": "MedicalProcedure",
          "name": "Implante Dentário (Implantodontia)",
          "description": "Especialização em implantes para recuperação completa do sorriso"
        },
        {
          "@type": "MedicalProcedure",
          "name": "Retratamento Endodôntico",
          "description": "Tratamento de casos complexos de retratamento de canal"
        },
        {
          "@type": "MedicalProcedure",
          "name": "Emergências Dentárias",
          "description": "Atendimento prioritário para dores agudas e urgências"
        },
        {
          "@type": "MedicalProcedure",
          "name": "Diagnóstico por Imagem",
          "description": "Tomografia, radiografia digital e localizador apical"
        },
        {
          "@type": "MedicalProcedure",
          "name": "Clareamento Dental",
          "description": "Técnicas modernas de clareamento caseiro e em consultório"
        }
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const sectionId = PATH_TO_SECTION_ID[location.pathname];
    if (sectionId) {
      scrollToSection(sectionId);
    }
  }, [location.pathname]);

  return (
    <div id="inicio" className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Gallery />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
