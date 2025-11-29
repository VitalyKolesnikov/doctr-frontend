# DoctR Frontend

A React-based frontend application for managing patients, visits, clinics, and reminders in a dental practice management system.

## Features

- **Patient Management**: Create, read, update, and delete patient records
- **Visit Tracking**: Record and manage patient visits with clinic information
- **Reminder System**: Set up and track reminders for patients
- **Clinic Management**: Manage multiple clinic locations
- **Authentication**: Secure login system with JWT tokens
- **Responsive UI**: Built with React Bootstrap for mobile-friendly interface

## Tech Stack

- **React 18.2.0** - UI library
- **React Router DOM 5.2.0** - Routing
- **React Bootstrap 1.4.3** - UI components
- **Axios 1.4.0** - HTTP client
- **Moment.js 2.29.1** - Date manipulation
- **React DatePicker** - Date selection component
- **React Number Format** - Number formatting
- **React Promise Tracker** - Loading state management

## Prerequisites

- Node.js 16.x or higher
- Yarn or npm package manager
- Backend API running on `http://localhost:8080` (or configure proxy in `package.json`)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd doctr-frontend
```

2. Install dependencies:
```bash
yarn install
# or
npm install
```

## Available Scripts

### `yarn start` or `npm start`

Runs the app in development mode at [http://localhost:3000](http://localhost:3000).

The page will reload automatically when you make edits. You'll also see any lint errors in the console.

### `yarn test` or `npm test`

Launches the test runner in interactive watch mode.

### `yarn build` or `npm run build`

Builds the app for production to the `build` folder. The build is optimized and minified for best performance.

## Project Structure

```
src/
├── components/          # React components
│   ├── auth/           # Authentication components
│   ├── clinics/        # Clinic management
│   ├── common/         # Shared components
│   ├── patients/       # Patient management
│   ├── reminders/      # Reminder system
│   └── visits/         # Visit tracking
├── config/             # Configuration files
│   └── api.js          # API endpoints configuration
├── services/           # API service layer
│   ├── AuthService.js
│   ├── PatientService.js
│   ├── VisitService.js
│   ├── ReminderService.js
│   ├── ClinicService.js
│   └── axios-config.js # Axios interceptors
└── utils/              # Utility functions
```

## Configuration

### API Configuration

API endpoints are centralized in `src/config/api.js`. Update the `BASE_URL` if your backend runs on a different port or domain.

### Environment Variables

Create a `.env` file in the root directory for environment-specific configuration:

```
REACT_APP_API_URL=http://localhost:8080
```

## Authentication

The app uses JWT tokens stored in localStorage. Tokens are automatically included in API requests via axios interceptors.

## Development Guidelines

- Use functional components with hooks
- Follow React best practices
- Add PropTypes for component props
- Use centralized API configuration
- Handle errors gracefully with axios interceptors

## Recent Improvements

- ✅ Updated to React 18 with createRoot API
- ✅ Centralized API configuration
- ✅ Added PropTypes validation
- ✅ Improved error handling with axios interceptors
- ✅ Replaced window.confirm with modal dialogs
- ✅ Fixed useEffect dependencies
- ✅ Removed unused dependencies
- ✅ Improved code quality and security

## License

Private project - All rights reserved
