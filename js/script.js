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
  if (target) target.classList.add("hidden");
}

function minimizeApp(windowId) {
  const target = document.getElementById(windowId);
  if (target) target.classList.add("hidden");
}

function maximizeApp(windowId) {
  const target = document.getElementById(windowId);
  if (!target) return;
  target.classList.toggle("maximized");
  bringToFront(target);
}

let zCounter = 20;
function bringToFront(winEl) {
  zCounter++;
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
  let h = now.getHours();
  const m = String(now.getMinutes()).padStart(2, "0");
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  taskbarTime.textContent = `${h}:${m} ${ampm}`;
}
setInterval(updateTaskbarTime, 1000);
updateTaskbarTime();


// =======================================================
// 🔥 HIGHLIGHT FUNCTION
// =======================================================
function applyHighlights(email) {
  let content = email.body;

  if (!email.highlights) return content;

  email.highlights.forEach(h => {
    const escaped = h.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escaped, "gi");

    content = content.replace(regex, match => {
      return `<span class="phish-highlight">${match}</span>`;
    });
  });

  return content;
}


// =======================================================
// JOBMAIL SYSTEM (UNCHANGED STRUCTURE)
// =======================================================
const EMAILS = [
  {
    id: 1,
    type: "phishing",
    senderName: "SOC",
    senderEmail: "soc@fake-alerts.com",
    senderInitial: "S",
    tag: "Inbox",
    subject: "Suspicious Login Attempt",
    preview: "We detected suspicious activity.",
    time: "10:24 AM",
    body: `Dear Employee,

We detected a suspicious login attempt.

Location: Moscow, Russia

<a href="#" class="fake-button">Secure My Account</a>
`,
    highlights: [
      { text: "suspicious login attempt" },
      { text: "Moscow, Russia" },
      { text: "Secure My Account" }
    ]
  }
];

let filteredEmails = [...EMAILS];
let selectedEmailId = EMAILS[0].id;

const resolvedMap = {};
EMAILS.forEach(e => resolvedMap[e.id] = false);

// ELEMENTS
const subjectEl = document.getElementById("email-subject");
const bodyEl = document.getElementById("email-body");
const feedbackEl = document.getElementById("feedback");

const legitBtn = document.getElementById("btn-legit");
const phishBtn = document.getElementById("btn-phish");
const nextBtn = document.getElementById("btn-next");


// =======================================================
// 🔥 UPDATED VIEWER (NO BULLET EXPLANATION)
// =======================================================
function renderViewer() {
  const email = EMAILS.find(e => e.id === selectedEmailId);

  subjectEl.textContent = email.subject;

  if (resolvedMap[email.id]) {
    bodyEl.innerHTML = applyHighlights(email);

    // 🔥 REMOVE BULLETS → SIMPLE FEEDBACK
    feedbackEl.textContent = "Highlighted areas show why this email is suspicious.";
  } else {
    bodyEl.innerHTML = email.body;
    feedbackEl.textContent = "Decide if this is legitimate or phishing.";
  }
}


// =======================================================
// ACTIONS
// =======================================================
function handleDecision(choice) {
  const email = EMAILS.find(e => e.id === selectedEmailId);
  if (resolvedMap[email.id]) return;

  resolvedMap[email.id] = true;

  renderViewer();
}

function goNext() {
  renderViewer();
}

legitBtn.addEventListener("click", () => handleDecision("legit"));
phishBtn.addEventListener("click", () => handleDecision("phish"));
nextBtn.addEventListener("click", goNext);


// INIT
renderViewer();
