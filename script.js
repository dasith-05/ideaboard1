const ideaInput = document.getElementById('ideaInput');
const addBtn = document.getElementById('addBtn');
const board = document.getElementById('board');

// Load ideas from LocalStorage
let ideas = JSON.parse(localStorage.getItem('savedIdeas')) || [];

function render() {
    board.innerHTML = '';
    ideas.forEach((idea, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <button class="delete-btn" onclick="deleteIdea(${index})">&times;</button>
            <p>${idea.text}</p>
            <div class="date">${idea.date}</div>
        `;
        board.appendChild(card);
    });
    localStorage.setItem('savedIdeas', JSON.stringify(ideas));
}

function addIdea() {
    const text = ideaInput.value.trim();
    if (text === "") return;

    const newIdea = {
        text: text,
        date: new Date().toLocaleDateString()
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
ideaInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addIdea();
});

// Initial Render
render();