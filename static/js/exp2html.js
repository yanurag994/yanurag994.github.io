// Function to read JSON file from server
function readJSONFile(path, callback) {
    fetch(path)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => callback(data))
        .catch(error => console.error('Error fetching JSON file:', error));
}

// Function to generate HTML
function generateHTML(data) {
    let html = '';
    for (const organization in data) {
        html += `<h3>${organization}</h3>`;
        data[organization].forEach(role => {
            html += `<h4>${role.title}; ${role.location}</h4>`;
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
    return html;
}

readJSONFile('deps/experience.json', function (data) {
    const html = generateHTML(data);
    // Do something with the generated HTML, like appending it to the DOM
    document.getElementById("Experience").innerHTML = html;
  });