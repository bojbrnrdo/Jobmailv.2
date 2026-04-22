// =======================================================
// VM CORE (UNCHANGED)
// =======================================================
const loginScreen = document.getElementById("login-screen");
const desktopScreen = document.getElementById("desktop-screen");
const enterVmBtn = document.getElementById("enter-vm-btn");

const desktopIcons = document.querySelectorAll(".desktop-icon");
const taskbarApps = document.querySelectorAll(".taskbar-app");
const windowControls = document.querySelectorAll(".win-btn");
const appWindows = document.querySelectorAll(".app-window");
const taskbarTime = document.getElementById("taskbar-time");

const windowsMap = {
  jobmail: document.getElementById("window-jobmail"),
  browser: document.getElementById("window-browser"),
  explorer: document.getElementById("window-explorer")
};

function showDesktop() {
  loginScreen.classList.add("hidden");
  desktopScreen.classList.remove("hidden");
  openApp("jobmail");
}

function openApp(appName) {
  const targetWindow = windowsMap[appName];
  if (!targetWindow) return;

  targetWindow.classList.remove("hidden");
  bringToFront(targetWindow);

  taskbarApps.forEach(btn => {
    btn.classList.toggle("active-taskbar-app", btn.dataset.app === appName);
  });
}

function closeApp(windowId) {
  const target = document.getElementById(windowId);
  if (!target) return;
  target.classList.add("hidden");
}

function minimizeApp(windowId) {
  const target = document.getElementById(windowId);
  if (!target) return;
  target.classList.add("hidden");
}

function maximizeApp(windowId) {
  const target = document.getElementById(windowId);
  if (!target) return;
  target.classList.toggle("maximized");
  bringToFront(target);
}

let zCounter = 20;

function bringToFront(winEl) {
  zCounter += 1;
  winEl.style.zIndex = zCounter;
}

enterVmBtn.addEventListener("click", showDesktop);

desktopIcons.forEach(icon => {
  icon.addEventListener("click", () => openApp(icon.dataset.app));
});

taskbarApps.forEach(btn => {
  btn.addEventListener("click", () => openApp(btn.dataset.app));
});

windowControls.forEach(btn => {
  btn.addEventListener("click", () => {
    const action = btn.dataset.action;
    const target = btn.dataset.target;

    if (action === "close") closeApp(target);
    if (action === "minimize") minimizeApp(target);
    if (action === "maximize") maximizeApp(target);
  });
});

appWindows.forEach(win => {
  win.addEventListener("mousedown", () => bringToFront(win));
});

function updateTaskbarTime() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  taskbarTime.textContent = `${hours}:${minutes} ${ampm}`;
}

setInterval(updateTaskbarTime, 1000);
updateTaskbarTime();

// =======================================================
// 🔥 HIGHLIGHT FUNCTION (ADDED)
// =======================================================
function applyHighlights(email) {
  let content = email.body;

  if (!email.highlights) return content;

  email.highlights.forEach(h => {
    const escaped = h.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escaped, "gi");

    content = content.replace(regex, match => {
      return `<span class="phish-highlight" title="${h.reason}">${match}</span>`;
    });
  });

  return content;
}

// =======================================================
// JOBMAIL SIMULATION (ORIGINAL + ENHANCED)
// =======================================================
const CONFIG = {
  correctScore: 20,
  wrongScore: -10
};

const EMAILS = [
  // 🔥 KEEP ALL YOUR ORIGINAL EMAILS
  // ADD highlights field like this:

  {
    id: 1,
    type: "phishing",
    category: "Security",
    senderName: "SOC",
    senderEmail: "soc@bountysecure-alerts.com",
    senderInitial: "S",
    tag: "Inbox",
    subject: "Security Alert: Suspicious Login Attempt Detected",
    preview: "We detected a suspicious login attempt on your account.",
    time: "10:24 AM",
    body: `Dear Employee,

We detected a suspicious login attempt on your account.

Location: Moscow, Russia

<a href="#" class="fake-button">Secure My Account</a>
`,
    explanation: `This email is phishing.`,
    highlights: [
      { text: "suspicious login attempt", reason: "Urgency / fear tactic" },
      { text: "Moscow, Russia", reason: "Unusual login location" },
      { text: "Secure My Account", reason: "Fake verification button" }
    ]
  }

  // 👉 Repeat for other emails
];

// ================= ORIGINAL STATE =================
let filteredEmails = [...EMAILS];
let selectedEmailId = EMAILS[0]?.id || null;
let score = 0;
let mistakes = 0;
let reviewedCount = 0;

const resolvedMap = {};
const decisionMap = {};

EMAILS.forEach(email => {
  resolvedMap[email.id] = false;
  decisionMap[email.id] = null;
});

// ================= ORIGINAL ELEMENTS =================
const inboxList = document.getElementById("inbox-list");
const subjectEl = document.getElementById("email-subject");
const bodyEl = document.getElementById("email-body");
const feedbackEl = document.getElementById("feedback");

const legitBtn = document.getElementById("btn-legit");
const phishBtn = document.getElementById("btn-phish");
const nextBtn = document.getElementById("btn-next");

// =======================================================
// 🔥 UPDATED VIEWER (ONLY CHANGE HERE)
// =======================================================
function renderViewer() {
  const email = EMAILS.find(e => e.id === selectedEmailId);

  if (!email) return;

  subjectEl.textContent = email.subject;

  if (resolvedMap[email.id]) {
    bodyEl.innerHTML = applyHighlights(email); // 🔥 highlight AFTER decision
  } else {
    bodyEl.innerHTML = email.body;
  }

  if (resolvedMap[email.id]) {
    feedbackEl.innerHTML = email.explanation;
    nextBtn.disabled = false;
  } else {
    feedbackEl.textContent = "Decide whether this is legitimate or phishing.";
    nextBtn.disabled = true;
  }
}

// =======================================================
// ORIGINAL LOGIC (UNCHANGED)
// =======================================================
function handleDecision(choice) {
  const email = EMAILS.find(e => e.id === selectedEmailId);
  if (!email || resolvedMap[email.id]) return;

  const correct =
    (choice === "legit" && email.type === "legitimate") ||
    (choice === "phish" && email.type === "phishing");

  decisionMap[email.id] = choice;
  resolvedMap[email.id] = true;
  reviewedCount++;

  if (correct) score += CONFIG.correctScore;
  else {
    score += CONFIG.wrongScore;
    mistakes++;
  }

  renderViewer();
}

function goNext() {
  const idx = filteredEmails.findIndex(e => e.id === selectedEmailId);
  if (filteredEmails[idx + 1]) {
    selectedEmailId = filteredEmails[idx + 1].id;
  }
  renderViewer();
}

// =======================================================
// EVENTS (UNCHANGED)
// =======================================================
legitBtn.addEventListener("click", () => handleDecision("legit"));
phishBtn.addEventListener("click", () => handleDecision("phish"));
nextBtn.addEventListener("click", goNext);

// =======================================================
// INIT
// =======================================================
renderViewer();
