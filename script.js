const MOCK_POSTS = [
  {
    id: "1",
    title: "HackerOne",
    content:
      "Alhamdulillah, a security vulnerability I reported through a public program on HackerOne has been accepted and rewarded.",
    date: "2 days ago",
    url: "https://www.linkedin.com/posts/swiv_bugbounty-cybersecurity-hackerone-activity-7396123719477284864-AUkf",
  },
  {
    id: "2",
    title: "BugBountySA | منصة مكافآت الثغرات",
    content:
      "Alhamdulillah, grateful to share some recent progress on the Saudi Bug Bounty platform BugBountySA | منصة مكافآت الثغرات, with confirmed and rated Excellent reports.",
    date: "NA",
    url: "https://www.linkedin.com/posts/swiv_bugbounty-cybersecurity-websecurity-activity-7404151743162384384-_MyT",
  },
  {
    id: "3",
    title: "Web3 public program",
    content:
      "Alhamdulillah, grateful to share a small streak of recent bug bounty reports in a Web3 public program.",
    date: "NA",
    url: "https://www.linkedin.com/posts/swiv_bugbounty-cybersecurity-websecurity-activity-7428450552054870016-1_E5",
  },
  {
    id: "4",
    title: "reflected XSS (CWE-79, CVSS 6.1 - Medium)",
    content:
      "Alhamdulillah, happy to share that a reflected XSS (CWE-79, CVSS 6.1 - Medium) I reported was accepted by a program on YesWeHack.",
    date: "NA",
    url: "https://www.linkedin.com/posts/swiv_bugbounty-cybersecurity-websecurity-activity-7431041858203439105-yWlZ",
  },
];

const BOUNTY_TOOLS = [
  {
    name: "Burp Suite",
    description: "The essential web proxy for manual testing.",
    category: "Scanning",
    icon: "🛡",
    link: "https://portswigger.net/burp",
  },
  {
    name: "Nuclei",
    description: "Fast and customizable vulnerability scanner.",
    category: "Scanning",
    icon: "🔎",
    link: "https://github.com/projectdiscovery/nuclei",
  },
  {
    name: "Subfinder",
    description: "Subdomain discovery tool.",
    category: "Recon",
    icon: "🌐",
    link: "https://github.com/projectdiscovery/subfinder",
  },
  {
    name: "FFUF",
    description: "Fast web fuzzer written in Go.",
    category: "Exploitation",
    icon: "⌨",
    link: "https://github.com/ffuf/ffuf",
  },
  {
    name: "Amass",
    description: "In-depth DNS enumeration and network mapping.",
    category: "Recon",
    icon: "⚙",
    link: "https://github.com/owasp-amass/amass",
  },
  {
    name: "SQLMap",
    description: "Automatic SQL injection and database takeover tool.",
    category: "Exploitation",
    icon: "🔐",
    link: "https://sqlmap.org/",
  },
];

function renderPosts() {
  const postsGrid = document.getElementById("posts-grid");
  if (!postsGrid) return;

  postsGrid.innerHTML = MOCK_POSTS.map(
    (post) => `
      <a class="post-card glass-card" href="${post.url}" target="_blank" rel="noopener noreferrer">
        <div class="post-meta">
          <span>${post.date}</span>
          <span>LinkedIn</span>
        </div>
        <h3>${post.title}</h3>
        <p>${post.content}</p>
        <div class="post-link">Read full post</div>
      </a>
    `,
  ).join("");
}

function renderTools() {
  const toolsGrid = document.getElementById("tools-grid");
  if (!toolsGrid) return;

  toolsGrid.innerHTML = BOUNTY_TOOLS.map(
    (tool) => `
      <a class="tool-card glass-card" href="${tool.link}" target="_blank" rel="noopener noreferrer">
        <div class="tool-top">
          <div class="tool-icon" aria-hidden="true">${tool.icon}</div>
          <span class="tool-category">${tool.category}</span>
        </div>
        <h3>${tool.name}</h3>
        <p>${tool.description}</p>
        <div class="tool-link">Learn more</div>
      </a>
    `,
  ).join("");
}

