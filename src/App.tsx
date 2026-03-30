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
