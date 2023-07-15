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
                var div = document.createElement("div");
                div.className = "lightbox";
                div.id = "lightbox_" + filename;
                div.innerHTML = "<div class=\"close\"><a href=\"#"+ div.id + "_thumbnail\" onclick=\"document.body.style.overflow='visible';\">&larr;</a></div><div class=\"box\"><img src=\"images/" + filename + "\" ></div>";
                document.body.appendChild(div);

                content += "<a href=\"#" + div.id + "\" onclick=\"team();document.body.style.overflow='hidden';\"><img id=\"" + div.id + "_thumbnail\" class=\"thumbnail\" src=\"images/" + filename + "\"></a>";
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