## ADDED Requirements

### Requirement: Persistent Storage
The system SHALL persist all task and list data such that it is available after a browser refresh or app restart.

#### Scenario: Data survives refresh
- **WHEN** user creates a task and refreshes the page
- **THEN** the task is still visible in the correct list

### Requirement: Data Serialization
The system SHALL serialize task and list data into a format suitable for storage (e.g., JSON).

#### Scenario: System saves data
- **WHEN** any change is made to tasks or lists
- **THEN** the system serializes and saves the updated state to storage