function createStars() {
  const starField = document.getElementById("star-field");
  if (!starField) return;

  const stars = Array.from({ length: 200 }, (_, id) => ({
    id,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: `${Math.random() * 2 + 1}px`,
    duration: `${2 + Math.random() * 4}s`,
    moveDuration: `${20 + Math.random() * 40}s`,
    delay: `${Math.random() * 5}s`,
  }));

  stars.forEach((star) => {
    const node = document.createElement("div");
    node.className = "star";
    node.style.left = star.left;
    node.style.top = star.top;
    node.style.width = star.size;
    node.style.height = star.size;
    node.style.setProperty("--duration", star.duration);
    node.style.setProperty("--move-duration", star.moveDuration);
    node.style.animationDelay = star.delay;
    starField.appendChild(node);
  });
}

function setupSections() {
  const buttons = Array.from(document.querySelectorAll("[data-section-target]"));
  const sections = Array.from(document.querySelectorAll(".section"));

  const setActiveSection = (target) => {
    buttons.forEach((button) => {
      button.classList.toggle("active", button.dataset.sectionTarget === target);
    });

    sections.forEach((section) => {
      const isActive = section.id === target;
      section.classList.toggle("active", isActive);
      section.setAttribute("aria-hidden", String(!isActive));
    });
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      setActiveSection(button.dataset.sectionTarget || "home");
    });
  });

  setActiveSection("home");
}

function setupNavbarScrollState() {
  const nav = document.getElementById("navbar");
  if (!nav) return;

  const updateState = () => {
    nav.classList.toggle("scrolled", window.scrollY > 50);
  };

  window.addEventListener("scroll", updateState, { passive: true });
  updateState();
}

function setupDropdowns() {
  const dropdownParents = Array.from(document.querySelectorAll(".nav-item.has-dropdown"));
  const closeTimers = new WeakMap();

  const closeAll = () => {
    dropdownParents.forEach((parent) => {
      parent.classList.remove("open");
      const timer = closeTimers.get(parent);
      if (timer) {
        clearTimeout(timer);
      }
    });
  };

  const openDropdown = (parent) => {
    const timer = closeTimers.get(parent);
    if (timer) {
      clearTimeout(timer);
    }

    dropdownParents.forEach((item) => {
      if (item !== parent) {
        item.classList.remove("open");
      }
    });

    parent.classList.add("open");
  };

  const scheduleClose = (parent, delay = 140) => {
    const timer = setTimeout(() => {
      parent.classList.remove("open");
    }, delay);
    closeTimers.set(parent, timer);
  };

  dropdownParents.forEach((parent) => {
    const trigger = parent.querySelector("[data-dropdown-trigger]");
    if (!trigger) return;

    parent.addEventListener("mouseenter", () => {
      openDropdown(parent);
    });

    parent.addEventListener("mouseleave", () => {
      scheduleClose(parent);
    });

    parent.addEventListener("focusin", () => {
      openDropdown(parent);
    });

    parent.addEventListener("focusout", (event) => {
      const nextTarget = event.relatedTarget;
      if (nextTarget instanceof Node && parent.contains(nextTarget)) {
        return;
      }
      scheduleClose(parent, 60);
    });

    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const isOpen = parent.classList.contains("open");
      if (isOpen) {
        parent.classList.remove("open");
        return;
      }
      openDropdown(parent);
    });
  });

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;

    dropdownParents.forEach((parent) => {
      if (!parent.contains(target)) {
        scheduleClose(parent, 0);
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAll();
    }
  });
}

function boot() {
  createStars();
  renderPosts();
  renderTools();
  setupSections();
  setupDropdowns();
  setupNavbarScrollState();
}

document.addEventListener("DOMContentLoaded", boot);
