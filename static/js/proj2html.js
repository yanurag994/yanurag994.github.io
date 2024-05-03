function readJSONFile(path, callback) {
    fetch(path)
        .then(response => response.json()) // Parse response as JSON
        .then(response => callback(response))
        .catch(error => console.error(`Error fetching JSON file:`, error));
}
// Function to build HTML for projects
function buildProjectsHTML(projects) {
    const container = document.getElementById('projects-container');

    // Iterate through each project
    projects.forEach(project => {
        // Create project element
        const projectElement = document.createElement('div');
        projectElement.className = 'wow fadeIn animated';
        projectElement.setAttribute('data-wow-delay', '.15s');
        projectElement.style.visibility = 'visible';
        projectElement.style.animationDelay = '0.15s';
        projectElement.style.animationName = 'fadeIn';

        // Create anchor element
        const anchorElement = document.createElement('a');
        anchorElement.href = project.link || '#';
        anchorElement.className = 'project card text-dark';

        // Create image element
        const imageElement = document.createElement('img');
        imageElement.className = 'card-img-top';
        imageElement.src = project.image || '';
        imageElement.alt = project.alt || '';

        // Create card body
        const cardBodyElement = document.createElement('div');
        cardBodyElement.className = 'card-body';

        // Create card title
        const titleElement = document.createElement('h5');
        titleElement.className = 'card-title';
        titleElement.textContent = project.title || '';

        // Create card description
        const descriptionElement = document.createElement('p');
        descriptionElement.className = 'card-text';
        descriptionElement.textContent = project.description || '';

        // Create tools container
        const toolsElement = document.createElement('p');
        toolsElement.className = 'card-text';

        // Iterate through each tool and create badge elements
        if (project.tools) {
            project.tools.forEach(tool => {
                const badgeElement = document.createElement('span');
                badgeElement.className = 'badge badge-pill text-primary border border-primary ml-1';
                badgeElement.textContent = tool;
                toolsElement.appendChild(badgeElement);
            });
        }

        // Append elements
        cardBodyElement.appendChild(titleElement);
        cardBodyElement.appendChild(descriptionElement);
        cardBodyElement.appendChild(toolsElement);
        anchorElement.appendChild(imageElement);
        anchorElement.appendChild(cardBodyElement);
        projectElement.appendChild(anchorElement);
        container.appendChild(projectElement);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    readJSONFile(document.getElementById('projects-container').getAttribute('data-filename'), buildProjectsHTML);
});
