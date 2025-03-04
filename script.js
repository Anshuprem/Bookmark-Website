document.addEventListener("DOMContentLoaded", loadBookmarks);

function loadBookmarks() {
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    let list = document.getElementById("bookmarkList");
    list.innerHTML = "";
    bookmarks.forEach(bookmark => {
        let div = document.createElement("div");
        div.classList.add("bookmark");
        div.innerHTML = `<a href="${bookmark.url}" target="_blank">${bookmark.name}</a> 
                        <button class="remove-btn" onclick="removeBookmark('${bookmark.url}')">Remove</button>`;
        list.appendChild(div);
    });
}

function addBookmark() {
    let name = document.getElementById("bookmarkName").value;
    let url = document.getElementById("bookmarkURL").value;
    if (name && url) {
        let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
        bookmarks.push({ name, url });
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
        loadBookmarks();
        document.getElementById("bookmarkName").value = "";
        document.getElementById("bookmarkURL").value = "";
    } else {
        alert("Please enter both a name and URL.");
    }
}

function removeBookmark(url) {
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    bookmarks = bookmarks.filter(bookmark => bookmark.url !== url);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    loadBookmarks();
}