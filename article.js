// article.js
// This script loads and renders a single article.

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const articleName = params.get('name');
    const articleContent = document.getElementById('article-content');

    if (!articleName) {
        articleContent.innerHTML = `<p class="error">No article specified.</p>`;
        return;
    }

    // This is the direct URL to the raw Markdown file on GitHub.
    const articleUrl = `https://raw.githubusercontent.com/${CONFIG.GITHUB_USER}/${CONFIG.GITHUB_REPO}/main/articles/${articleName}`;
    
    // We instantiate the translator.
    const converter = new showdown.Converter();

    fetch(articleUrl)
        .then(response => response.text())
        .then(markdown => {
            // Translate and sanitize the glorious text.
            const html = converter.makeHtml(markdown);
            articleContent.innerHTML = html;
            // Set the page title to the first H1 in the document.
            document.title = articleContent.querySelector('h1').textContent;
        })
        .catch(error => {
            console.error("Error fetching article:", error);
            articleContent.innerHTML = `<p class="error">Could not load article.</p>`;
        });
});
