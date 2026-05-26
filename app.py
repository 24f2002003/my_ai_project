from flask import Flask, render_template, request, redirect, url_for, jsonify
import json
import os
from datetime import datetime

app = Flask(__name__)

DATA_FILE = "tasks.json"

COLUMNS = ["todo", "inprogress", "review", "done"]
COLUMN_LABELS = {
    "todo": "To Do",
    "inprogress": "In Progress",
    "review": "In Review",
    "done": "Done"
}

PRIORITIES = ["low", "medium", "high", "critical"]
PRIORITY_LABELS = {
    "low": "Low",
    "medium": "Medium",
    "high": "High",
    "critical": "Critical"
}

def load_tasks():
    if not os.path.exists(DATA_FILE):
        default_tasks = [
            {"id": 1, "title": "Design wireframes", "description": "Create initial mockups for the new dashboard", "column": "done", "priority": "high", "created": "2026-05-20"},
            {"id": 2, "title": "Set up database schema", "description": "Define tables and relationships for the backend", "column": "done", "priority": "critical", "created": "2026-05-21"},
            {"id": 3, "title": "Build authentication system", "description": "Implement login, logout, and JWT tokens", "column": "inprogress", "priority": "critical", "created": "2026-05-22"},
            {"id": 4, "title": "Write API endpoints", "description": "REST API for tasks, users, and projects", "column": "inprogress", "priority": "high", "created": "2026-05-23"},
            {"id": 5, "title": "Frontend components", "description": "Reusable React components for the UI", "column": "review", "priority": "medium", "created": "2026-05-24"},
            {"id": 6, "title": "Write unit tests", "description": "Cover core business logic with tests", "column": "todo", "priority": "medium", "created": "2026-05-25"},
            {"id": 7, "title": "Deploy to staging", "description": "Set up CI/CD pipeline and staging environment", "column": "todo", "priority": "low", "created": "2026-05-25"},
            {"id": 8, "title": "Performance audit", "description": "Profile and optimize slow queries", "column": "todo", "priority": "low", "created": "2026-05-26"},
        ]
        save_tasks(default_tasks)
        return default_tasks
    with open(DATA_FILE, "r") as f:
        return json.load(f)

def save_tasks(tasks):
    with open(DATA_FILE, "w") as f:
        json.dump(tasks, f, indent=2)

def get_next_id(tasks):
    if not tasks:
        return 1
    return max(t["id"] for t in tasks) + 1

@app.route("/")
def index():
    tasks = load_tasks()
    columns_data = {col: [] for col in COLUMNS}
    for task in tasks:
        col = task.get("column", "todo")
        if col in columns_data:
            columns_data[col].append(task)
    stats = {
        "total": len(tasks),
        "todo": len(columns_data["todo"]),
        "inprogress": len(columns_data["inprogress"]),
        "review": len(columns_data["review"]),
        "done": len(columns_data["done"]),
    }
    return render_template(
        "index.html",
        columns=COLUMNS,
        column_labels=COLUMN_LABELS,
        columns_data=columns_data,
        priorities=PRIORITIES,
        priority_labels=PRIORITY_LABELS,
        stats=stats
    )

@app.route("/add", methods=["POST"])
def add_task():
    tasks = load_tasks()
    title = request.form.get("title", "").strip()
    if not title:
        return redirect(url_for("index"))
    task = {
        "id": get_next_id(tasks),
        "title": title,
        "description": request.form.get("description", "").strip(),
        "column": request.form.get("column", "todo"),
        "priority": request.form.get("priority", "medium"),
        "created": datetime.now().strftime("%Y-%m-%d")
    }
    tasks.append(task)
    save_tasks(tasks)
    return redirect(url_for("index"))

@app.route("/edit/<int:task_id>", methods=["POST"])
def edit_task(task_id):
    tasks = load_tasks()
    for task in tasks:
        if task["id"] == task_id:
            task["title"] = request.form.get("title", task["title"]).strip()
            task["description"] = request.form.get("description", task["description"]).strip()
            task["priority"] = request.form.get("priority", task["priority"])
            break
    save_tasks(tasks)
    return redirect(url_for("index"))

@app.route("/move/<int:task_id>/<column>", methods=["POST"])
def move_task(task_id, column):
    if column not in COLUMNS:
        return jsonify({"error": "Invalid column"}), 400
    tasks = load_tasks()
    for task in tasks:
        if task["id"] == task_id:
            task["column"] = column
            break
    save_tasks(tasks)
    return jsonify({"success": True})

@app.route("/delete/<int:task_id>", methods=["POST"])
def delete_task(task_id):
    tasks = load_tasks()
    tasks = [t for t in tasks if t["id"] != task_id]
    save_tasks(tasks)
    return redirect(url_for("index"))

if __name__ == "__main__":
    app.run(debug=True, port=5000)
