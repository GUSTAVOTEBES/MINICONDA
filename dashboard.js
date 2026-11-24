requireAuth();

const currentUser = sessionStorage.getItem('un_ams_user');
if (currentUser) {
    document.getElementById('candidate-name').textContent =
        currentUser.charAt(0).toUpperCase() + currentUser.slice(1);
}

const completedPapers = [...new Set(JSON.parse(localStorage.getItem('un_papers_completed')) || [])].filter(id => [6, 7, 8, 9].includes(id));
const savedReports = JSON.parse(localStorage.getItem('un_report_drafts')) || [];
const starResponses = JSON.parse(localStorage.getItem('un_star_responses')) || [];
const totalPapers = 4;

const percentage = Math.round((completedPapers.length / totalPapers) * 100);

document.getElementById('total-completed').textContent = `${completedPapers.length} of ${totalPapers} completed`;
document.getElementById('progress-text').textContent = `${completedPapers.length} / ${totalPapers} completed (${percentage}%)`;
document.getElementById('progress-bar').style.width = `${percentage}%`;
document.getElementById('total-reports').textContent = `${savedReports.length} drafts saved`;
document.getElementById('total-responses').textContent = `${starResponses.length} stories saved`;