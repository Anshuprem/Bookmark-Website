const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

let bookmarks = [];

app.get("/bookmarks", (req, res) => {
    res.json(bookmarks);
});

app.post("/bookmarks", (req, res) => {
    const { url, title } = req.body;
    if (!url || !title) return res.status(400).json({ error: "URL and title are required" });
    const newBookmark = { id: Date.now(), url, title };
    bookmarks.push(newBookmark);
    res.json({ message: "Bookmark added", bookmark: newBookmark });
});

app.delete("/bookmarks/:id", (req, res) => {
    const { id } = req.params;
    bookmarks = bookmarks.filter(bookmark => bookmark.id !== parseInt(id));
    res.json({ message: "Bookmark deleted" });
});


app.put("/bookmarks/:id", (req, res) => {
    const { id } = req.params;
    const { url, title } = req.body;
    let bookmark = bookmarks.find(b => b.id === parseInt(id));
    if (!bookmark) return res.status(404).json({ error: "Bookmark not found" });
    if (url) bookmark.url = url;
    if (title) bookmark.title = title;
    res.json({ message: "Bookmark updated", bookmark });
});


app.delete("/bookmarks", (req, res) => {
    bookmarks = [];
    res.json({ message: "All bookmarks deleted" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
