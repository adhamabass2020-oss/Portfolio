/**
 * Adham Ahmed Abbas - Modern Portfolio Interactive Engine
 * Aesthetic: Codespot Dark Tech / Cyber Emerald Theme
 * 
 * Features:
 * 1. Interactive Cyber Terminal (CLI commands, quick chips, tab switcher, history)
 * 2. Real-Time Maze Solver & Pathfinding Simulation (A*, BFS, Dijkstra, canvas rendering)
 * 3. Categorized Skills Filter Navigation
 * 4. Contact Form Validation, Loading State & Feedback Toast
 * 5. One-Click Clipboard Copying with Custom Notification Toasts
 * 6. Interactive Resume Modal with Print and Copy features
 * 7. Active ScrollSpy Navigation & Mobile Drawer Menu
 * 8. Cursor Glow & Ambient Spotlight Tracking
 */

document.addEventListener('DOMContentLoaded', () => {
  initCursorSpotlight();
  initNavbarAndScrollSpy();
  initInteractiveTerminal();
  initMazeSimulator();
  initSkillsFilter();
  initContactForm();
  initClipboardCopy();
  initResumeModal();
});

/* ==========================================================================
   1. CURSOR SPOTLIGHT & CARD GLOW EFFECT
   ========================================================================== */
function initCursorSpotlight() {
  const spotlight = document.getElementById('cursorSpotlight');
  if (!spotlight) return;

  let ticking = false;

  window.addEventListener('mousemove', (e) => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const x = e.clientX;
        const y = e.clientY;
        document.documentElement.style.setProperty('--mouse-x', `${x}px`);
        document.documentElement.style.setProperty('--mouse-y', `${y}px`);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/* ==========================================================================
   2. NAVBAR, SCROLLSPY & MOBILE MENU
   ========================================================================== */
function initNavbarAndScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  // Active scrollspy
  function onScroll() {
    const scrollPosition = window.scrollY + 180;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPosition >= top && scrollPosition < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu toggle
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('open');
      if (isOpen) {
        mobileDrawer.classList.remove('open');
        mobileToggle.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      } else {
        mobileDrawer.classList.add('open');
        mobileToggle.classList.add('open');
        mobileToggle.setAttribute('aria-expanded', 'true');
      }
    });

    // Close on link click
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!mobileDrawer.contains(e.target) && !mobileToggle.contains(e.target)) {
        mobileDrawer.classList.remove('open');
        mobileToggle.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

/* ==========================================================================
   3. INTERACTIVE CYBER TERMINAL
   ========================================================================== */
function initInteractiveTerminal() {
  const form = document.getElementById('terminalForm');
  const input = document.getElementById('terminalInput');
  const output = document.getElementById('terminalOutput');
  const quickChips = document.querySelectorAll('.chip-btn');
  const terminalTabs = document.querySelectorAll('.terminal-tab');

  if (!output || !input) return;

  const commandHistory = [];
  let historyIndex = -1;

  // Pre-configured Python simulation code for tab 2
  const pythonSysInfoLines = [
    '<span class="syntax-keyword">class</span> <span class="syntax-cmd">AutomationEngineer</span>:',
    '    <span class="syntax-keyword">def</span> __init__(self):',
    '        self.name = <span class="syntax-comment">"Adham Ahmed Abbas"</span>',
    '        self.role = <span class="syntax-comment">"AI Automation Engineer & CS Specialist"</span>',
    '        self.degree = <span class="syntax-comment">"Bachelor of Computers & AI (Beni-Suef, GPA 3.1)"</span>',
    '        self.program = <span class="syntax-comment">"DEPI Round 5 (AMIT Learning)"</span>',
    '        self.skills = [<span class="syntax-comment">"Python"</span>, <span class="syntax-comment">"n8n"</span>, <span class="syntax-comment">"LLMs"</span>, <span class="syntax-comment">"Algorithms"</span>]',
    '    <span class="syntax-keyword">def</span> optimize_pipeline(self):',
    '        <span class="syntax-keyword">return</span> <span class="syntax-comment">"Autonomous Workflow Executed: 99.8% precision"</span>',
    '',
    '<span class="syntax-prompt">&gt;&gt;&gt;</span> engineer = AutomationEngineer()',
    '<span class="syntax-prompt">&gt;&gt;&gt;</span> print(engineer.optimize_pipeline())',
    '<span class="output-text">&gt; "Autonomous Workflow Executed: 99.8% precision"</span>'
  ];

  const defaultBashHistory = output.innerHTML;

  // Switch tabs
  terminalTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      terminalTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const tabType = tab.getAttribute('data-tab');
      if (tabType === 'sysinfo') {
        output.innerHTML = pythonSysInfoLines.map(line => `<div class="terminal-line">${line}</div>`).join('');
        output.scrollTop = output.scrollHeight;
      } else {
        output.innerHTML = defaultBashHistory;
        output.scrollTop = output.scrollHeight;
      }
    });
  });

  function appendLine(htmlContent) {
    const line = document.createElement('div');
    line.className = 'terminal-line';
    line.innerHTML = htmlContent;
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
  }

  function executeCommand(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    commandHistory.push(rawCmd);
    historyIndex = commandHistory.length;

    // Show typed command
    appendLine(`<span class="syntax-prompt">adham@ai-sys:~$</span> <span class="syntax-cmd">${escapeHtml(rawCmd)}</span>`);

    switch (cmd) {
      case 'help':
        appendLine(`<div class="output-text">
Available Commands:
  • <span class="syntax-cmd">whoami</span>       : Profile & educational overview
  • <span class="syntax-cmd">skills</span>       : List categorized technical proficiencies
  • <span class="syntax-cmd">projects</span>     : Showcase algorithmic & automation projects
  • <span class="syntax-cmd">experience</span>   : View DEPI Round 5 trainee details
  • <span class="syntax-cmd">contact</span>      : Direct email, phone, and links
  • <span class="syntax-cmd">resume</span>       : Open resume overview modal
  • <span class="syntax-cmd">date</span>         : Print system date and timezone
  • <span class="syntax-cmd">clear</span>        : Wipe terminal output buffer
</div>`);
        break;

      case 'whoami':
        appendLine(`<div class="output-text">
&gt; <strong>Adham Ahmed Abbas</strong>
&gt; Role: AI Automation Engineer &amp; Computer Science Specialist
&gt; Location: Cairo, Egypt
&gt; Education: Bachelor of Computers and AI – Beni-Suef University (GPA: 3.1)
&gt; Mission: Engineering autonomous workflows and robust algorithmic architectures.
</div>`);
        break;

      case 'skills':
        appendLine(`<div class="output-text">
<strong>[AI &amp; Automation]</strong>: Workflow Automation, Prompt Engineering, ML/DL, Generative AI, n8n
<strong>[Software &amp; Dev]</strong>: Python, C++, OOP, Algorithm Design, Data Structures, Complexity
<strong>[Data &amp; Tools]</strong>: SQL, Database Management, NumPy, Matplotlib Animation, Git
</div>`);
        break;

      case 'projects':
        appendLine(`<div class="output-text">
1. <strong>Maze Solver &amp; Algorithmic Pathfinding Suite</strong>
   - Python-based simulation with real-time state exploration vs optimal path comparison.
   - Interactive canvas visualizer embedded below on this page!
2. <strong>Autonomous Multi-Agent Workflow Engine</strong> [Coming Soon]
   - Event-driven task delegation and multi-step tool execution.
3. <strong>Enterprise RAG Document Intelligence System</strong> [Coming Soon]
   - Semantic vector embeddings and structured data extraction.
</div>`);
        break;

      case 'experience':
        appendLine(`<div class="output-text">
&gt; <strong>AI Automation Engineer Trainee</strong>
&gt; Program: Digital Egypt Pioneers Initiative (DEPI) – Round 5
&gt; Partner: Powered by AMIT Learning
&gt; Duration: July 2026 – Present | Cairo, Egypt
&gt; Focus: Building end-to-end multi-agent pipelines, LLM APIs, and process orchestration.
</div>`);
        break;

      case 'contact':
        appendLine(`<div class="output-text">
&gt; Email: <a href="mailto:adhamabass2020@gmail.com" style="color:var(--accent-neon);">adhamabass2020@gmail.com</a>
&gt; Phone: <a href="tel:+201149746364" style="color:var(--accent-neon);">+20 1149746364</a>
&gt; Location: Cairo, Egypt (GMT+3)
&gt; GitHub: github.com | LinkedIn: linkedin.com
</div>`);
        break;

      case 'status':
      case 'status --track':
        appendLine(`<div class="output-text">
&gt; Status: Active Trainee in DEPI Round 5 (AMIT Learning)
&gt; Availability: Available for select AI Automation and Algorithmic projects.
&gt; Health: All systems operational.
</div>`);
        break;

      case 'resume':
      case 'cat resume.txt':
        const modal = document.getElementById('resumeModal');
        if (modal) {
          modal.classList.add('open');
          modal.setAttribute('aria-hidden', 'false');
          appendLine(`<div class="output-text">&gt; Opening Resume Snapshot Modal...</div>`);
        }
        break;

      case 'date':
        appendLine(`<div class="output-text">&gt; ${new Date().toString()}</div>`);
        break;

      case 'clear':
        output.innerHTML = '';
        break;

      default:
        if (cmd.startsWith('echo ')) {
          appendLine(`<div class="output-text">${escapeHtml(rawCmd.slice(5))}</div>`);
        } else {
          appendLine(`<div class="output-text" style="color:#f87171;">Command not found: '${escapeHtml(rawCmd)}'. Type '<span class="syntax-cmd">help</span>' for available options.</div>`);
        }
        break;
    }
  }

  // Handle form submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = input.value;
    input.value = '';
    executeCommand(val);
  });

  // Handle Up/Down arrow for history
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        input.value = commandHistory[historyIndex] || '';
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        input.value = commandHistory[historyIndex] || '';
      } else {
        historyIndex = commandHistory.length;
        input.value = '';
      }
    }
  });

  // Quick Chips
  quickChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      if (cmd) {
        executeCommand(cmd);
      }
    });
  });

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

