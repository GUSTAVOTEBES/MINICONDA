requireAuth();

const unPapersData = [
    {
        "id": 6,
        "category": "CLA (2017-2026 New Pattern)",
        "title": "NILE LOGISTICS AID THEFT"
    },
    {
        "id": 7,
        "category": "CLA (2017-2026 New Pattern)",
        "title": "ILLICIT WEAPONS SMUGGLING AT BORDER CHECKPOINT"
    },
    {
        "id": 8,
        "category": "CLA (2017-2026 New Pattern)",
        "title": "ROBBERY AND ASSAULT ON HUMANITARIAN CONVOY"
    },
    {
        "id": 9,
        "category": "CLA (2017-2026 New Pattern)",
        "title": "FATAL HIT-AND-RUN INVOLVING DIPLOMATIC / UN VEHICLE"
    }
];

let completedPapers = JSON.parse(localStorage.getItem('un_papers_completed')) || [];

const papersTable = document.getElementById('papers-table');
const visibleCount = document.getElementById('visible-count');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const statusFilter = document.getElementById('statusFilter');

function toggleCompleted(id) {
    if (completedPapers.includes(id)) {
        completedPapers = completedPapers.filter(item => item !== id);
    } else {
        completedPapers.push(id);
    }
    localStorage.setItem('un_papers_completed', JSON.stringify(completedPapers));
    renderPapers();
}

function renderPapers() {
    const query = searchInput.value.toLowerCase().trim();
    const cat = categoryFilter.value;
    const status = statusFilter.value;

    const filtered = unPapersData.filter(paper => {
        const matchesText = paper.title.toLowerCase().includes(query);
        const matchesCat = cat === '' || paper.category === cat;
        const isDone = completedPapers.includes(paper.id);
        const matchesStatus = status === '' || (status === 'completed' && isDone) || (status === 'pending' && !isDone);

        return matchesText && matchesCat && matchesStatus;
    });

    papersTable.innerHTML = '';

    if (filtered.length === 0) {
        papersTable.innerHTML = `<tr><td colspan="4" class="text-center py-4 text-muted">No matching exam papers found.</td></tr>`;
    } else {
        filtered.forEach((paper, index) => {
            const done = completedPapers.includes(paper.id);
            const btnClass = done ? 'btn-success' : 'btn-outline-secondary';
            const btnText = done ? 'Completed ✓' : 'Mark Done';

            papersTable.innerHTML += `
                <tr class="${done ? 'table-success bg-opacity-25' : ''}">
                    <td class="text-muted fw-semibold">${index + 1}</td>
                    <td>
                        <a href="paper-${paper.id}.html" class="paper-link">
                            ${paper.title} →
                        </a>
                    </td>
                    <td><span class="badge text-bg-light border text-dark">${paper.category}</span></td>
                    <td>
                        <button type="button" class="btn btn-sm ${btnClass} w-100" onclick="toggleCompleted(${paper.id})">
                            ${btnText}
                        </button>
                    </td>
                </tr>
            `;
        });
    }

    visibleCount.textContent = filtered.length;
}

searchInput.addEventListener('input', renderPapers);
categoryFilter.addEventListener('change', renderPapers);
statusFilter.addEventListener('change', renderPapers);

renderPapers();