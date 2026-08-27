import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Segments from '@/components/Segments';
import SavingsCalculator from '@/components/SavingsCalculator';
import WhyJibSolar from '@/components/WhyJibSolar';
import Assurance from '@/components/Assurance';
import Process from '@/components/Process';
import Testimonials from '@/components/Testimonials';
import ProjectGallery from '@/components/ProjectGallery';
import Monitoring from '@/components/Monitoring';
import Subsidy from '@/components/Subsidy';
import Comparison from '@/components/Comparison';
import Press from '@/components/Press';
import Faq from '@/components/Faq';
import FinalCta from '@/components/FinalCta';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';

export default function Home() {
  return (
    <ScrollReveal>
      <Header />
      <main>
        <Hero />
        <Segments />
        <SavingsCalculator />
        <WhyJibSolar />
        <Assurance />
        <Process />
        <Testimonials />
        <ProjectGallery />
        <Monitoring />
        <Subsidy />
        <Comparison />
        <Press />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </ScrollReveal>
  );
}