/* ==========================================================================
   4. REAL-TIME MAZE SOLVER & PATHFINDING SIMULATOR
   ========================================================================== */
function initMazeSimulator() {
  const canvas = document.getElementById('mazeCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const btnSolve = document.getElementById('btnMazeSolve');
  const btnGenerate = document.getElementById('btnMazeGenerate');
  const btnReset = document.getElementById('btnMazeReset');
  const btnFocus = document.getElementById('btnFocusSimulator');
  const algoSelect = document.getElementById('simAlgoSelect');
  const statusPip = document.getElementById('simStatusPip');
  const statusLabel = document.getElementById('simStatusLabel');
  const statExplored = document.getElementById('statExplored');
  const statPath = document.getElementById('statPath');
  const statTime = document.getElementById('statTime');

  // Grid dimensions
  const COLS = 29;
  const ROWS = 19;
  let CELL_SIZE = 16;

  // Grid state: 0 = Path, 1 = Wall, 2 = Visited, 3 = Shortest Path
  let grid = [];
  const start = { r: 1, c: 1 };
  const goal = { r: ROWS - 2, c: COLS - 2 };

  let isSolving = false;
  let animationTimer = null;

  function resizeCanvas() {
    const containerWidth = canvas.parentElement.clientWidth;
    const computedWidth = Math.min(containerWidth, 540);
    CELL_SIZE = Math.floor(computedWidth / COLS);
    canvas.width = COLS * CELL_SIZE;
    canvas.height = ROWS * CELL_SIZE;
    drawMaze();
  }

  window.addEventListener('resize', resizeCanvas);

  // Initialize maze with recursive division or DFS for organic labyrinth
  function generateMaze() {
    stopAnimation();

    grid = Array.from({ length: ROWS }, () => Array(COLS).fill(1));

    // Carve passages using randomized DFS
    const stack = [];
    grid[start.r][start.c] = 0;
    stack.push({ r: start.r, c: start.c });

    const directions = [
      { dr: -2, dc: 0 },
      { dr: 2, dc: 0 },
      { dr: 0, dc: -2 },
      { dr: 0, dc: 2 }
    ];

    while (stack.length > 0) {
      const current = stack[stack.length - 1];
      const neighbors = [];

      for (const d of directions) {
        const nr = current.r + d.dr;
        const nc = current.c + d.dc;
        if (nr > 0 && nr < ROWS - 1 && nc > 0 && nc < COLS - 1 && grid[nr][nc] === 1) {
          neighbors.push({ r: nr, c: nc, dr: d.dr, dc: d.dc });
        }
      }

      if (neighbors.length > 0) {
        // Random neighbor
        const chosen = neighbors[Math.floor(Math.random() * neighbors.length)];
        // Carve wall between
        grid[current.r + chosen.dr / 2][current.c + chosen.dc / 2] = 0;
        grid[chosen.r][chosen.c] = 0;
        stack.push({ r: chosen.r, c: chosen.c });
      } else {
        stack.pop();
      }
    }

    // Ensure start & goal are open
    grid[start.r][start.c] = 0;
    grid[goal.r][goal.c] = 0;
    grid[goal.r][goal.c - 1] = 0;
    grid[goal.r - 1][goal.c] = 0;

    // Add extra random loops to provide multiple algorithmic routing options
    for (let r = 2; r < ROWS - 2; r += 2) {
      for (let c = 2; c < COLS - 2; c += 2) {
        if (Math.random() < 0.25) {
          grid[r][c] = 0;
        }
      }
    }

    resetStats();
    updateStatus('ready', 'Maze Generated');
    drawMaze();
  }

  function resetStats() {
    statExplored.textContent = '0';
    statPath.textContent = '0 steps';
    statTime.textContent = '0 ms';
  }

  function updateStatus(state, label) {
    statusPip.className = 'status-pip';
    if (state === 'running') {
      statusPip.classList.add('running');
    } else if (state === 'completed') {
      statusPip.classList.add('completed');
    }
    statusLabel.textContent = label;
  }

  function stopAnimation() {
    if (animationTimer) {
      clearTimeout(animationTimer);
      animationTimer = null;
    }
    isSolving = false;
  }

  function resetSolver() {
    stopAnimation();
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (grid[r][c] === 2 || grid[r][c] === 3) {
          grid[r][c] = 0;
        }
      }
    }
    resetStats();
    updateStatus('ready', 'Ready to Solve');
    drawMaze();
  }

  // Draw the entire maze state
  function drawMaze() {
    ctx.fillStyle = '#04070d';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const val = grid[r][c];
        const x = c * CELL_SIZE;
        const y = r * CELL_SIZE;

        if (val === 1) {
          // Wall
          ctx.fillStyle = '#111827';
          ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
          ctx.strokeRect(x, y, CELL_SIZE, CELL_SIZE);
        } else if (val === 2) {
          // Explored
          ctx.fillStyle = 'rgba(16, 185, 129, 0.45)';
          ctx.fillRect(x + 1, y + 1, CELL_SIZE - 2, CELL_SIZE - 2);
        } else if (val === 3) {
          // Optimal Path
          ctx.fillStyle = '#00ff9d';
          ctx.shadowColor = '#00ff9d';
          ctx.shadowBlur = 8;
          ctx.fillRect(x + 1, y + 1, CELL_SIZE - 2, CELL_SIZE - 2);
          ctx.shadowBlur = 0;
        }
      }
    }

    // Draw Start
    ctx.fillStyle = '#3b82f6';
    ctx.shadowColor = '#3b82f6';
    ctx.shadowBlur = 10;
    ctx.fillRect(start.c * CELL_SIZE + 2, start.r * CELL_SIZE + 2, CELL_SIZE - 4, CELL_SIZE - 4);

    // Draw Goal
    ctx.fillStyle = '#ef4444';
    ctx.shadowColor = '#ef4444';
    ctx.shadowBlur = 10;
    ctx.fillRect(goal.c * CELL_SIZE + 2, goal.r * CELL_SIZE + 2, CELL_SIZE - 4, CELL_SIZE - 4);
    ctx.shadowBlur = 0;
  }

  // Pathfinding Execution: A*, BFS, Dijkstra
  function runPathfinding() {
    if (isSolving) return;
    resetSolver();

    const algorithm = algoSelect.value;
    isSolving = true;
    updateStatus('running', `Running ${algorithm.toUpperCase()}...`);

    const startTime = performance.now();
    const visitedOrder = [];
    const parentMap = new Map();
    const key = (r, c) => `${r},${c}`;

    const delta = [
      { dr: -1, dc: 0 },
      { dr: 1, dc: 0 },
      { dr: 0, dc: -1 },
      { dr: 0, dc: 1 }
    ];

    let found = false;

    if (algorithm === 'bfs') {
      // Breadth-First Search
      const queue = [{ r: start.r, c: start.c }];
      const visited = new Set([key(start.r, start.c)]);

      while (queue.length > 0) {
        const curr = queue.shift();
        visitedOrder.push(curr);

        if (curr.r === goal.r && curr.c === goal.c) {
          found = true;
          break;
        }

        for (const d of delta) {
          const nr = curr.r + d.dr;
          const nc = curr.c + d.dc;
          const nKey = key(nr, nc);

          if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && grid[nr][nc] !== 1 && !visited.has(nKey)) {
            visited.add(nKey);
            parentMap.set(nKey, curr);
            queue.push({ r: nr, c: nc });
          }
        }
      }
    } else {
      // A* Search and Dijkstra
      // Priority Queue simulation
      const openSet = [{ r: start.r, c: start.c, g: 0, f: 0 }];
      const gScore = new Map();
      gScore.set(key(start.r, start.c), 0);
      const closedSet = new Set();

      const heuristic = (r, c) => {
        if (algorithm === 'dijkstra') return 0; // Dijkstra is A* with h=0
        // Manhattan distance for A*
        return Math.abs(r - goal.r) + Math.abs(c - goal.c);
      };

      while (openSet.length > 0) {
        // Sort by f-score
        openSet.sort((a, b) => a.f - b.f);
        const curr = openSet.shift();
        const cKey = key(curr.r, curr.c);

        if (closedSet.has(cKey)) continue;
        closedSet.add(cKey);
        visitedOrder.push(curr);

        if (curr.r === goal.r && curr.c === goal.c) {
          found = true;
          break;
        }

        for (const d of delta) {
          const nr = curr.r + d.dr;
          const nc = curr.c + d.dc;
          const nKey = key(nr, nc);

          if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && grid[nr][nc] !== 1 && !closedSet.has(nKey)) {
            const tentativeG = curr.g + 1;
            const existingG = gScore.get(nKey) ?? Infinity;

            if (tentativeG < existingG) {
              gScore.set(nKey, tentativeG);
              parentMap.set(nKey, curr);
              const f = tentativeG + heuristic(nr, nc);
              openSet.push({ r: nr, c: nc, g: tentativeG, f: f });
            }
          }
        }
      }
    }

    // Reconstruct optimal path
    const optimalPath = [];
    if (found) {
      let curr = { r: goal.r, c: goal.c };
      while (curr && !(curr.r === start.r && curr.c === start.c)) {
        optimalPath.push(curr);
        curr = parentMap.get(key(curr.r, curr.c));
      }
      optimalPath.push(start);
      optimalPath.reverse();
    }

    // Step-by-step animation loop
    let stepIndex = 0;
    const batchSize = 3; // speed up rendering smooth frames

    function animateExploration() {
      for (let i = 0; i < batchSize && stepIndex < visitedOrder.length; i++) {
        const node = visitedOrder[stepIndex++];
        if (!(node.r === start.r && node.c === start.c) && !(node.r === goal.r && node.c === goal.c)) {
          grid[node.r][node.c] = 2; // Visited
        }
      }

      statExplored.textContent = stepIndex.toString();
      drawMaze();

      if (stepIndex < visitedOrder.length) {
        animationTimer = setTimeout(animateExploration, 16);
      } else {
        // Trace shortest path
        animateShortestPath();
      }
    }

    let pathIndex = 0;
    function animateShortestPath() {
      if (pathIndex < optimalPath.length) {
        const node = optimalPath[pathIndex++];
        if (!(node.r === start.r && node.c === start.c) && !(node.r === goal.r && node.c === goal.c)) {
          grid[node.r][node.c] = 3; // Path
        }
        statPath.textContent = `${pathIndex} steps`;
        drawMaze();
        animationTimer = setTimeout(animateShortestPath, 25);
      } else {
        const totalDuration = Math.round(performance.now() - startTime);
        statTime.textContent = `${totalDuration} ms`;
        updateStatus('completed', `Solved (${optimalPath.length} steps)`);
        isSolving = false;
      }
    }

    animateExploration();
  }

  btnSolve.addEventListener('click', runPathfinding);
  btnGenerate.addEventListener('click', generateMaze);
  btnReset.addEventListener('click', resetSolver);

  if (btnFocus) {
    btnFocus.addEventListener('click', () => {
      canvas.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(runPathfinding, 400);
    });
  }

  // Initial setup
  resizeCanvas();
  generateMaze();
}

