# Kanban Board — Flask + Jinja2

A dark-themed, drag-and-drop Kanban board built with Python, Flask, and Jinja2.

## Setup

```bash
pip install flask
python app.py
```

Then open http://localhost:5000 in your browser.

## Features
- 4 columns: To Do / In Progress / In Review / Done
- Drag & drop cards between columns
- Add / Edit / Delete tasks
- Priority levels: Low / Medium / High / Critical
- Progress bar showing completion %
- Persistent storage in `tasks.json`

## Project Structure
```
kanban/
├── app.py              # Flask routes + data logic
├── tasks.json          # Auto-created data store
└── templates/
    └── index.html      # Jinja2 template (full UI)
```
