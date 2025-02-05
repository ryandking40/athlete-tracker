# Athlete Tracker

A comprehensive web application for tracking and managing high school athletes' performance, with a focus on powerlifting and strength training.

## Features

- **Dashboard**: Central hub for quick access to all features
- **Weightroom Management**: Track workouts, exercises, and create training sheets
- **Data Entry & Analysis**: Record and analyze athlete performance data
- **Competition Management**: Track meets, records, and qualifying totals
- **Team Management**: Manage rosters and athlete information
- **Calendar**: Schedule training sessions and competitions

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework for production
- [TypeScript](https://www.typescriptlang.org/) - Type safety and better developer experience
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Shadcn/UI](https://ui.shadcn.com/) - Re-usable components
- [React](https://reactjs.org/) - UI library

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/athlete-tracker.git
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── dashboard/         # Dashboard and feature pages
│   │   ├── weightroom/   # Weightroom management
│   │   ├── data/        # Data entry and analysis
│   │   ├── calendar/    # Calendar and scheduling
│   │   └── settings/    # User settings
│   └── layout.tsx        # Root layout
├── components/           # Reusable UI components
└── styles/              # Global styles
```

## Development Mode

Currently in design mode, using dummy data to prototype the application interface. Backend functionality will be implemented in future iterations.

## License

[MIT](https://choosealicense.com/licenses/mit/)
