// index_search.js
let searchIndexData = null;
const modal = document.getElementById('search-modal');
const openBtn = document.getElementById('search-open-btn');
const closeBtn = document.getElementById('search-close-btn');
const searchInput = document.getElementById('modal-search-input');
const resultsContainer = document.getElementById('modal-search-results');

openBtn.style.display = 'inline-block';

openBtn.addEventListener('click', async () => {
	modal.style.display = 'flex';
	searchInput.focus();
	if (!searchIndexData) {
		try {
			const response = await fetch('search-data.json');
			searchIndexData = await response.json();
		} catch (error) {
			console.error('Error:', error);
			resultsContainer.innerHTML = '<p style="color:#fb4934;">Failed to load search data.</p>';
		}
	}
});

const closeModal = () => {
	modal.style.display = 'none';
	searchInput.value = '';
	resultsContainer.innerHTML = '';
};

closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', (e) => {
	if (e.target === modal) {
		closeModal();
	}
});

searchInput.addEventListener('input', () => {
	const query = searchInput.value.trim().toLowerCase();
	resultsContainer.innerHTML = '';
	if (!query || !searchIndexData) return;

	const filtered = searchIndexData.filter(item => {
		return item.title.toLowerCase().includes(query) || item.content.toLowerCase().includes(query);
	});

	if (filtered.length === 0) {
		resultsContainer.innerHTML = '<p style="color:#a89984;">No results found.</p>';
		return;
	}

	filtered.forEach(item => {
		let snippet = item.content;
		const idx = snippet.toLowerCase().indexOf(query);
		if (idx > 30) {
			snippet = '...' + snippet.substring(idx - 15, idx + 80) + '...';
		} else {
			snippet = snippet.substring(0, 95) + '...';
		}

		const itemHtml = `
			<div class="search-item">
				<div class="search-item-title"><a href="${item.url}">${item.title}</a></div>
				<div class="search-item-snippet">${snippet}</div>
			</div>
		`;
		resultsContainer.insertAdjacentHTML('beforeend', itemHtml);
	});
});
