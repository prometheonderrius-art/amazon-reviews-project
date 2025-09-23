// app.js
// This script builds the homepage automatically.

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('site-title').textContent = CONFIG.SITE_TITLE;
    
    // Construct the GitHub API URL to fetch the contents of the 'articles' directory.
    const apiUrl = `https://api.github.com/repos/${CONFIG.GITHUB_USER}/${CONFIG.GITHUB_REPO}/contents/articles`;
    const articleList = document.getElementById('article-list');

    fetch(apiUrl)
        .then(response => response.json())
        .then(files => {
            if (!Array.isArray(files)) {
                articleList.innerHTML = `<p class="error">Error: Could not load articles. Check your config.js file and ensure the 'articles' directory exists.</p>`;
                return;
            }
            
            // Reverse the array to show the newest articles first.
            files.reverse();

            for (const file of files) {
                if (file.type === 'file' && file.name.endsWith('.md')) {
                    // Create a beautiful link for each article.
                    const articleLink = document.createElement('a');
                    articleLink.href = `article.html?name=${file.name}`;
                    
                    // Format the title nicely from the filename.
                    const title = file.name.replace('.md', '').replace(/-/g, ' ');
                    articleLink.textContent = title;
                    
                    articleList.appendChild(articleLink);
                }
            }
        })
        .catch(error => {
            console.error("Error fetching articles:", error);
            articleList.innerHTML = `<p class="error">Failed to load articles from GitHub.</p>`;
        });
});
