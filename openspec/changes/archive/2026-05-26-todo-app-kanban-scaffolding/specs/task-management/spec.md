## ADDED Requirements

### Requirement: Task Creation
The system SHALL allow users to create new tasks with a title, optional description, status, and priority.

#### Scenario: User creates a task
- **WHEN** user submits the task creation form with valid data
- **THEN** a new task is created and added to the default list

### Requirement: Task Modification
The system SHALL allow users to update the title, description, status, and priority of an existing task.

#### Scenario: User updates a task
- **WHEN** user modifies task details and saves
- **THEN** the task information is updated in the system

### Requirement: Task Removal
The system SHALL allow users to delete a task.

#### Scenario: User deletes a task
- **WHEN** user confirms deletion of a task
- **THEN** the task is removed from the system

### Requirement: Task Retrieval
The system SHALL allow users to view a list of all tasks.

#### Scenario: User views tasks
- **WHEN** user opens the application
- **THEN** all existing tasks are retrieved and displayed
