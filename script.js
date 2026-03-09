const ideaInput = document.getElementById('ideaInput');
const addBtn = document.getElementById('addBtn');
const board = document.getElementById('board');
const ideaCount = document.getElementById('ideaCount');

let ideas = JSON.parse(localStorage.getItem('beautyIdeas')) || [];

function updateCounter() {
    ideaCount.innerText = ideas.length;
}

function render() {
    board.innerHTML = '';
    ideas.forEach((idea, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <p>${idea.text}</p>
            <div class="card-footer">
                <span class="date">${idea.date}</span>
                <span class="delete-btn" onclick="deleteIdea(${index})">×</span>
            </div>
        `;
        board.appendChild(card);
    });
    localStorage.setItem('beautyIdeas', JSON.stringify(ideas));
    updateCounter();
}

function addIdea() {
    const text = ideaInput.value.trim();
    if (!text) return;

    const newIdea = {
        text: text,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    };

    ideas.unshift(newIdea);
    ideaInput.value = '';
    render();
}

function deleteIdea(index) {
    ideas.splice(index, 1);
    render();
}

addBtn.addEventListener('click', addIdea);
ideaInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') addIdea(); });

render();