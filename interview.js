requireAuth();

const responses = JSON.parse(localStorage.getItem('un_star_responses')) || [];

const starList = document.getElementById('star-list');
const totalStar = document.getElementById('total-star');
const formStar = document.getElementById('form-star');

function saveStar() {
    localStorage.setItem('un_star_responses', JSON.stringify(responses));
}

function renderStar() {
    starList.innerHTML = '';

    if (responses.length === 0) {
        starList.innerHTML = '<p class="text-muted small">No STAR stories saved yet. Use the form on the right to draft your first story in English.</p>';
    }

    responses.forEach((item) => {
        starList.innerHTML += `
            <div class="card card-un shadow-sm">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <span class="badge text-bg-primary">${item.competency}</span>
                        <button class="btn btn-outline-danger btn-sm" onclick="deleteStar('${item.id}')">Delete</button>
                    </div>
                    <h4 class="fs-6 fw-bold mb-2">${item.question}</h4>
                    <p class="small mb-1"><strong>S:</strong> ${item.situation}</p>
                    <p class="small mb-1"><strong>T:</strong> ${item.task}</p>
                    <p class="small mb-1"><strong>A:</strong> ${item.action}</p>
                    <p class="small mb-0"><strong>R:</strong> ${item.result}</p>
                </div>
            </div>
        `;
    });

    totalStar.textContent = responses.length;
}

window.deleteStar = function (id) {
    if (!confirm('Delete this STAR story?')) return;
    const idx = responses.findIndex(r => r.id === id);
    if (idx !== -1) {
        responses.splice(idx, 1);
        saveStar();
        renderStar();
    }
};

formStar.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(formStar);

    responses.push({
        id: crypto.randomUUID(),
        competency: data.get('competency').trim(),
        question: data.get('question').trim(),
        situation: data.get('situation').trim(),
        task: data.get('task').trim(),
        action: data.get('action').trim(),
        result: data.get('result').trim()
    });

    saveStar();
    renderStar();
    formStar.reset();
});

renderStar();