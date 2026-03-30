/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Terminal, 
  Linkedin, 
  Github, 
  Mail, 
  ExternalLink, 
  Home, 
  User, 
  MessageSquare,
  Search,
  Lock,
  Globe,
  Cpu,
  Bug,
  BookOpen
} from 'lucide-react';

// --- Types ---
interface Post {
  id: string;
  title: string;
  content: string;
  date: string;
  likes: number;
  comments: number;
  url: string;
}

interface BountyTool {
  name: string;
  description: string;
  category: 'Recon' | 'Exploitation' | 'Scanning' | 'Utility';
  icon: React.ReactNode;
  link: string;
}

// --- Mock Data ---
const MOCK_POSTS: Post[] = [
  {
    id: '1',
    title: 'HackerOne',
    content: 'Alhamdulillah, a security vulnerability I reported through a public program on HackerOne has been accepted and rewarded.',
    date: '2 days ago',
    likes: 0,
    comments: 0,
    url: 'https://www.linkedin.com/posts/swiv_bugbounty-cybersecurity-hackerone-activity-7396123719477284864-AUkf'
  },
  {
    id: '2',
    title: 'BugBountySA | منصة مكافآت الثغرات',
    content: 'Alhamdulillah, grateful to share some recent progress on the Saudi Bug Bounty platform BugBountySA | منصة مكافآت الثغرات, with confirmed and rated "Excellent" reports.',
    date: 'NA',
    likes: 0,
    comments: 0,
    url: 'https://www.linkedin.com/posts/swiv_bugbounty-cybersecurity-websecurity-activity-7404151743162384384-_MyT'
  },
  {
    id: '3',
    title: 'Web3 public program',
    content: 'Alhamdulillah, grateful to share a small streak of recent bug bounty reports in a Web3 public program.',
    date: 'NA',
    likes: 0,
    comments: 0,
    url: 'https://www.linkedin.com/posts/swiv_bugbounty-cybersecurity-websecurity-activity-7428450552054870016-1_E5'
  },
  {
    id: '4',
    title: 'reflected XSS (CWE-79, CVSS 6.1 – Medium)',
    content: 'Alhamdulillah, happy to share that a reflected XSS (CWE-79, CVSS 6.1 – Medium) I reported was accepted by a program on YesWeHack.',
    date: 'NA',
    likes: 0,
    comments: 0,
    url: 'https://www.linkedin.com/posts/swiv_bugbounty-cybersecurity-websecurity-activity-7431041858203439105-yWlZ'
  },
];

const BOUNTY_TOOLS: BountyTool[] = [
  { name: 'Burp Suite', description: 'The essential web proxy for manual testing.', category: 'Scanning', icon: <Shield className="w-5 h-5" />, link: 'https://portswigger.net/burp' },
  { name: 'Nuclei', description: 'Fast and customizable vulnerability scanner.', category: 'Scanning', icon: <Search className="w-5 h-5" />, link: 'https://github.com/projectdiscovery/nuclei' },
  { name: 'Subfinder', description: 'Subdomain discovery tool.', category: 'Recon', icon: <Globe className="w-5 h-5" />, link: 'https://github.com/projectdiscovery/subfinder' },
  { name: 'FFUF', description: 'Fast web fuzzer written in Go.', category: 'Exploitation', icon: <Terminal className="w-5 h-5" />, link: 'https://github.com/ffuf/ffuf' },
  { name: 'Amass', description: 'In-depth DNS enumeration and network mapping.', category: 'Recon', icon: <Cpu className="w-5 h-5" />, link: 'https://github.com/owasp-amass/amass' },
  { name: 'SQLMap', description: 'Automatic SQL injection and database takeover tool.', category: 'Exploitation', icon: <Lock className="w-5 h-5" />, link: 'https://sqlmap.org/' },
];

// --- Components ---

