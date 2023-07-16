fetch("timeline.json")
    .then(response => response.json())
    .then(response => generateTimeline(response.data));

function generateTimeline(data) {
    data = data.sort(function (a,b) {
        return a.timestamp < b.timestamp ? 1:-1;
    });

    var tableDomNode = document.getElementById("timelineTable");
    for (var i = 0; i < data.length; ++i) {
        var date = new Date(data[i].timestamp);
        date = date.toLocaleString('en-EN', { month: 'long' }) + " " + date.getFullYear().toString();
        var content = "<h4>" + date + "</h4>"
                    + "<h2>" + data[i].title + "</h2>"
                    + "<h3>" + data[i].subtitle + "</h3>"
                    + "<p>" + data[i].content + "</p>";

        if (data[i].hasOwnProperty('images')) {
            content += "<div class=\"miniGallery\">"
            data[i].images.forEach(filename => {
                content += "<img onclick=\"viewImage('" + filename + "')\" class=\"thumbnail\" src=\"images/" + filename + "\">";
            });
            content += "</div>"
        }
        var div = document.createElement("div");
        div.innerHTML = content;

        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        td2.className = "middle";
        td2.innerHTML = "&#10687;"
        var td3 = document.createElement("td");

        if (i%2 === 0) {
            div.className = "contentRight";
            td3.appendChild(div);
        } else {
            div.className = "contentLeft";
            td1.appendChild(div);
        }

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        tableDomNode.appendChild(tr);
    }
}

function viewImage(filename) {
    document.body.style.overflow='hidden';

    var div = document.createElement("div");
    div.className = "lightbox";
    div.id = "lightbox_" + filename;
    div.onclick = closeImages;
    div.innerHTML = "<div class=\"close\">&larr;</div><div class=\"box\"><img src=\"images/" + filename + "\" onclick=\"event.stopPropagation();\"></div>";
    document.body.appendChild(div);
}

function closeImages() {
    document.body.style.overflow='visible';
    document.getElementsByClassName('lightbox')[0].remove();
}