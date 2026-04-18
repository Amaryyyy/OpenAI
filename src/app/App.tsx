import { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import History from './components/History';
import Summary from './components/Summary';
import Timeline from './components/Timeline';
import People from './components/People';
import Products from './components/Products';
import Footer from './components/Footer';
import GlobalBackground from './components/GlobalBackground';
import content from './content.json';

export default function App() {
  useEffect(() => {
    document.title = content.meta.documentTitle;
  }, []);

  return (
    <>
      <GlobalBackground />
      <div className="relative min-h-screen">
        <Header />
        <main className="w-full overflow-x-hidden">
          <Hero />
          <Summary />
          <History />
          <Timeline />
          <People />
          <Products />
          <Footer />
        </main>
      </div>
    </>
  );
}