const StarField = () => {
  const stars = useMemo(() => {
    return Array.from({ length: 200 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`,
      duration: `${2 + Math.random() * 4}s`,
      moveDuration: `${20 + Math.random() * 40}s`,
      delay: `${Math.random() * 5}s`
    }));
  }, []);

  return (
    <>
      <div className="nebula" />
      <div className="star-field">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              '--duration': star.duration,
              '--move-duration': star.moveDuration,
              animationDelay: star.delay
            } as any}
          />
        ))}
      </div>
    </>
  );
};

const LinkedInEmbed = () => (
  <div className="glass-card p-4 flex justify-center overflow-hidden w-full max-w-[440px] mx-auto bg-white/5">
    <iframe 
      src="https://www.linkedin.com/embed/feed/update/urn:li:share:7443155725591150592?collapsed=1" 
      height="670" 
      width="504" 
      frameBorder="0" 
      allowFullScreen={true} 
      title="Embedded post"
      className="rounded-lg max-w-full"
    />
  </div>
);

const Navbar = ({ activeSection, setActiveSection }: { activeSection: string, setActiveSection: (s: string) => void }) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [hoveredDropdownItem, setHoveredDropdownItem] = useState<string | null>(null);

  const navItems = [
    { id: 'home', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { 
      id: 'tools', 
      label: 'Tools', 
      icon: <Bug className="w-4 h-4" />,
      hasDropdown: true,
      dropdownItems: [
        { label: 'Google Dorks', link: '/tools/google-dorks/', description: 'Advanced search operators for recon.' },
        { label: 'Tool Soon 1', link: '#', description: 'Coming soon...' },
        { label: 'Tool Soon 2', link: '#', description: 'Coming soon...' },
        { label: 'Tool Soon 3', link: '#', description: 'Coming soon...' }
      ]
    },
    { 
      id: 'scripts', 
      label: 'Scripts', 
      icon: <Terminal className="w-4 h-4" />,
      hasDropdown: true,
      dropdownItems: [
        { label: 'Recon Script', link: '#', description: 'Automated subdomain and asset discovery.' },
        { label: 'Fuzzing Script', link: '#', description: 'Custom fuzzer for API endpoints.' },
        { label: 'Soon...', link: '#', description: 'More scripts coming soon.' }
      ]
    },
    { 
      id: 'oneliner', 
      label: 'Oneliner', 
      icon: <Cpu className="w-4 h-4" />,
      hasDropdown: true,
      dropdownItems: [
        { label: 'XSS Payloads', link: '#', description: 'Handy one-liners for XSS testing.' },
        { label: 'SQLi Payloads', link: '#', description: 'Quick SQL injection strings.' },
        { label: 'Soon...', link: '#', description: 'More payloads coming soon.' }
      ]
    },
    { 
      id: 'links', 
      label: 'Links', 
      icon: <ExternalLink className="w-4 h-4" />,
      hasDropdown: true,
      dropdownItems: [
        { label: 'HackerOne', link: 'https://hackerone.com', description: 'My HackerOne profile and activity.' },
        { label: 'Bugcrowd', link: 'https://bugcrowd.com', description: 'My Bugcrowd profile.' },
        { label: 'GitHub', link: 'https://github.com', description: 'Check out my open-source tools.' },
        { label: 'LinkedIn', link: 'https://linkedin.com', description: 'Connect with me professionally.' }
      ]
    },
    { id: 'about', label: 'About Me', icon: <User className="w-4 h-4" /> },
    { id: 'contact', label: 'Contact', icon: <MessageSquare className="w-4 h-4" /> },
  ];

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 glass-card px-4 md:px-6 py-3 flex items-center gap-3 sm:gap-6 md:gap-8 border-white/10 max-w-[98vw] sm:max-w-none">
      {navItems.map((item) => (
        <div 
          key={item.id} 
          className="relative"
          onMouseEnter={() => item.hasDropdown && setHoveredItem(item.id)}
          onMouseLeave={() => {
            item.hasDropdown && setHoveredItem(null);
            setHoveredDropdownItem(null);
          }}
        >
          <button
            onClick={() => setActiveSection(item.id)}
            className={`relative flex items-center gap-2 text-sm font-medium transition-colors py-1 ${
              activeSection === item.id ? 'text-nebula-pink' : 'text-white/60 hover:text-white'
            }`}
          >
            {item.icon}
            <span className="hidden lg:inline">{item.label}</span>
            {activeSection === item.id && (
              <motion.div
                layoutId="nav-underline"
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-nebula-pink"
              />
            )}
          </button>

          {item.hasDropdown && (
            <AnimatePresence>
              {hoveredItem === item.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 glass-card border-white/10 overflow-hidden py-2 shadow-2xl backdrop-blur-xl bg-black/80 z-[60]"
                >
                  <div className="flex flex-col">
                    {item.dropdownItems?.map((drop, idx) => (
                      <div 
                        key={idx}
                        onMouseEnter={() => setHoveredDropdownItem(drop.label)}
                        onMouseLeave={() => setHoveredDropdownItem(null)}
                      >
                        <a
                          href={drop.link}
                          target={drop.link !== '#' ? "_blank" : undefined}
                          rel={drop.link !== '#' ? "noopener noreferrer" : undefined}
                          className="px-4 py-2 text-xs text-white/60 hover:text-nebula-pink hover:bg-white/10 transition-colors flex flex-col group/item"
                          onClick={(e) => {
                            if (drop.link === '#') e.preventDefault();
                          }}
                        >
                          <div className="flex items-center justify-between">
                            {drop.label}
                            {drop.link !== '#' && <ExternalLink className="w-3 h-3 opacity-0 group-hover/item:opacity-100 transition-opacity" />}
                          </div>
                          {hoveredDropdownItem === drop.label && (
                            <motion.div 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="text-[10px] text-white/40 mt-1 leading-tight font-normal"
                            >
                              {drop.description}
                            </motion.div>
                          )}
                        </a>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      ))}
    </nav>
  );
};

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen selection:bg-nebula-purple/30">
      <StarField />
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

      <main className="container mx-auto px-4 pt-32 pb-20">
        <AnimatePresence mode="wait">
          {activeSection === 'home' && (
            <motion.section
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center text-center space-y-16"
            >
              {/* Hero Section */}
              <div className="space-y-6">
                <motion.h1 
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{ 
                    duration: 10, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="text-4xl md:text-6xl font-display font-bold tracking-widest dark-neon-text"
                >
                  M O A A Z
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: [0.15, 0.35, 0.15],
                  }}
                  transition={{ 
                    duration: 12, 
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                  className="text-base md:text-lg text-white max-w-2xl mx-auto font-light tracking-wide"
                >
                  Security Researcher & Bug Bounty Hunter. Exploring the cosmic depths of cybersecurity.
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="flex gap-6 justify-center pt-4"
                >
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-nebula-pink transition-colors">
                    <Linkedin className="w-6 h-6" />
                  </a>
                  <a href="https://medium.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-nebula-pink transition-colors">
                    <BookOpen className="w-6 h-6" />
                  </a>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-nebula-pink transition-colors">
                    <Github className="w-6 h-6" />
                  </a>
                </motion.div>
              </div>

              {/* LinkedIn Embed Test */}
              <div className="w-full space-y-8">
                <h2 className="text-2xl font-semibold flex items-center justify-center gap-2">
                  <Linkedin className="text-blue-400" />
                  Featured Post
                </h2>
                <LinkedInEmbed />
              </div>

              {/* LinkedIn Posts Grid */}
              <div className="w-full max-w-7xl space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold flex items-center gap-2">
                    <Linkedin className="text-blue-400" />
                    Latest Insights
                  </h2>
                  <a href="#" className="text-sm text-white/40 hover:text-white transition-colors flex items-center gap-1">
                    View all <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {MOCK_POSTS.map((post, index) => (
                    <motion.a
                      key={post.id}
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      whileHover={{ scale: 1.02, translateY: -5 }}
                      className="glass-card p-6 space-y-4 text-left group cursor-pointer border-white/5 hover:border-nebula-purple/50 transition-all flex flex-col h-full"
                    >
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] text-white/40 uppercase tracking-widest">{post.date}</span>
                        <Linkedin className="w-4 h-4 text-white/20 group-hover:text-blue-400 transition-colors" />
                      </div>
                      <h3 className="text-lg font-bold group-hover:text-nebula-pink transition-colors leading-tight">{post.title}</h3>
                      <p className="text-sm text-white/60 line-clamp-4 leading-relaxed flex-grow">
                        {post.content}
                      </p>
                      <div className="flex items-center gap-2 text-[10px] text-nebula-pink font-medium pt-4 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                        Read full post <ExternalLink className="w-3 h-3" />
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.section>
          )}

          {activeSection === 'tools' && (
            <motion.section
              key="tools"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="space-y-12"
            >
              <div className="text-center space-y-4">
                <h2 className="text-4xl font-bold tracking-tight">Hunter's Toolkit</h2>
                <p className="text-white/60">Curated tools for effective vulnerability research.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {BOUNTY_TOOLS.map((tool, index) => (
                  <motion.a
                    key={tool.name}
                    href={tool.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="glass-card p-6 flex flex-col gap-4 hover:bg-white/5 transition-colors group h-full"
                  >
                    <div className="flex items-center justify-between">
                      <div className="p-3 bg-nebula-purple/20 rounded-lg text-nebula-pink group-hover:scale-110 transition-transform">
                        {tool.icon}
                      </div>
                      <span className="text-[10px] uppercase tracking-widest text-white/40 bg-white/5 px-2 py-1 rounded">
                        {tool.category}
                      </span>
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-bold text-lg">{tool.name}</h3>
                      <p className="text-sm text-white/50 mt-1">{tool.description}</p>
                    </div>
                    <div className="pt-4 flex items-center text-xs text-nebula-pink font-medium opacity-0 group-hover:opacity-100 transition-opacity border-t border-white/5">
                      Learn more <ExternalLink className="w-3 h-3 ml-1" />
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.section>
          )}

          {activeSection === 'about' && (
            <motion.section
              key="about"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="max-w-4xl mx-auto space-y-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden glass-card p-2">
                    <img 
                      src="https://picsum.photos/seed/hacker/800/800" 
                      alt="Profile" 
                      className="w-full h-full object-cover rounded-xl grayscale hover:grayscale-0 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-nebula-purple/30 blur-3xl -z-10" />
                  <div className="absolute -top-4 -left-4 w-24 h-24 bg-nebula-pink/30 blur-3xl -z-10" />
                </div>
                
                <div className="space-y-6">
                  <h2 className="text-4xl font-bold">About Me</h2>
                  <p className="text-white/70 leading-relaxed">
                    I am a passionate security researcher with a focus on web application security and automated vulnerability discovery. My journey started with a curiosity about how things break, which evolved into a professional pursuit of making the digital world safer.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="glass-card p-4">
                      <div className="text-2xl font-bold text-nebula-pink">50+</div>
                      <div className="text-xs text-white/40 uppercase tracking-wider">Bounties Found</div>
                    </div>
                    <div className="glass-card p-4">
                      <div className="text-2xl font-bold text-nebula-purple">P1</div>
                      <div className="text-xs text-white/40 uppercase tracking-wider">Highest Severity</div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <a href="#" className="p-2 glass-card hover:text-nebula-pink transition-colors"><Github className="w-5 h-5" /></a>
                    <a href="#" className="p-2 glass-card hover:text-nebula-pink transition-colors"><Linkedin className="w-5 h-5" /></a>
                    <a href="#" className="p-2 glass-card hover:text-nebula-pink transition-colors"><Mail className="w-5 h-5" /></a>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {activeSection === 'contact' && (
            <motion.section
              key="contact"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="max-w-xl mx-auto space-y-12 text-center"
            >
              <div className="space-y-4">
                <h2 className="text-4xl font-bold">Get In Touch</h2>
                <p className="text-white/60">Interested in collaboration or security consulting? Connect with me on social media.</p>
              </div>

              <div className="flex justify-center gap-8">
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group flex flex-col items-center gap-3"
                >
                  <div className="w-16 h-16 glass-card flex items-center justify-center group-hover:text-nebula-pink group-hover:border-nebula-pink/50 transition-all duration-300">
                    <Linkedin className="w-8 h-8" />
                  </div>
                  <span className="text-xs text-white/40 uppercase tracking-widest group-hover:text-white transition-colors">LinkedIn</span>
                </a>
                <a 
                  href="https://medium.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group flex flex-col items-center gap-3"
                >
                  <div className="w-16 h-16 glass-card flex items-center justify-center group-hover:text-nebula-pink group-hover:border-nebula-pink/50 transition-all duration-300">
                    <BookOpen className="w-8 h-8" />
                  </div>
                  <span className="text-xs text-white/40 uppercase tracking-widest group-hover:text-white transition-colors">Medium</span>
                </a>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group flex flex-col items-center gap-3"
                >
                  <div className="w-16 h-16 glass-card flex items-center justify-center group-hover:text-nebula-pink group-hover:border-nebula-pink/50 transition-all duration-300">
                    <Github className="w-8 h-8" />
                  </div>
                  <span className="text-xs text-white/40 uppercase tracking-widest group-hover:text-white transition-colors">GitHub</span>
                </a>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      <footer className="fixed bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-white/20 uppercase tracking-[0.3em] font-medium">
        &copy; 2026 MOAAZ // Made with ❤️
      </footer>
    </div>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen selection:bg-nebula-purple/30">
      {/* ... rest of JSX ... */}
    </div>
  );
}
