requireAuth();

let timerInterval = null;
let remainingSeconds = 45 * 60;
let isRunning = false;

const timerDisplay = document.getElementById('timer-display');
const timePreset = document.getElementById('time-preset');
const btnStart = document.getElementById('btn-start');
const btnPause = document.getElementById('btn-pause');
const btnReset = document.getElementById('btn-reset');
const btnInsertTemplate = document.getElementById('btn-insert-template');

const reportForm = document.getElementById('form-report');
const reportTitle = document.getElementById('reportTitle');
const reportRef = document.getElementById('reportRef');
const reportBody = document.getElementById('reportBody');
const wordCounter = document.getElementById('word-counter');
const draftsCount = document.getElementById('drafts-count');
const savedDraftsList = document.getElementById('saved-drafts-list');

let drafts = JSON.parse(localStorage.getItem('un_report_drafts')) || [];

function formatTime(totalSec) {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function updateTimerUI() {
    timerDisplay.textContent = formatTime(remainingSeconds);
    if (remainingSeconds <= 300) {
        timerDisplay.classList.remove('text-primary');
        timerDisplay.classList.add('text-danger');
    } else {
        timerDisplay.classList.remove('text-danger');
        timerDisplay.classList.add('text-primary');
    }
}

btnStart.addEventListener('click', () => {
    if (isRunning) return;
    isRunning = true;
    timerInterval = setInterval(() => {
        if (remainingSeconds > 0) {
            remainingSeconds--;
            updateTimerUI();
        } else {
            clearInterval(timerInterval);
            isRunning = false;
            alert('Time is up! Review your report and save your draft.');
        }
    }, 1000);
});

btnPause.addEventListener('click', () => {
    clearInterval(timerInterval);
    isRunning = false;
});

btnReset.addEventListener('click', () => {
    clearInterval(timerInterval);
    isRunning = false;
    remainingSeconds = parseInt(timePreset.value, 10) * 60;
    updateTimerUI();
});

timePreset.addEventListener('change', () => {
    clearInterval(timerInterval);
    isRunning = false;
    remainingSeconds = parseInt(timePreset.value, 10) * 60;
    updateTimerUI();
});

function updateWordCount() {
    const text = reportBody.value.trim();
    const words = text === '' ? 0 : text.split(/\s+/).length;
    const chars = reportBody.value.length;
    wordCounter.textContent = `Words: ${words} | Characters: ${chars}`;
}

reportBody.addEventListener('input', updateWordCount);

btnInsertTemplate.addEventListener('click', () => {
    const template = `UNITED NATIONS MISSION - INCIDENT REPORT
TO: Team Leader / Sector Commander
FROM: UNPOL Officer [Name / ID]
DATE: [DD/MM/YYYY]
SUBJECT: [Brief Title of Incident]

1. SUMMARY OF INCIDENT:
On [Day, Date] at approximately [00:00] hours, while conducting routine patrol at [Location], UNPOL officers observed / received a report regarding...

2. DETAILS OF PERSONS / VEHICLES INVOLVED:
- Victim(s): [Full Name, Age, Gender, Nationality, Address, Injuries]
- Suspect(s): [Full Name / Description, Age, Nationality]
- Witness(es): [Full Name, Contact Info]
- Vehicle(s): [Make, Model, Color, Plate Number, Damage]

3. CHRONOLOGICAL SEQUENCE OF EVENTS:
- At [00:00] hrs: ...
- At [00:00] hrs: ...

4. ACTION TAKEN BY UNPOL & LOCAL AUTHORITIES:
- Secured the scene and provided basic first aid.
- Notified local police and UN Operations Center.
- Handed over the case to [Local Authority Name/Rank] at [00:00] hrs.

5. CONCLUSION / FOLLOW-UP:
The situation is currently calm. Monitoring will continue during subsequent patrols.`;

    reportBody.value = template;
    updateWordCount();
});

function saveDrafts() {
    localStorage.setItem('un_report_drafts', JSON.stringify(drafts));
}

function renderDrafts() {
    savedDraftsList.innerHTML = '';

    if (drafts.length === 0) {
        savedDraftsList.innerHTML = '<p class="text-muted small">No saved drafts yet. Complete a timed practice and save it here.</p>';
    }

    drafts.forEach(draft => {
        savedDraftsList.innerHTML += `
            <div class="card shadow-sm">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start mb-1">
                        <h4 class="fs-6 fw-bold mb-0">${draft.title}</h4>
                        <button class="btn btn-outline-danger btn-sm" onclick="deleteDraft('${draft.id}')">✕</button>
                    </div>
                    <p class="text-muted small mb-2">${draft.date} • ${draft.wordCount} words</p>
                    <button class="btn btn-sm btn-outline-primary w-100" onclick="loadDraft('${draft.id}')">Load into Editor</button>
                </div>
            </div>
        `;
    });

    draftsCount.textContent = drafts.length;
}

window.loadDraft = function (id) {
    const draft = drafts.find(d => d.id === id);
    if (!draft) return;
    reportTitle.value = draft.title;
    reportRef.value = draft.ref;
    reportBody.value = draft.body;
    updateWordCount();
};

window.deleteDraft = function (id) {
    if (!confirm('Delete this saved report draft?')) return;
    drafts = drafts.filter(d => d.id !== id);
    saveDrafts();
    renderDrafts();
};

reportForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = reportBody.value.trim();
    const words = text === '' ? 0 : text.split(/\s+/).length;

    drafts.unshift({
        id: crypto.randomUUID(),
        title: reportTitle.value.trim(),
        ref: reportRef.value.trim(),
        body: reportBody.value,
        wordCount: words,
        date: new Date().toLocaleDateString('en-GB')
    });

    saveDrafts();
    renderDrafts();
    alert('Report draft saved successfully!');
});

updateTimerUI();
renderDrafts();