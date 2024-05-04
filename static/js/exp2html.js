// Function to read JSON file from server
function readJSONFile(path, callback) {
    fetch(path)
        .then(response => response.json()) // Parse response as JSON
        .then(response => callback(response))
        .catch(error => console.error(`Error fetching JSON file:`, error));
}

// Function to generate HTML
function generateHTML(data) {
    let html = ``;
    for (const organization in data) {
        html += `<h3>${organization}</h3>`;
        data[organization].forEach(role => {
            html += `<h5 style="display: flex; justify-content: space-between; align-items: center;">`;
            html += `<span>${role.title} : ${role.location}</span>`;
            html += role.note ? `<span style="font-size: 15px; margin-left: 10px; margin-right: auto;">(${role.note})</span>` : ``;
            html += `<span style="font-size: 15px; text-align:right;">${role.duration}</span>`;
            html += `</h5>`;
            if (role.achievements) {
                html += "<ul>";
                role.achievements.forEach(achievement => {
                    html += `<li class="achievement">${achievement}</li>`; // Add class for achievements
                });
                html += "</ul>";
            }
            if (role.responsibilities) {
                html += "<ul>";
                role.responsibilities.forEach(responsibility => {
                    html += `<li>${responsibility}</li>`;
                });
                html += "</ul>";
            }
        });
    }
    document.getElementById('experience').innerHTML = html;
}

document.addEventListener('DOMContentLoaded', function () {
    readJSONFile(document.getElementById('experience').getAttribute('data-filename'), generateHTML);
});
