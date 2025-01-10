# Cardinal Athlete Tracker - Master Plan

## Project Overview

The Cardinal Athlete Tracker is a comprehensive web application designed for strength and conditioning coaches to track athlete performance metrics, manage testing data, and monitor progress over time. The system features a branded interface using school colors (Red, White, Black, with grey accents) and incorporates school logos throughout.

### Key Flow:

1. Admin Coach inputs data
2. System calculates metrics and updates athlete profile
3. Athlete views progress graphs and rankings
4. Coach generates reports and shares with athletes

### Tech Stack:

- **Frontend:**
  - Next.js
  - shadcn
  - Tailwind CSS
  - Lucide Icons
  - Framer Motion

- **Authentication:**
  - NextAuth

- **Backend:**
  - Node.js
  - Prisma
  - Prisma Studio
  - PostgreSQL

## User Roles & Permissions

### Admin Coach
- Full system access
- Manage coach accounts and permissions
- Input/edit all athlete data
- Manage custom tests and weight classes
- View audit trails
- Access all reporting features
- Manage goals and provide feedback
- View notification dashboard

### Sports Coach
- Read-only access to assigned sports
- View athlete profiles and testing data
- View historical data including archived athletes
- View athlete goals
- Receive athlete improvement notifications
- Export reports for assigned sports

### Athlete
- View personal profile and testing history
- Set and track personal goals
- View personal rankings
- Access progress graphs
- Receive achievement notifications


## Core Features

### Athlete Management
- Personal Information
  * First & Last Name
  * Email
  * Gender
  * Graduation Year
  * Sports (multiple possible)
  * Class Hours (multiple possible)

### Testing Categories

