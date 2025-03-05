import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let bookmarks = [];

app.get("/bookmarks", (req, res) => {
    res.json(bookmarks);
});

app.post("/bookmarks", (req, res) => {
    const { name, url } = req.body;
    if (!name || !url) {
        return res.status(400).json({ message: "Name and URL are required" });
    }
    bookmarks.push({ name, url });
    res.status(201).json({ message: "Bookmark added successfully" });
});

app.delete("/bookmarks", (req, res) => {
    const { url } = req.body;
    bookmarks = bookmarks.filter(bookmark => bookmark.url !== url);
    res.json({ message: "Bookmark deleted successfully" });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