/* ==========================================================================
   5. SKILLS CATEGORY FILTER TABS
   ========================================================================== */
function initSkillsFilter() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.skill-category-card');

  if (!filterTabs.length || !cards.length) return;

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || filter === category) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   6. CONTACT FORM VALIDATION & INTERACTIVE SUBMISSION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const nameInput = document.getElementById('contactName');
  const emailInput = document.getElementById('contactEmail');
  const messageInput = document.getElementById('contactMessage');
  const submitBtn = document.getElementById('btnSubmitForm');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');

  if (!form) return;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    let isValid = true;

    // Validate Name
    if (!nameInput.value.trim()) {
      nameError.classList.add('visible');
      isValid = false;
    } else {
      nameError.classList.remove('visible');
    }

    // Validate Email
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
      emailError.classList.add('visible');
      isValid = false;
    } else {
      emailError.classList.remove('visible');
    }

    // Validate Message
    if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
      messageError.classList.add('visible');
      isValid = false;
    } else {
      messageError.classList.remove('visible');
    }

    if (!isValid) return;

    // Submit state simulation
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    await new Promise(resolve => setTimeout(resolve, 1100));

    submitBtn.classList.remove('loading');
    submitBtn.disabled = false;

    // Show toast
    showToastNotification(`Thank you, ${nameInput.value.trim()}! Message dispatched successfully.`);

    // Reset fields
    form.reset();
  });
}

