import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Summary } from './components/Summary';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Achievements } from './components/Achievements';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { useFavicon } from './components/useFavicon';

export default function App() {
  // Set favicon emoji
  useFavicon('⚡');

  return (
    <div className="min-h-screen" style={{ 
      fontFamily: 'var(--font-body)',
      background: 'var(--bg-deep)',
      color: 'var(--text-primary)'
    }}>
      <Navigation />
      <Hero />
      <Summary />
      <Skills />
      <Experience />
      <Projects />
      <Achievements />
      <Education />
      <Contact />
    </div>
  );
}