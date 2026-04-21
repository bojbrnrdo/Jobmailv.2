// =======================================================
// VM CORE
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
// JOBMAIL SIMULATION
// =======================================================
const CONFIG = {
  correctScore: 20,
  wrongScore: -10
};

const EMAILS = [
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
Device: Unknown Windows Device
Time: May 1, 2026 02:13 AM (UTC)
IP Address: 185.220.101.15

If this was not you, your account may be compromised.

To secure your account immediately, please verify your identity by clicking the button below and follow the instructions.

<a href="#" class="fake-button">Secure My Account</a>

If no action is taken within 6 hours, your account will be temporarily locked for your own protection.

Stay safe,
Security Operations Center (SOC)
Bounty Security Team`,
    explanation: `This email is <strong>phishing</strong>.<br><br>
• The sender domain is not the usual corporate domain.<br>
• It pressures you with urgent account-lock language.<br>
• It pushes you to click a verification button.<br>
• It uses fear to trigger a fast reaction.`
  },
  {
    id: 2,
    type: "phishing",
    category: "IT Support",
    senderName: "IT Support",
    senderEmail: "it-support@bountysupport-mail.com",
    senderInitial: "I",
    tag: "Inbox",
    subject: "ACTION REQUIRED: Email Storage Limit Reached",
    preview: "Your mailbox has exceeded storage and may be disabled soon.",
    time: "9:11 AM",
    body: `Dear User,

Our monitoring system detected that your mailbox has exceeded its storage allocation.

As a result, you may experience:
• Failure to send or receive new emails
• Delayed internal communication
• Temporary account suspension within 24 hours

To avoid interruption, verify and upgrade your mailbox immediately below:

<a href="#" class="fake-button">Upgrade Mailbox</a>

Failure to complete this process today may result in permanent email deactivation.

Regards,
IT Support Team`,
    explanation: `This email is <strong>phishing</strong>.<br><br>
• The sender address is suspicious.<br>
• “Dear User” is generic.<br>
• It uses urgency and fear.<br>
• It asks you to verify through a link instead of the official portal.`
  },
  {
    id: 3,
    type: "legitimate",
    category: "HR",
    senderName: "HR Department",
    senderEmail: "hr@bountyfresh.com.ph",
    senderInitial: "H",
    tag: "Inbox",
    subject: "Updated Company Leave Policy – Effective May 1, 2026",
    preview: "Important updates to your leave benefits and policy.",
    time: "Yesterday",
    body: `Dear Team,

We hope this message finds you well.

As part of our effort to improve employee benefits and align with updated labor compliance standards, we are implementing revisions to our Leave Policy effective May 1, 2026.

Key updates include:
• Increased Vacation Leave credits from 10 to 12 days annually
• Introduction of Mental Wellness Leave (2 days per year)
• Expanded Sick Leave coverage to include teleconsultation reimbursements
• Updated leave conversion guidelines for unused credits

You may access the complete policy document through the official HR Portal:
https://portal.bountyfresh.com.ph/hr/leave-policy-2026

If you have any questions, please contact HR or your department head.

Warm regards,
Human Resources Department
Bounty Fresh Group`,
    explanation: `This email is <strong>legitimate</strong>.<br><br>
• The sender uses the expected company domain.<br>
• The tone is professional and informational.<br>
• It references a normal internal process.<br>
• It does not create panic or rush you.`
  },
  {
    id: 4,
    type: "phishing",
    category: "Finance",
    senderName: "Kenneth Cheng",
    senderEmail: "kenneth.cheng.bounty@gmail.com",
    senderInitial: "K",
    tag: "Inbox",
    subject: "Urgent Request – Confidential Payment Needed Today",
    preview: "Need your immediate assistance on a confidential matter.",
    time: "Yesterday",
    body: `Hi,

I need your immediate assistance on a confidential matter.

We are currently finalizing a vendor agreement, and I need a payment processed today to secure the deal. This is time-sensitive and must not be delayed.

Please confirm if you are available so I can send you the transfer instructions. Do not discuss this with anyone else yet, as this is part of a confidential negotiation.

I will be in meetings most of the day, so respond directly to this email as soon as possible.

Thank you.

Kenneth`,
    explanation: `This email is <strong>phishing</strong>.<br><br>
• It uses a free email account instead of a company address.<br>
• It asks for secrecy and urgency.<br>
• It requests a financial action outside normal process.<br>
• This is a classic business email compromise pattern.`
  },
  {
    id: 5,
    type: "legitimate",
    category: "Operations",
    senderName: "Operations Team",
    senderEmail: "operations@bountyfresh.com.ph",
    senderInitial: "O",
    tag: "Inbox",
    subject: "Weekly Operations Meeting Reminder",
    preview: "Reminder for tomorrow’s weekly sync and agenda overview.",
    time: "Apr 30",
    body: `Good day Team,

This is a reminder for our weekly operations sync scheduled tomorrow at 10:00 AM.

Agenda:
• KPI review
• Department updates
• Ongoing project blockers
• Upcoming priorities for next week

Meeting link:
https://meet.google.com/abc-defg-hij

Please be on time and review your assigned action items before the meeting.

Thank you,
Operations Team`,
    explanation: `This email is <strong>legitimate</strong>.<br><br>
• The sender address matches an expected internal department address.<br>
• The content is routine and aligned with normal work processes.<br>
• It does not create panic or pressure.<br>
• The request is ordinary and easy to verify.`
  }
];

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

const inboxList = document.getElementById("inbox-list");
const scoreEl = document.getElementById("score");
const mistakesEl = document.getElementById("mistakes");
const inboxCountEl = document.getElementById("inbox-count");
const progressBarEl = document.getElementById("progress-bar");
const progressTextEl = document.getElementById("progress-text");
const mailUsageTextEl = document.getElementById("mail-usage-text");
const mailPageMetaEl = document.getElementById("mail-page-meta");
const viewerPositionEl = document.getElementById("viewer-position");

const subjectEl = document.getElementById("email-subject");
const senderNameEl = document.getElementById("sender-name");
const senderEmailEl = document.getElementById("email-sender");
const senderAvatarEl = document.getElementById("sender-avatar");
const messageTagEl = document.getElementById("message-tag");
const messageTimeEl = document.getElementById("message-time");
const bodyEl = document.getElementById("email-body");
const feedbackEl = document.getElementById("feedback");

const legitBtn = document.getElementById("btn-legit");
const phishBtn = document.getElementById("btn-phish");
const nextBtn = document.getElementById("btn-next");
const searchInput = document.getElementById("search-input");

function getEmailById(id) {
  return EMAILS.find(email => email.id === id) || null;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function stripHtml(html) {
  const temp = document.createElement("div");
  temp.innerHTML = html;
  return temp.textContent || temp.innerText || "";
}

function updateHud() {
  scoreEl.textContent = score;
  mistakesEl.textContent = mistakes;
  inboxCountEl.textContent = filteredEmails.length;

  const total = EMAILS.length;
  const percent = total === 0 ? 0 : (reviewedCount / total) * 100;
  progressBarEl.style.width = `${percent}%`;
  progressTextEl.textContent = `${reviewedCount} of ${total} reviewed`;
  mailUsageTextEl.textContent = `${reviewedCount} reviewed`;
  mailPageMetaEl.textContent = `${filteredEmails.length} visible`;
}

function renderInbox() {
  inboxList.innerHTML = "";

  filteredEmails.forEach(email => {
    const selected = email.id === selectedEmailId;
    const resolved = resolvedMap[email.id];
    const unread = !resolved;

    const item = document.createElement("div");
    item.className = [
      "mail-item",
      selected ? "selected" : "",
      resolved ? "resolved" : "",
      unread ? "unread" : ""
    ].join(" ").trim();

    item.innerHTML = `
      <div class="mail-item-icon"></div>
      <div class="mail-main">
        <div class="mail-top-line">
          <div class="mail-sender">${escapeHtml(email.senderName)}</div>
          <div class="mail-tag">${escapeHtml(email.category)}</div>
        </div>
        <div class="mail-subject">${escapeHtml(email.subject)}</div>
        <div class="mail-preview">${escapeHtml(email.preview)}</div>
      </div>
      <div class="mail-time">${escapeHtml(email.time)}</div>
    `;

    item.addEventListener("click", () => {
      selectedEmailId = email.id;
      renderInbox();
      renderViewer();
    });

    inboxList.appendChild(item);
  });

  updateHud();
  updateViewerPosition();
}

function renderViewer() {
  const email = getEmailById(selectedEmailId);

  if (!email) {
    subjectEl.textContent = "No email selected";
    senderNameEl.textContent = "—";
    senderEmailEl.textContent = "<no-sender>";
    senderAvatarEl.textContent = "—";
    messageTagEl.textContent = "Inbox";
    messageTimeEl.textContent = "—";
    bodyEl.innerHTML = "Please select an email from the inbox.";
    feedbackEl.className = "feedback-panel";
    feedbackEl.textContent = "Open an email and decide whether it is legitimate or phishing.";
    legitBtn.disabled = true;
    phishBtn.disabled = true;
    nextBtn.disabled = true;
    return;
  }

  subjectEl.textContent = email.subject;
  senderNameEl.textContent = email.senderName;
  senderEmailEl.textContent = `<${email.senderEmail}>`;
  senderAvatarEl.textContent = email.senderInitial;
  messageTagEl.textContent = email.tag;
  messageTimeEl.textContent = email.time;
  bodyEl.innerHTML = email.body;

  const resolved = resolvedMap[email.id];
  const decision = decisionMap[email.id];

  if (resolved) {
    const isCorrect =
      (decision === "legit" && email.type === "legitimate") ||
      (decision === "phish" && email.type === "phishing");

    feedbackEl.className = `feedback-panel ${isCorrect ? "success" : "error"}`;
    feedbackEl.innerHTML = `
      <strong>${isCorrect ? "Correct decision." : "Incorrect decision."}</strong><br><br>
      ${email.explanation}
    `;
    legitBtn.disabled = true;
    phishBtn.disabled = true;
    nextBtn.disabled = false;
  } else {
    feedbackEl.className = "feedback-panel";
    feedbackEl.textContent = "Decide whether this message is legitimate or phishing.";
    legitBtn.disabled = false;
    phishBtn.disabled = false;
    nextBtn.disabled = true;
  }

  updateViewerPosition();
}

function updateViewerPosition() {
  const index = filteredEmails.findIndex(email => email.id === selectedEmailId);
  const current = index >= 0 ? index + 1 : 0;
  viewerPositionEl.textContent = `${current} of ${filteredEmails.length}`;
}

function handleDecision(choice) {
  const email = getEmailById(selectedEmailId);
  if (!email || resolvedMap[email.id]) return;

  const isCorrect =
    (choice === "legit" && email.type === "legitimate") ||
    (choice === "phish" && email.type === "phishing");

  decisionMap[email.id] = choice;
  resolvedMap[email.id] = true;
  reviewedCount += 1;

  if (isCorrect) {
    score += CONFIG.correctScore;
  } else {
    score += CONFIG.wrongScore;
    mistakes += 1;
  }

  renderInbox();
  renderViewer();
}

function goToNextEmail() {
  const currentIndex = filteredEmails.findIndex(email => email.id === selectedEmailId);

  if (currentIndex >= 0 && filteredEmails[currentIndex + 1]) {
    selectedEmailId = filteredEmails[currentIndex + 1].id;
    renderInbox();
    renderViewer();
    return;
  }

  const unresolved = filteredEmails.find(email => !resolvedMap[email.id]);
  if (unresolved) {
    selectedEmailId = unresolved.id;
    renderInbox();
    renderViewer();
    return;
  }

  feedbackEl.className = "feedback-panel success";
  feedbackEl.innerHTML = `
    <strong>Simulation complete.</strong><br><br>
    Final score: <strong>${score}</strong><br>
    Total mistakes: <strong>${mistakes}</strong><br><br>
    Review the emails again to study the indicators of legitimate and phishing messages.
  `;
  nextBtn.disabled = true;
}

function applySearch() {
  const query = searchInput.value.trim().toLowerCase();

  filteredEmails = EMAILS.filter(email => {
    const haystack = [
      email.senderName,
      email.senderEmail,
      email.subject,
      email.preview,
      stripHtml(email.body),
      email.category
    ].join(" ").toLowerCase();

    return haystack.includes(query);
  });

  if (!filteredEmails.some(email => email.id === selectedEmailId)) {
    selectedEmailId = filteredEmails[0]?.id || null;
  }

  renderInbox();
  renderViewer();
}

legitBtn.addEventListener("click", () => handleDecision("legit"));
phishBtn.addEventListener("click", () => handleDecision("phish"));
nextBtn.addEventListener("click", goToNextEmail);
searchInput.addEventListener("input", applySearch);

function initJobMail() {
  selectedEmailId = filteredEmails[0]?.id || null;
  updateHud();
  renderInbox();
  renderViewer();
}

initJobMail();