/* ==========================================================================
   7. CLIPBOARD COPY & TOAST NOTIFICATION
   ========================================================================== */
function initClipboardCopy() {
  const copyButtons = document.querySelectorAll('[data-copy-text]');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const text = btn.getAttribute('data-copy-text');
      if (!text) return;

      try {
        await navigator.clipboard.writeText(text);
        showToastNotification(`Copied to clipboard: ${text}`);
      } catch (err) {
        // Fallback for restricted clipboard contexts
        const temp = document.createElement('textarea');
        temp.value = text;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
        showToastNotification(`Copied to clipboard: ${text}`);
      }
    });
  });
}

let toastTimer = null;
function showToastNotification(message) {
  const toast = document.getElementById('toastNotification');
  const toastMsg = document.getElementById('toastMessage');

  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.add('visible');

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('visible');
  }, 3200);
}

/* ==========================================================================
   8. RESUME PREVIEW MODAL COMPONENT
   ========================================================================== */
function initResumeModal() {
  const btnOpen = document.getElementById('btnResumeModal');
  const modal = document.getElementById('resumeModal');
  const btnClose = document.getElementById('btnCloseResumeModal');
  const btnCopy = document.getElementById('btnCopyResumeSummary');
  const btnPrint = document.getElementById('btnPrintResume');

  if (!modal) return;

  function openModal() {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (btnOpen) btnOpen.addEventListener('click', openModal);
  if (btnClose) btnClose.addEventListener('click', closeModal);

  // Close on backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  // Print trigger
  if (btnPrint) {
    btnPrint.addEventListener('click', () => {
      window.print();
    });
  }

  // Copy resume summary
  if (btnCopy) {
    btnCopy.addEventListener('click', async () => {
      const summaryText = `Adham Ahmed Abbas - AI Automation Engineer & Computer Science Specialist
Cairo, Egypt | Email: adhamabass2020@gmail.com | Phone: +20 1149746364
Education: Bachelor of Computers and AI, Beni-Suef University (GPA: 3.1)
Experience: AI Automation Engineer Trainee - DEPI Round 5 (AMIT Learning)
Skills: Python, C++, Workflow Automation, Prompt Engineering, LLMs, Algorithms, SQL.`;

      try {
        await navigator.clipboard.writeText(summaryText);
        showToastNotification('Resume summary copied to clipboard!');
      } catch (err) {
        showToastNotification('Resume summary copied to clipboard!');
      }
    });
  }
}
