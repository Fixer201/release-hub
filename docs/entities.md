# User

Represents a user in the Release Hub system.

## Attributes

- `id` (UUID): Unique identifier for the user
- `username` (string): Username of the user
- `password_hash` (string): Hashed password for authentication
- `email` (string): Email address of the user
- `created_at` (datetime): Timestamp when the user was created
- `updated_at` (datetime): Timestamp when the user was last updated

# Environment

Represents an environment where releases can be deployed.

## Attributes

- `id` (UUID): Unique identifier for the environment
- `project_id` (UUID): Identifier of the project this environment belongs to
- `name` (string): Name of the environment
- `type` (enum): Type of environment (e.g., DEVELOPMENT, STAGING, PRODUCTION)
- `url` (string, optional): URL of the environment
- `status` (enum): Current status of the environment (default: UNKNOWN)
- `created_at` (datetime): Timestamp when the environment was created
- `updated_at` (datetime): Timestamp when the environment was last updated

# Project

Represents a project that contains environments and releases.

## Attributes

- `id` (UUID): Unique identifier for the project
- `name` (string): Name of the project
- `owner_id` (UUID): Identifier of the user who owns the project
- `group_id` (UUID, optional): Identifier of the group this project belongs to
- `status` (enum): Current status of the project (default: DRAFT)
- `description` (string, optional): Description of the project
- `repository_url` (string, optional): Repository URL of the project
- `development_url` (string, optional): Development deployment URL
- `preview_url` (string, optional): Preview deployment URL
- `production_url` (string, optional): Production deployment URL
- `preview_image_url` (string, optional): URL of the preview image
- `store_links` (array, optional): Store links for the project
- `localizations` (array, optional): Localizations for the project
- `created_at` (datetime): Timestamp when the project was created
- `updated_at` (datetime): Timestamp when the project was last updated

# ProjectGroup

Represents a group that can contain multiple projects.

## Attributes

- `id` (UUID): Unique identifier for the group
- `name` (string): Name of the group
- `description` (string, optional): Description of the group
- `projects` (array, optional): Projects in the group
- `created_at` (datetime): Timestamp when the group was created
- `updated_at` (datetime): Timestamp when the group was last updated

# ApkRelease

Represents an APK release.

## Attributes

- `id` (UUID): Unique identifier for a release
- `project_id` (UUID): Identifier of the project this release belongs to
- `uploaded_by_id` (UUID): Identifier of the user who uploaded the release
- `version` (string): Version string of the release
- `version_code` (number, optional): Version code of the release
- `file_name` (string): Name of the APK file
- `file_size` (number): Size of the APK file in bytes
- `storage_key` (string): Storage key for the APK file
- `sha256` (string): SHA-256 checksum of the APK file
- `status` (enum): Current status of the release
- `created_at` (datetime): Timestamp when the release was created
- `published_at` (datetime, optional): Timestamp when the release was published
