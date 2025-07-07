# Campus Connect - Clubs Website

A React-based web application for managing college clubs and events.

## Tech Stack

- **React 19** - Frontend framework
- **TypeScript** - Type safety
- **Vite** - Build tool and development server
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Supabase** - Backend as a Service & Authentication
- **React Simple Typewriter** - Typewriter effect

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn
- Supabase account (for authentication and database)

### Setting Up Supabase

1. Create a new Supabase project at [https://supabase.com](https://supabase.com)
2. Set up the following tables in Supabase:

**Users Table**:
```sql
create table users (
  id uuid references auth.users not null primary key,
  email text not null unique,
  name text,
  role text not null default 'student',
  branch text,
  year text,
  gender text,
  enrollment text,
  is_profile_complete boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS (Row Level Security)
alter table users enable row level security;

-- Create policies
create policy "Users can view their own data" 
  on users for select using (auth.uid() = id);

create policy "Users can update their own data" 
  on users for update using (auth.uid() = id);

-- Create trigger for new users
create function public.handle_new_user() 
returns trigger 
language plpgsql 
security definer set search_path = public
as $$
begin
  insert into public.users (id, email, name, role)
  values (new.id, new.email, new.raw_user_meta_data->>'name', 'student');
  return new;
end;
$$;

-- Trigger the function when a new user signs up
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

3. Configure auth settings in the Supabase dashboard
   - Enable email confirmation
   - Set up Site URL and redirect URLs
   - Customize email templates if needed

4. Copy your Supabase URL and anon key from the API section
5. Create a `.env` file in the project root based on `.env.example`

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd clubs-website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── data/          # Static data and types
├── App.tsx        # Main app component with routing
└── main.tsx       # Application entry point
```

## Features

- **Home Page** - Landing page with animated hero section
- **Clubs Listing** - Browse all available clubs
- **Club Details** - View individual club information
- **User Authentication** - Login and signup functionality
- **Dashboard** - Student and admin dashboards
- **Responsive Design** - Mobile-friendly interface

## Development

This project uses:
- **Vite** for fast development and building
- **React Router** for client-side navigation
- **Tailwind CSS** for utility-first styling

## License

This project is licensed under the MIT License.
