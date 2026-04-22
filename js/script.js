// =======================================================
// SECTION 001: VM CORE ELEMENTS
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

// =======================================================
// SECTION 002: VM CORE STATE
// =======================================================
let zCounter = 20;

// =======================================================
// SECTION 003: VM CORE HELPERS
// =======================================================
function bringToFront(winEl) {
  if (!winEl) return;
  zCounter += 1;
  winEl.style.zIndex = zCounter;
}

function showDesktop() {
  if (loginScreen) loginScreen.classList.add("hidden");
  if (desktopScreen) desktopScreen.classList.remove("hidden");
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

  const appName = windowId.replace("window-", "");
  taskbarApps.forEach(btn => {
    if (btn.dataset.app === appName) {
      btn.classList.remove("active-taskbar-app");
    }
  });
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

function updateTaskbarTime() {
  if (!taskbarTime) return;

  const now = new Date();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  taskbarTime.textContent = `${hours}:${minutes} ${ampm}`;
}

// =======================================================
// SECTION 004: VM CORE EVENTS
// =======================================================
if (enterVmBtn) {
  enterVmBtn.addEventListener("click", showDesktop);
}

desktopIcons.forEach(icon => {
  icon.addEventListener("click", () => {
    openApp(icon.dataset.app);
  });
});

taskbarApps.forEach(btn => {
  btn.addEventListener("click", () => {
    openApp(btn.dataset.app);
  });
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
  win.addEventListener("mousedown", () => {
    bringToFront(win);
  });
});

setInterval(updateTaskbarTime, 1000);
updateTaskbarTime();

// =======================================================
// SECTION 005: TRAINING CONFIG
// =======================================================
const CONFIG = {
  statusCorrect: "✓ Correct",
  statusIncorrect: "✕ Incorrect",
  statusComplete: "✓ Simulation Complete",
  keyboardLegit: "l",
  keyboardPhish: "p",
  keyboardNext: "n",
  reportRecipient: "cyberops@bounty.com.ph"
};

// =======================================================
// SECTION 006: EMAIL DATASET
// =======================================================
const EMAILS = [
  {
    id: 1,
    type: "phishing",
    category: "Security",
    senderName: "SOC",
    senderEmail: "soc@bountysecure-alerts.xyz",
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

<a href="#" class="fake-button">Change Password Now</a>

If no action is taken within 6 hours, your account will be temporarily locked for your own protection.

Stay safe,
Security Operations Center (SOC)
Bounty Security Team`,
    highlights: [
      { text: "soc@bountysecure-alerts.xyz" },
      { text: "Suspicious Login Attempt Detected" },
      { text: "suspicious login attempt" },
      { text: "Moscow, Russia" },
      { text: "verify your identity" },
      { text: "Change Password Now" },
      { text: "within 6 hours" },
      { text: "temporarily locked" }
    ]
  },
  {
    id: 2,
    type: "phishing",
    category: "IT Support",
    senderName: "IT Helpdesk",
    senderEmail: "it-helpdesk@bountyfresh-support.co",
    senderInitial: "I",
    tag: "Inbox",
    subject: "Mailbox Limit Exceed",
    preview: "Your mailbox is full.",
    time: "9:11 AM",
    body: `Dear User,

Your mailbox is exceed the storage limit.

You will not recieve new email unless action is taken.

Please verify now:

<a href="#" class="fake-button">Upgrade Mailbox Now</a>

System will disable your email today if ignored.

Thanks,
IT Team`,
    highlights: [
      { text: "it-helpdesk@bountyfresh-support.co" },
      { text: "Mailbox Limit Exceed" },
      { text: "Dear User" },
      { text: "mailbox is exceed the storage limit" },
      { text: "recieve new email" },
      { text: "Upgrade Mailbox Now" },
      { text: "disable your email today" }
    ]
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
    highlights: []
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
    highlights: [
      { text: "kenneth.cheng.bounty@gmail.com" },
      { text: "Urgent Request" },
      { text: "immediate assistance" },
      { text: "payment processed today" },
      { text: "time-sensitive" },
      { text: "Do not discuss this with anyone else" },
      { text: "respond directly to this email as soon as possible" }
    ]
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
    highlights: []
  }
];

// =======================================================
// SECTION 007: TRAINING STATE
// =======================================================
let filteredEmails = [...EMAILS];
let selectedEmailId = EMAILS[0]?.id || null;
let itemsCorrected = 0;
let mistakes = 0;
let reviewedCount = 0;

const resolvedMap = {};
const decisionMap = {};
const correctnessMap = {};

EMAILS.forEach(email => {
  resolvedMap[email.id] = false;
  decisionMap[email.id] = null;
  correctnessMap[email.id] = null;
});

// =======================================================
// SECTION 008: ELEMENT REFERENCES
// =======================================================
const inboxList = document.getElementById("inbox-list");
const itemsCorrectedEl = document.getElementById("score");
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

const viewerContentEl = document.querySelector(".viewer-content");
const viewerPanelEl = document.querySelector(".viewer-panel");
const decisionPanelEl = document.querySelector(".decision-panel");
const viewerFooterEl = document.querySelector(".viewer-footer");
const messageTitleRowEl = document.querySelector(".message-title-row");

// =======================================================
// SECTION 009: STATUS PILL
// =======================================================
let resultStatusEl = null;

function createResultStatusPill() {
  if (!messageTitleRowEl) return null;

  const existing = document.getElementById("result-status-pill");
  if (existing) {
    resultStatusEl = existing;
    return existing;
  }

  const pill = document.createElement("span");
  pill.id = "result-status-pill";
  pill.textContent = "";
  pill.style.display = "none";
  pill.style.padding = "6px 12px";
  pill.style.borderRadius = "999px";
  pill.style.fontSize = "12px";
  pill.style.fontWeight = "700";
  pill.style.letterSpacing = "0.2px";
  pill.style.marginLeft = "4px";
  pill.style.border = "1px solid transparent";
  pill.style.lineHeight = "1";
  pill.style.userSelect = "none";

  messageTitleRowEl.appendChild(pill);
  resultStatusEl = pill;
  return pill;
}

function setResultStatus(type, text) {
  const pill = createResultStatusPill();
  if (!pill) return;

  if (!text) {
    pill.style.display = "none";
    pill.textContent = "";
    return;
  }

  pill.textContent = text;
  pill.style.display = "inline-flex";
  pill.style.alignItems = "center";

  if (type === "success") {
    pill.style.background = "#dcfce7";
    pill.style.color = "#166534";
    pill.style.borderColor = "#bbf7d0";
  } else if (type === "error") {
    pill.style.background = "#fee2e2";
    pill.style.color = "#991b1b";
    pill.style.borderColor = "#fecaca";
  } else {
    pill.style.background = "#eef2ff";
    pill.style.color = "#3730a3";
    pill.style.borderColor = "#c7d2fe";
  }
}

// =======================================================
// SECTION 010: UI FIXES
// =======================================================
function applyInterfaceFixes() {
  if (feedbackEl) {
    feedbackEl.style.display = "none";
    feedbackEl.style.height = "0";
    feedbackEl.style.minHeight = "0";
    feedbackEl.style.padding = "0";
    feedbackEl.style.margin = "0";
    feedbackEl.style.border = "0";
    feedbackEl.textContent = "";
  }

  if (viewerPanelEl) {
    viewerPanelEl.style.display = "flex";
    viewerPanelEl.style.flexDirection = "column";
  }

  if (viewerContentEl) {
    viewerContentEl.style.flex = "1";
    viewerContentEl.style.paddingTop = "18px";
    viewerContentEl.style.paddingBottom = "8px";
    viewerContentEl.style.minHeight = "0";
  }

  if (bodyEl) {
    bodyEl.style.paddingTop = "6px";
    bodyEl.style.paddingBottom = "8px";
  }

  if (decisionPanelEl) {
    decisionPanelEl.style.paddingTop = "8px";
    decisionPanelEl.style.paddingBottom = "8px";
    decisionPanelEl.style.marginTop = "4px";
    decisionPanelEl.style.gap = "14px";
  }

  if (viewerFooterEl) {
    viewerFooterEl.style.paddingTop = "0";
    viewerFooterEl.style.paddingBottom = "16px";
  }

  if (nextBtn) {
    nextBtn.style.minWidth = "145px";
  }

  createResultStatusPill();
}

applyInterfaceFixes();

// =======================================================
// SECTION 011: GENERIC HELPERS
// =======================================================
function getEmailById(id) {
  return EMAILS.find(email => email.id === id) || null;
}

function escapeHtml(value) {
  return String(value)
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

function normalizeTextForRegex(text) {
  return String(text).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function hasHighlights(email) {
  return Array.isArray(email.highlights) && email.highlights.length > 0;
}

function isDecisionCorrect(choice, emailType) {
  return (
    (choice === "legit" && emailType === "legitimate") ||
    (choice === "phish" && emailType === "phishing")
  );
}

// =======================================================
// SECTION 012: HIGHLIGHT ENGINE
// =======================================================
function buildHighlightSpan(match) {
  return `<span class="phish-highlight" style="
    background: rgba(239, 68, 68, 0.15);
    color: #b91c1c;
    font-weight: 700;
    padding: 1px 4px;
    border-radius: 4px;
    box-shadow: inset 0 -1px 0 rgba(185, 28, 28, 0.18);
  ">${match}</span>`;
}

function applyHighlightsToPlainText(text, highlights) {
  if (!text || !Array.isArray(highlights) || highlights.length === 0) return text;

  let result = text;

  highlights.forEach(item => {
    if (!item || !item.text) return;
    const escaped = normalizeTextForRegex(item.text);
    const regex = new RegExp(escaped, "gi");

    result = result.replace(regex, match => buildHighlightSpan(match));
  });

  return result;
}

function applyHighlightsToBodyHtml(email) {
  if (!email || !hasHighlights(email)) return email?.body || "";

  let content = email.body;

  email.highlights.forEach(item => {
    if (!item || !item.text) return;

    const escaped = normalizeTextForRegex(item.text);
    const regex = new RegExp(escaped, "gi");

    content = content.replace(regex, match => buildHighlightSpan(match));
  });

  return content;
}

function renderSenderEmailWithHighlight(email, resolved) {
  if (!senderEmailEl) return;

  if (!email) {
    senderEmailEl.textContent = "<no-sender>";
    return;
  }

  if (resolved && email.type === "phishing" && hasHighlights(email)) {
    const highlightedEmail = applyHighlightsToPlainText(email.senderEmail, email.highlights);
    senderEmailEl.innerHTML = `&lt;${highlightedEmail}&gt;`;
  } else {
    senderEmailEl.textContent = `<${email.senderEmail}>`;
  }
}

function renderSubjectWithHighlight(email, resolved) {
  if (!subjectEl) return;

  if (!email) {
    subjectEl.textContent = "No email selected";
    return;
  }

  if (resolved && email.type === "phishing" && hasHighlights(email)) {
    subjectEl.innerHTML = applyHighlightsToPlainText(email.subject, email.highlights);
  } else {
    subjectEl.textContent = email.subject;
  }
}

function renderBodyWithHighlight(email, resolved) {
  if (!bodyEl) return;

  if (!email) {
    bodyEl.innerHTML = "Please select an email from the inbox.";
    return;
  }

  if (resolved && email.type === "phishing" && hasHighlights(email)) {
    bodyEl.innerHTML = applyHighlightsToBodyHtml(email);
  } else {
    bodyEl.innerHTML = email.body;
  }
}

// =======================================================
// SECTION 013: HUD UPDATES
// =======================================================
function updateHud() {
  if (itemsCorrectedEl) itemsCorrectedEl.textContent = itemsCorrected;
  if (mistakesEl) mistakesEl.textContent = mistakes;
  if (inboxCountEl) inboxCountEl.textContent = filteredEmails.length;

  const total = EMAILS.length;
  const percent = total === 0 ? 0 : (reviewedCount / total) * 100;

  if (progressBarEl) progressBarEl.style.width = `${percent}%`;
  if (progressTextEl) progressTextEl.textContent = `${reviewedCount} of ${total} reviewed`;
  if (mailUsageTextEl) mailUsageTextEl.textContent = `${reviewedCount} reviewed`;
  if (mailPageMetaEl) mailPageMetaEl.textContent = `${filteredEmails.length} visible`;
}

// =======================================================
// SECTION 014: VIEWER POSITION
// =======================================================
function updateViewerPosition() {
  if (!viewerPositionEl) return;

  const index = filteredEmails.findIndex(email => email.id === selectedEmailId);
  const current = index >= 0 ? index + 1 : 0;
  viewerPositionEl.textContent = `${current} of ${filteredEmails.length}`;
}

// =======================================================
// SECTION 015: INBOX STATUS DOT
// =======================================================
function getInboxStatusDotHtml(emailId) {
  if (correctnessMap[emailId] === true) {
    return `<span style="display:inline-block;width:8px;height:8px;border-radius:999px;background:#16a34a;margin-left:6px;"></span>`;
  }

  if (correctnessMap[emailId] === false) {
    return `<span style="display:inline-block;width:8px;height:8px;border-radius:999px;background:#dc2626;margin-left:6px;"></span>`;
  }

  return "";
}

// =======================================================
// SECTION 016: RENDER INBOX
// =======================================================
function renderInbox() {
  if (!inboxList) return;

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
          <div class="mail-sender">${escapeHtml(email.senderName)} ${getInboxStatusDotHtml(email.id)}</div>
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

// =======================================================
// SECTION 017: EMPTY VIEWER STATE
// =======================================================
function renderEmptyViewerState() {
  if (subjectEl) subjectEl.textContent = "No email selected";
  if (senderNameEl) senderNameEl.textContent = "—";
  if (senderEmailEl) senderEmailEl.textContent = "<no-sender>";
  if (senderAvatarEl) senderAvatarEl.textContent = "—";
  if (messageTagEl) messageTagEl.textContent = "Inbox";
  if (messageTimeEl) messageTimeEl.textContent = "—";
  if (bodyEl) bodyEl.innerHTML = "Please select an email from the inbox.";

  setResultStatus("neutral", "");

  if (legitBtn) legitBtn.disabled = true;
  if (phishBtn) phishBtn.disabled = true;
  if (nextBtn) nextBtn.disabled = true;

  updateViewerPosition();
}

// =======================================================
// SECTION 018: RESULT STATUS LOGIC
// =======================================================
function updateViewerStatusPill(email, resolved) {
  if (!email) {
    setResultStatus("neutral", "");
    return;
  }

  if (!resolved) {
    setResultStatus("neutral", "");
    return;
  }

  const decision = decisionMap[email.id];
  const correct = isDecisionCorrect(decision, email.type);

  if (correct) {
    setResultStatus("success", CONFIG.statusCorrect);
  } else {
    setResultStatus("error", CONFIG.statusIncorrect);
  }
}

// =======================================================
// SECTION 019: ACTION BUTTON STATE
// =======================================================
function updateDecisionButtons(email, resolved) {
  if (!email) {
    if (legitBtn) legitBtn.disabled = true;
    if (phishBtn) phishBtn.disabled = true;
    if (nextBtn) nextBtn.disabled = true;
    return;
  }

  if (resolved) {
    if (legitBtn) legitBtn.disabled = true;
    if (phishBtn) phishBtn.disabled = true;
    if (nextBtn) nextBtn.disabled = false;
  } else {
    if (legitBtn) legitBtn.disabled = false;
    if (phishBtn) phishBtn.disabled = false;
    if (nextBtn) nextBtn.disabled = true;
  }
}

// =======================================================
// SECTION 020: RENDER VIEWER
// =======================================================
function renderViewer() {
  const email = getEmailById(selectedEmailId);

  if (!email) {
    renderEmptyViewerState();
    return;
  }

  const resolved = resolvedMap[email.id];

  renderSubjectWithHighlight(email, resolved);

  if (senderNameEl) senderNameEl.textContent = email.senderName;
  renderSenderEmailWithHighlight(email, resolved);

  if (senderAvatarEl) senderAvatarEl.textContent = email.senderInitial;
  if (messageTagEl) messageTagEl.textContent = email.tag;
  if (messageTimeEl) messageTimeEl.textContent = email.time;

  renderBodyWithHighlight(email, resolved);
  updateViewerStatusPill(email, resolved);
  updateDecisionButtons(email, resolved);
  updateViewerPosition();
}

// =======================================================
// SECTION 021: ITEMS CORRECTED / MISTAKES
// =======================================================
function applyResultForDecision(correct) {
  if (correct) {
    itemsCorrected += 1;
  } else {
    mistakes += 1;
  }
}

function markEmailAsResolved(emailId, choice, correct) {
  decisionMap[emailId] = choice;
  resolvedMap[emailId] = true;
  correctnessMap[emailId] = correct;
  reviewedCount += 1;
}

// =======================================================
// SECTION 022: COMPOSE REPORT MODAL
// =======================================================
let composeModalEl = null;
let composeToEl = null;
let composeSubjectEl = null;
let composeBodyEl = null;
let composeSendBtnEl = null;
let composeCloseBtnEl = null;
let composeTitleEl = null;
let composeStateLastEmailId = null;

function ensureComposeModal() {
  if (composeModalEl) return;

  composeModalEl = document.createElement("div");
  composeModalEl.id = "compose-modal";

  composeModalEl.style.position = "fixed";
  composeModalEl.style.right = "26px";
  composeModalEl.style.bottom = "18px";
  composeModalEl.style.width = "440px";
  composeModalEl.style.maxWidth = "calc(100vw - 32px)";
  composeModalEl.style.height = "520px";
  composeModalEl.style.background = "#ffffff";
  composeModalEl.style.borderRadius = "18px 18px 0 0";
  composeModalEl.style.boxShadow = "0 16px 50px rgba(15, 23, 42, 0.28)";
  composeModalEl.style.border = "1px solid #dbe2ec";
  composeModalEl.style.display = "none";
  composeModalEl.style.flexDirection = "column";
  composeModalEl.style.overflow = "hidden";
  composeModalEl.style.zIndex = "999999";

  const header = document.createElement("div");
  header.style.height = "56px";
  header.style.display = "flex";
  header.style.alignItems = "center";
  header.style.justifyContent = "space-between";
  header.style.padding = "0 16px";
  header.style.background = "#f3f6fb";
  header.style.borderBottom = "1px solid #e5eaf1";

  composeTitleEl = document.createElement("div");
  composeTitleEl.textContent = "New Message";
  composeTitleEl.style.fontSize = "14px";
  composeTitleEl.style.fontWeight = "700";
  composeTitleEl.style.color = "#1f2937";

  const controls = document.createElement("div");
  controls.style.display = "flex";
  controls.style.alignItems = "center";
  controls.style.gap = "12px";

  const fakeMin = document.createElement("button");
  fakeMin.type = "button";
  fakeMin.textContent = "—";
  fakeMin.style.border = "none";
  fakeMin.style.background = "transparent";
  fakeMin.style.cursor = "pointer";
  fakeMin.style.fontSize = "18px";
  fakeMin.style.color = "#4b5563";
  fakeMin.style.lineHeight = "1";
  fakeMin.onclick = () => {
    composeModalEl.style.display = "none";
  };

  composeCloseBtnEl = document.createElement("button");
  composeCloseBtnEl.type = "button";
  composeCloseBtnEl.textContent = "✕";
  composeCloseBtnEl.style.border = "none";
  composeCloseBtnEl.style.background = "transparent";
  composeCloseBtnEl.style.cursor = "pointer";
  composeCloseBtnEl.style.fontSize = "18px";
  composeCloseBtnEl.style.color = "#4b5563";
  composeCloseBtnEl.style.lineHeight = "1";
  composeCloseBtnEl.onclick = () => {
    closeComposeModal();
  };

  controls.appendChild(fakeMin);
  controls.appendChild(composeCloseBtnEl);

  header.appendChild(composeTitleEl);
  header.appendChild(controls);

  const fieldsWrap = document.createElement("div");
  fieldsWrap.style.display = "flex";
  fieldsWrap.style.flexDirection = "column";
  fieldsWrap.style.flex = "1";
  fieldsWrap.style.minHeight = "0";

  const toRow = document.createElement("div");
  toRow.style.height = "54px";
  toRow.style.display = "flex";
  toRow.style.alignItems = "center";
  toRow.style.borderBottom = "1px solid #eef2f7";
  toRow.style.padding = "0 16px";

  composeToEl = document.createElement("input");
  composeToEl.type = "text";
  composeToEl.value = CONFIG.reportRecipient;
  composeToEl.readOnly = true;
  composeToEl.style.width = "100%";
  composeToEl.style.border = "none";
  composeToEl.style.outline = "none";
  composeToEl.style.fontSize = "15px";
  composeToEl.style.color = "#111827";
  composeToEl.style.background = "transparent";

  toRow.appendChild(composeToEl);

  const subjectRow = document.createElement("div");
  subjectRow.style.height = "54px";
  subjectRow.style.display = "flex";
  subjectRow.style.alignItems = "center";
  subjectRow.style.borderBottom = "1px solid #eef2f7";
  subjectRow.style.padding = "0 16px";

  composeSubjectEl = document.createElement("input");
  composeSubjectEl.type = "text";
  composeSubjectEl.placeholder = "Subject";
  composeSubjectEl.style.width = "100%";
  composeSubjectEl.style.border = "none";
  composeSubjectEl.style.outline = "none";
  composeSubjectEl.style.fontSize = "15px";
  composeSubjectEl.style.color = "#111827";
  composeSubjectEl.style.background = "transparent";

  subjectRow.appendChild(composeSubjectEl);

  const bodyWrap = document.createElement("div");
  bodyWrap.style.flex = "1";
  bodyWrap.style.minHeight = "0";
  bodyWrap.style.padding = "12px 16px";

  composeBodyEl = document.createElement("textarea");
  composeBodyEl.style.width = "100%";
  composeBodyEl.style.height = "100%";
  composeBodyEl.style.resize = "none";
  composeBodyEl.style.border = "none";
  composeBodyEl.style.outline = "none";
  composeBodyEl.style.fontSize = "14px";
  composeBodyEl.style.lineHeight = "1.6";
  composeBodyEl.style.color = "#111827";
  composeBodyEl.style.background = "transparent";
  composeBodyEl.style.fontFamily = `"Segoe UI", Arial, sans-serif`;

  bodyWrap.appendChild(composeBodyEl);

  const footer = document.createElement("div");
  footer.style.height = "68px";
  footer.style.display = "flex";
  footer.style.alignItems = "center";
  footer.style.justifyContent = "space-between";
  footer.style.padding = "0 16px";
  footer.style.borderTop = "1px solid #eef2f7";

  composeSendBtnEl = document.createElement("button");
  composeSendBtnEl.type = "button";
  composeSendBtnEl.textContent = "Send";
  composeSendBtnEl.style.border = "none";
  composeSendBtnEl.style.cursor = "pointer";
  composeSendBtnEl.style.borderRadius = "999px";
  composeSendBtnEl.style.background = "#2563eb";
  composeSendBtnEl.style.color = "#ffffff";
  composeSendBtnEl.style.fontWeight = "700";
  composeSendBtnEl.style.padding = "10px 22px";
  composeSendBtnEl.style.fontSize = "14px";
  composeSendBtnEl.onclick = () => {
    sendComposeReport();
  };

  const footerRight = document.createElement("div");
  footerRight.style.display = "flex";
  footerRight.style.alignItems = "center";
  footerRight.style.gap = "14px";
  footerRight.style.color = "#64748b";
  footerRight.style.fontSize = "18px";

  const footerIcon1 = document.createElement("span");
  footerIcon1.textContent = "📎";

  const footerIcon2 = document.createElement("span");
  footerIcon2.textContent = "🔗";

  const footerIcon3 = document.createElement("span");
  footerIcon3.textContent = "🗑";

  footerRight.appendChild(footerIcon1);
  footerRight.appendChild(footerIcon2);
  footerRight.appendChild(footerIcon3);

  footer.appendChild(composeSendBtnEl);
  footer.appendChild(footerRight);

  fieldsWrap.appendChild(toRow);
  fieldsWrap.appendChild(subjectRow);
  fieldsWrap.appendChild(bodyWrap);

  composeModalEl.appendChild(header);
  composeModalEl.appendChild(fieldsWrap);
  composeModalEl.appendChild(footer);

  document.body.appendChild(composeModalEl);
}

function buildReportBody(email) {
  if (!email) return "";

  return [
    "Reported Phishing Email",
    "",
    `Sender: ${email.senderName} <${email.senderEmail}>`,
    `Category: ${email.category}`,
    `Time: ${email.time}`,
    `Subject: ${email.subject}`,
    "",
    "--- EMAIL CONTENT ---",
    stripHtml(email.body),
    "",
    "--- END OF MESSAGE ---"
  ].join("\n");
}

function openComposeReport(email) {
  if (!email) return;

  ensureComposeModal();

  composeStateLastEmailId = email.id;
  composeToEl.value = CONFIG.reportRecipient;
  composeSubjectEl.value = `[PHISHING REPORT] ${email.subject}`;
  composeBodyEl.value = buildReportBody(email);
  composeModalEl.style.display = "flex";

  bringToFront(composeModalEl);
}

function closeComposeModal() {
  ensureComposeModal();
  composeModalEl.style.display = "none";
}

function sendComposeReport() {
  ensureComposeModal();

  const currentEmail = getEmailById(composeStateLastEmailId);

  if (!currentEmail) {
    closeComposeModal();
    return;
  }

  setResultStatus("success", "✓ Report Sent");
  closeComposeModal();
}

// =======================================================
// SECTION 023: DECISION HANDLER
// =======================================================
function handleDecision(choice) {
  const email = getEmailById(selectedEmailId);
  if (!email || resolvedMap[email.id]) return;

  const correct = isDecisionCorrect(choice, email.type);

  decisionMap[email.id] = choice;
  resolvedMap[email.id] = true;
  correctnessMap[email.id] = correct;
  reviewedCount += 1;

  if (correct) {
    itemsCorrected += 1;
  } else {
    mistakes += 1;
  }

  renderInbox();
  renderViewer();

  if (choice === "phish" && email.type === "phishing") {
    openComposeReport(email);
  }
}

// =======================================================
// SECTION 024: NEXT EMAIL LOGIC
// =======================================================
function findNextVisibleEmailIndex() {
  return filteredEmails.findIndex(email => email.id === selectedEmailId);
}

function findFirstUnresolvedVisibleEmail() {
  return filteredEmails.find(email => !resolvedMap[email.id]) || null;
}

function goToNextEmail() {
  const currentIndex = findNextVisibleEmailIndex();

  if (currentIndex >= 0 && filteredEmails[currentIndex + 1]) {
    selectedEmailId = filteredEmails[currentIndex + 1].id;
    renderInbox();
    renderViewer();
    return;
  }

  const unresolved = findFirstUnresolvedVisibleEmail();
  if (unresolved) {
    selectedEmailId = unresolved.id;
    renderInbox();
    renderViewer();
    return;
  }

  setResultStatus("success", CONFIG.statusComplete);
  if (nextBtn) nextBtn.disabled = true;
}

// =======================================================
// SECTION 025: SEARCH
// =======================================================
function buildSearchHaystack(email) {
  return [
    email.senderName,
    email.senderEmail,
    email.subject,
    email.preview,
    stripHtml(email.body),
    email.category
  ].join(" ").toLowerCase();
}

function applySearch() {
  if (!searchInput) return;

  const query = searchInput.value.trim().toLowerCase();

  filteredEmails = EMAILS.filter(email => {
    return buildSearchHaystack(email).includes(query);
  });

  if (!filteredEmails.some(email => email.id === selectedEmailId)) {
    selectedEmailId = filteredEmails[0]?.id || null;
  }

  renderInbox();
  renderViewer();
}

// =======================================================
// SECTION 026: KEYBOARD SHORTCUTS
// =======================================================
function isCurrentEmailResolved() {
  const email = getEmailById(selectedEmailId);
  if (!email) return false;
  return !!resolvedMap[email.id];
}

function attachKeyboardShortcuts() {
  document.addEventListener("keydown", event => {
    const key = event.key.toLowerCase();
    const resolved = isCurrentEmailResolved();

    if (key === CONFIG.keyboardLegit && !resolved) {
      handleDecision("legit");
    }

    if (key === CONFIG.keyboardPhish && !resolved) {
      handleDecision("phish");
    }

    if (key === CONFIG.keyboardNext && resolved) {
      goToNextEmail();
    }

    if (key === "escape" && composeModalEl && composeModalEl.style.display !== "none") {
      closeComposeModal();
    }
  });
}

attachKeyboardShortcuts();

// =======================================================
// SECTION 027: INITIALIZE
// =======================================================
function initJobMail() {
  selectedEmailId = filteredEmails[0]?.id || null;
  updateHud();
  renderInbox();
  renderViewer();
  ensureComposeModal();
}

initJobMail();

// =======================================================
// SECTION 028: RESET / DEBUG / EXTENSIBILITY
// =======================================================
function resetSimulationState() {
  filteredEmails = [...EMAILS];
  selectedEmailId = EMAILS[0]?.id || null;
  itemsCorrected = 0;
  mistakes = 0;
  reviewedCount = 0;

  EMAILS.forEach(email => {
    resolvedMap[email.id] = false;
    decisionMap[email.id] = null;
    correctnessMap[email.id] = null;
  });

  if (searchInput) searchInput.value = "";

  closeComposeModal();
  updateHud();
  renderInbox();
  renderViewer();
}

function getSimulationSummary() {
  const correctCount = Object.values(correctnessMap).filter(Boolean).length;
  const incorrectCount = Object.values(correctnessMap).filter(value => value === false).length;

  return {
    total: EMAILS.length,
    reviewed: reviewedCount,
    correct: correctCount,
    incorrect: incorrectCount,
    itemsCorrected,
    mistakes
  };
}

function openFirstUnresolvedEmail() {
  const unresolved = EMAILS.find(email => !resolvedMap[email.id]);
  if (!unresolved) return false;

  selectedEmailId = unresolved.id;
  renderInbox();
  renderViewer();
  return true;
}

function logSummaryToConsole() {
  console.log("Simulation Summary:", getSimulationSummary());
}

window.JobMailTraining = {
  EMAILS,
  resetSimulationState,
  getSimulationSummary,
  openFirstUnresolvedEmail,
  logSummaryToConsole
};

// =======================================================
// SECTION 029: USER EVENT BINDINGS
// =======================================================
if (legitBtn) {
  legitBtn.addEventListener("click", () => handleDecision("legit"));
}

if (phishBtn) {
  phishBtn.addEventListener("click", () => handleDecision("phish"));
}

if (nextBtn) {
  nextBtn.addEventListener("click", goToNextEmail);
}

if (searchInput) {
  searchInput.addEventListener("input", applySearch);
}

document.addEventListener("click", event => {
  const target = event.target;

  if (!target) return;

  if (
    target.classList &&
    target.classList.contains("fake-button") &&
    target.textContent.trim().toLowerCase().includes("change password")
  ) {
    event.preventDefault();
    openApp("browser");
  }
});

// =======================================================
// SECTION 030: FINAL BOOT LOG
// =======================================================
console.log("JobMail training script initialized successfully.");
