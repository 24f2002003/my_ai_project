## ADDED Requirements

### Requirement: List Creation
The system SHALL allow users to create multiple lists or columns to categorize tasks.

#### Scenario: User creates a new list
- **WHEN** user provides a name for a new list
- **THEN** a new list is created and appears in the view

### Requirement: List Renaming
The system SHALL allow users to rename an existing list.

#### Scenario: User renames a list
- **WHEN** user updates the name of a list
- **THEN** the list title is updated everywhere

### Requirement: Task Assignment to List
The system SHALL allow tasks to be moved between lists.

#### Scenario: User moves a task
- **WHEN** user drags or selects a new list for a task
- **THEN** the task is moved from the old list to the new one
