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
  // Tool, ❌ REMOVE THIS - doesn't exist in lucide-react
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
  likes: number;    // ✅ Changed from string to number
  comments: number; // ✅ Changed from string to number
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
    likes: 0,        // ✅ Changed from "NA" to 0
    comments: 0,     // ✅ Changed from "NA" to 0
    url: 'https://www.linkedin.com/posts/swiv_bugbounty-cybersecurity-hackerone-activity-7396123719477284864-AUkf'
  },
  {
    id: '2',
    title: 'BugBountySA | منصة مكافآت الثغرات',
    content: 'Alhamdulillah, grateful to share some recent progress on the Saudi Bug Bounty platform BugBountySA | منصة مكافآت الثغرات, with confirmed and rated "Excellent" reports.',
    date: 'NA',
    likes: 0,        // ✅ Changed from "NA" to 0
    comments: 0,     // ✅ Changed from "NA" to 0
    url: 'https://www.linkedin.com/posts/swiv_bugbounty-cybersecurity-websecurity-activity-7404151743162384384-_MyT'
  },
  {
    id: '3',
    title: 'Web3 public program',
    content: 'Alhamdulillah, grateful to share a small streak of recent bug bounty reports in a Web3 public program.',
    date: 'NA',
    likes: 0,        // ✅ Changed from "NA" to 0
    comments: 0,     // ✅ Changed from "NA" to 0
    url: 'https://www.linkedin.com/posts/swiv_bugbounty-cybersecurity-websecurity-activity-7428450552054870016-1_E5'
  },
  {
    id: '4',
    title: 'reflected XSS (CWE-79, CVSS 6.1 – Medium)',
    content: 'Alhamdulillah, happy to share that a reflected XSS (CWE-79, CVSS 6.1 – Medium) I reported was accepted by a program on YesWeHack.',
    date: 'NA',
    likes: 0,        // ✅ Changed from "NA" to 0
    comments: 0,     // ✅ Changed from "NA" to 0
    url: 'https://www.linkedin.com/posts/swiv_bugbounty-cybersecurity-websecurity-activity-7431041858203439105-yWlZ'
  },
];

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
            // ... rest of the JSX
          )}
        </AnimatePresence>
      </main>

      <footer className="fixed bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-white/20 uppercase tracking-[0.3em] font-medium">
        &copy; 2026 MOAAZ // Made with ❤️
      </footer>
    </div>
  );
}
