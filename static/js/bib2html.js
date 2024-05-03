// Function to read .bib file
function readBibFile(path, callback) {
    fetch(path)
        .then(response => response.text())
        .then(response => callback(response)) // Invoke the callback with the response
        .catch(error => console.error('Error fetching .bib file:', error));
}

// Function to parse .bib file content
function parseBibFile(contents) {
    // Assuming each entry is separated by two newlines
    var entries = contents.split('\n\n');

    // Extracting required fields from each entry
    var bibEntries = entries.map(function (entry) {
        var lines = entry.split('\n');
        var bibEntry = {};

        lines.forEach(function (line) {
            var keyValue = line.split('=').map(function (part) {
                return part.trim().replace(/[{}],?/g, ''); // Removing curly braces and extra spaces
            });

            if (keyValue.length === 2) {
                bibEntry[keyValue[0]] = keyValue[1];
            }
        });

        return bibEntry;
    });

    return bibEntries;
}

// Assuming this will be called from your HTML after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    var bibDiv = document.getElementById('bibtex_display');

    // Example path to your .bib file. You may replace it with the actual path.
    var bibFilePath = bibDiv.getAttribute('data-filename');

    // Read the .bib file and parse its content
    readBibFile(bibFilePath, function (contents) {
        try {
            var bibEntries = parseBibFile(contents);

            bibDiv.innerHTML = ''; // Clear previous content

            bibEntries.forEach(function (entry) {
                var entryDiv = document.createElement('div');
                entryDiv.className = 'bibtexentry';

                var authors = entry.author.split(' and ').map(function (author) {
                    var names = author.trim().split(' ');
                    return '<span class="first">' + names[0] + '</span> <span class="last">' + names.slice(1).join(' ') + '</span>';
                }).join(', ');

                var year = '<span class="year">' + entry.year + '</span>';
                var title = '<span class="title">' + entry.title + '</span>';

                // Check if URL is available
                var url_note = entry.url ? '<a class="url" style="color:black; font-size:10px" href="' + entry.url + '">(view online)</a>' : '<span class="note">' + entry.note + '</span>';

                var entryContent = '<div style="font-weight: bold;">' +
                    year + ', ' +
                    '<span class="author">' + authors + '</span>' +
                    '<span style="float: right;">' + url_note + '</span>' +
                    '</div>' +
                    '<div style="margin-left: 10px; margin-bottom:5px;">' + title + '</div>';

                entryDiv.innerHTML = entryContent;
                bibDiv.appendChild(entryDiv);
            });
        } catch (error) {
            console.error('Error processing .bib file:', error);
        }
    });
});
