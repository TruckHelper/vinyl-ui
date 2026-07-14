import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import CtaBanner from '../components/landing/CtaBanner';
import Footer from '../components/landing/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <CtaBanner />
      <Footer />
    </>
  );
}