**Personal Metrics**
- Height (ft/in, ¼" precision)
- Weight (lbs, 0.1 precision)
- Weight Class (auto-calculated)

**Strength Metrics** (5lb increments)
- Bench Press
- Squat
- Clean
- Incline
- Total (auto-calculated)

**Speed Metrics** (0.01s precision)
- 20 Yard Dash
- 40 Yard Dash
- 10 Meter Fly In
- Pro Agility

**Jumping Metrics**
- Vertical Jump (inches, ¼" precision)
- Broad Jump (ft/in, ¼" precision)

### Weight Classes

**Men's Divisions**
- 123, 148, 165, 181, 198, 220, 242, PWR

**Women's Divisions**
- 105, 114, 123, 132, 148, 165, PWR

## Interface Components

### Dashboards

**Coach Dashboard**
- Athlete management interface
- Testing data input forms
- Quick filters for sports/class hours
- Notification center
- Bulk operations interface
- Report generation tools

**Athlete Dashboard**
- Current metrics display
- Progress graphs
- Goals tracking
- Personal rankings
- Achievement notifications

### Public Pages

**Leaderboard**
- Filters: Gender, Test Type, Class Year, Sports, Class Hour
- Dynamic ranking updates
- Current student rankings

**Recordboard**
- All-time records by gender and weight class
- Top record holder (including alumni)
- Next two best current athletes

## Data Management

### Testing Data
- Individual test date tracking
- Historical data preservation
- Bulk import/export capabilities
- Custom date range reporting
- Excel export functionality

### Archive System
- Automatic archiving on May 25th of graduation year
- Pre-archive notifications
- Manual override options
- Separate archived athlete view
- Record preservation

### Data Validation & Quality Control
- Input validation rules for each test/metric
- Acceptable ranges for measurements
- Data quality checks
- Duplicate entry prevention
- Data correction workflows

### Integration Capabilities
- Import from existing systems
- Third-party integrations (e.g. Google Sheets, Excel)
- Data import/export via CSV

## Notification System

### In-App Notifications
- New test data entry
- Goal achievements
- Performance improvements
- Upcoming archival notices
- Custom notification dashboard

## Reporting

### Export Options
- Individual athlete reports
- Team/sport reports
- Class hour reports
- Custom date ranges
- Excel format support

## Development Phases

### Phase 1: Core Infrastructure
- User authentication
- Basic data structure
- Athlete profiles
- Testing data management

### Phase 2: Testing & Analytics
- Testing input system
- Progress tracking
- Basic reporting
- Leaderboard implementation

### Phase 3: Advanced Features
- Goals system
- Notification system
- Advanced reporting
- Bulk operations

### Phase 4: Enhancement & Polish
- Record board
- Archive system
- Custom tests
- Performance optimization

## Security Considerations
- Role-based access control
- Data encryption
- Audit logging
- Secure authentication
- Regular backups
- FERPA compliance

## Future Expansion Possibilities
- Mobile app integration
- Advanced analytics
- Video upload for form analysis
- Workout planning integration
- Parent portal access
- Team comparison analytics

## Build Order Steps
1. Project Setup
  - Initialize Next.js project with TypeScript
  - Configure Tailwind CSS and shadcn
  - Set up ESLint and Prettier
  - Configure project structure and directories
  - Initialize Git repository
2. Database & Authentication
  - Set up PostgreSQL database
  - Configure Prisma ORM and create schema
  - Implement NextAuth authentication
  - Create user models and roles
  - Set up middleware for route protection
3. Core Infrastructure
  - Build base layout components
  - Create navigation system
  - Implement responsive dashboard layouts
  - Set up API route structure
  - Create global state management
4. User Management
  - Build authentication flows (login/register)
  - Create user profile management
  - Implement role-based access control
  - Set up admin user management
  - Create coach account management
5. Athlete Management
  - Create athlete profile system
  - Build athlete registration flow
  - Implement athlete search and filtering
  - Create athlete grouping (by sport/class)
  - Set up athlete status management
6. Testing System
  - Create test data input forms
  - Build test validation logic
  - Implement test history tracking
  - Create test result calculations
  - Set up weight class automation
7. Data Visualization
  - Build progress tracking graphs
  - Create performance dashboards
  - Implement leaderboard system
  - Build recordboard display
  - Create export functionality
8. Notification System
  - Set up real-time notifications
  - Create achievement notifications
  - Implement goal tracking alerts
  - Build email notification system
  - Create notification preferences
9. Reporting System
  - Create individual athlete reports
  - Build team/group reports
  - Implement custom date range reports
  - Create data export functionality
  - Build printable report templates
10. Archive System
  - Implement data archiving logic
  - Create archive viewing interface
  - Build archive search functionality
  - Set up automatic archiving rules
  - Create archive restoration process
11. Testing & Optimization
  - Implement unit testing
  - Create integration tests
  - Perform security auditing
  - Optimize database queries
  - Implement caching system
12. Deployment & Documentation
  - Set up production environment
  - Configure CI/CD pipeline
  - Create user documentation
  - Write technical documentation
  - Implement backup systems



### Current File Structure

C:.
│   .gitignore
│   components.json
│   eslint.config.mjs
│   next-env.d.ts
│   next.config.ts
│   output.txt
│   package-lock.json
│   package.json
│   postcss.config.mjs
│   README.md
│   tailwind.config.ts
│   tsconfig.json
│   
├───athlete-tracker
│               
├───instructions
│       instructions.md
│       
├───public
│       file.svg
│       globe.svg
│       next.svg
│       vercel.svg
│       window.svg
│       
└───src/
  ├── app/
  │   ├── (auth)/
  │   │   ├── login/
  │   │   └── register/
  │   ├── (dashboard)/
  │   │   ├── admin/
  │   │   ├── coach/
  │   │   └── athlete/
  │   ├── api/
  │   │   ├── auth/
  │   │   ├── athletes/
  │   │   ├── testing/
  │   │   └── reports/
  │   └── public/
  │       ├── leaderboard/
  │       └── recordboard/

  ├── components/
  │   ├── auth/
  │   ├── dashboard/
  │   ├── forms/
  │   ├── tables/
  │   ├── charts/
  │   └── ui/

  ├── lib/
  │   ├── prisma/
  │   ├── auth/
  │   ├── utils/
  │   └── validators/

  ├── types/
  │   └── index.ts

  ├── styles/
  │   └── globals.css

  ├── prisma/
  │   ├── schema.prisma
  │   ├── migrations/
  │   └── seed.ts

  └── config/
      ├── auth.ts
      ├── constants.ts
      └── site.ts

            
