# IEP Pilot - AI-Powered IEP Writing Tool

A modern web application that helps special education teachers write comprehensive Individualized Education Programs (IEPs) in minutes using Claude AI.

## Features

- **AI-Powered IEP Generation**: Generate customized IEP sections using Claude AI
- **Goal Bank**: Access 5000+ evidence-based goals across all grade levels
- **Progress Monitoring**: Track student progress toward IEP goals with visual analytics
- **Student Management**: Organize and manage your students and their IEPs
- **Export Options**: Download IEPs as PDF or Word documents
- **Secure Authentication**: User authentication powered by Supabase
- **Flexible Billing**: Individual and district pricing plans with Stripe integration

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **AI**: Anthropic Claude API
- **Payments**: Stripe
- **Deployment**: Vercel
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- Stripe account
- Anthropic API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/iep-pilot.git
cd iep-pilot
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your configuration:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
STRIPE_SECRET_KEY=sk_live_your-key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your-key
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret
NEXT_PUBLIC_APP_URL=http://localhost:3000
ANTHROPIC_API_KEY=sk-ant-your-api-key
```

4. Set up Supabase database:
   - Create a new Supabase project
   - Go to SQL Editor in the Supabase dashboard
   - Open and run the migration file: `supabase/migrations/001_initial.sql`

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
iep-pilot/
├── src/
│   ├── app/
│   │   ├── (public landing pages)
│   │   ├── auth/
│   │   │   ├── login/page.tsx
│   │   │   └── signup/page.tsx
│   │   ├── api/
│   │   │   └── generate-iep/route.ts
│   │   ├── dashboard/
│   │   │   ├── page.tsx
│   │   │   ├── students/page.tsx
│   │   │   ├── goal-bank/page.tsx
│   │   │   ├── progress/page.tsx
│   │   │   ├── settings/page.tsx
│   │   │   └── iep/new/page.tsx
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts
│   │   │   └── server.ts
│   │   └── stripe.ts
│   └── middleware.ts
├── supabase/
│   └── migrations/
│       └── 001_initial.sql
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
├── vercel.json
└── README.md
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | Yes |
| `STRIPE_SECRET_KEY` | Stripe secret API key | Yes |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | Yes |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret | Yes |
| `NEXT_PUBLIC_APP_URL` | Application URL | Yes |
| `ANTHROPIC_API_KEY` | Anthropic API key for Claude | Yes |

## Database Schema

### profiles
- `id` (UUID, Primary Key) - User ID from Supabase Auth
- `email` (TEXT) - User email
- `name` (TEXT) - User full name
- `role` (TEXT) - User role (teacher, admin, coordinator)
- `school_district` (TEXT) - School district name
- `created_at`, `updated_at` (TIMESTAMP)

### students
- `id` (UUID, Primary Key)
- `teacher_id` (UUID, Foreign Key) - Reference to profiles
- `grade_level` (TEXT) - Student grade
- `disability_category` (TEXT) - IDEA disability category
- `placement` (TEXT) - Educational placement
- `created_at`, `updated_at` (TIMESTAMP)

### goals
- `id` (UUID, Primary Key)
- `teacher_id` (UUID, Foreign Key) - Reference to profiles
- `domain` (TEXT) - Goal domain (Reading, Math, etc.)
- `grade_band` (TEXT) - Grade range
- `goal_text` (TEXT) - Goal description
- `is_from_bank` (BOOLEAN) - Whether from goal bank
- `created_at`, `updated_at` (TIMESTAMP)

### iep_documents
- `id` (UUID, Primary Key)
- `student_id` (UUID, Foreign Key) - Reference to students
- `teacher_id` (UUID, Foreign Key) - Reference to profiles
- `status` (TEXT) - Document status (draft, in_review, completed)
- `content_json` (JSONB) - IEP content as JSON
- `created_at`, `updated_at` (TIMESTAMP)

## Building and Deployment

### Build locally:
```bash
npm run build
npm start
```

### Deploy to Vercel:
1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

## API Routes

### POST `/api/generate-iep`
Generates an IEP using Claude AI.

Request:
```json
{
  "studentId": "STU001",
  "goalIds": ["G001", "G002"]
}
```

Response:
```json
{
  "success": true,
  "content": {
    "presentLevels": "...",
    "goals": ["...", "..."],
    "accommodations": ["..."],
    "services": ["..."]
  }
}
```

## Development

### Type Checking
```bash
npm run type-check
```

### Linting
```bash
npm run lint
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@ieppilot.com or visit our website at https://ieppilot.com

## Roadmap

- [ ] Mobile app support
- [ ] Real-time collaboration
- [ ] Advanced analytics dashboard
- [ ] Integration with student information systems
- [ ] Multi-language support
- [ ] Video conferencing for IEP meetings
- [ ] Document e-signature
- [ ] Automated IDEA compliance checking
