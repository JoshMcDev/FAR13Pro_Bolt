# FAR 13 Pro - Modern Government Acquisition Platform

A cutting-edge web application built with Next.js, NestJS, Supabase, and AI integration for government contracting officers managing FAR 13 simplified acquisitions.

## 🚀 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router and server-side rendering
- **shadcn/ui** - Modern, accessible component library built on Radix UI
- **Tailwind CSS** - Utility-first CSS framework with dark mode support
- **TypeScript** - Type-safe development with enhanced IDE support

### Backend
- **NestJS** - Scalable, TypeScript-based backend framework
- **Supabase** - PostgreSQL database with real-time subscriptions and authentication
- **Swagger/OpenAPI** - Comprehensive API documentation

### AI & Orchestration
- **OpenAI API** - Advanced language model capabilities
- **LangChain** - AI workflow management and prompt engineering
- **Vector Search** - Semantic similarity matching for FAR regulations

## 🏗️ Architecture

### Frontend Architecture
```
app/
├── globals.css          # Global styles and CSS variables
├── layout.tsx          # Root layout with providers
├── page.tsx            # Main dashboard page
components/
├── ui/                 # shadcn/ui components
├── dashboard.tsx       # Main dashboard component
├── navbar.tsx          # Navigation component
├── auth-provider.tsx   # Authentication context
└── theme-provider.tsx  # Theme management
lib/
├── utils.ts           # Utility functions
└── supabase.ts        # Supabase client configuration
services/
├── ai.ts              # OpenAI integration
├── langchain.ts       # LangChain workflows
└── supabase.ts        # Database operations
```

### Backend Architecture
```
src/
├── main.ts                    # Application entry point
├── app.module.ts             # Root module
├── acquisitions/             # Acquisition management
│   ├── acquisitions.controller.ts
│   ├── acquisitions.service.ts
│   └── dto/
├── documents/                # Document management
│   ├── documents.controller.ts
│   ├── documents.service.ts
│   └── dto/
└── ai/                       # AI services
    ├── ai.controller.ts
    ├── ai.service.ts
    ├── langchain.service.ts
    └── dto/
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- Supabase account and project
- OpenAI API key

### 1. Clone and Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend && npm install
```

### 2. Environment Configuration

Create `.env.local` in the root directory:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# OpenAI Configuration
OPENAI_API_KEY=your-openai-api-key

# Backend API
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Create `.env` in the `backend/` directory:
```env
# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# OpenAI
OPENAI_API_KEY=your-openai-api-key

# Application
PORT=3001
FRONTEND_URL=http://localhost:3000
```

### 3. Database Setup

Run the following SQL in your Supabase SQL editor:

```sql
-- Create acquisitions table
CREATE TABLE acquisitions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT CHECK (status IN ('planning', 'solicitation', 'evaluation', 'awarded')) DEFAULT 'planning',
  location_mode TEXT CHECK (location_mode IN ('CONUS', 'OCONUS')) NOT NULL,
  estimated_value DECIMAL NOT NULL,
  progress INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create documents table
CREATE TABLE documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  acquisition_id UUID REFERENCES acquisitions(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  type TEXT CHECK (type IN ('rfq', 'rfp', 'market_research', 'acquisition_plan')) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create workflow_items table
CREATE TABLE workflow_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  acquisition_id UUID REFERENCES acquisitions(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  status TEXT CHECK (status IN ('completed', 'in-progress', 'pending')) DEFAULT 'pending',
  phase TEXT CHECK (phase IN ('planning', 'solicitation', 'evaluation')) NOT NULL,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE acquisitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflow_items ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can manage their own acquisitions" ON acquisitions
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage documents for their acquisitions" ON documents
  FOR ALL USING (
    acquisition_id IN (
      SELECT id FROM acquisitions WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage workflow items for their acquisitions" ON workflow_items
  FOR ALL USING (
    acquisition_id IN (
      SELECT id FROM acquisitions WHERE user_id = auth.uid()
    )
  );
```

### 4. Development

```bash
# Start frontend development server
npm run dev

# Start backend development server (in another terminal)
npm run backend:dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- API Documentation: http://localhost:3001/api

## 🎨 Design System

### Color Palette
- **Primary**: Blue gradient (hsl(217.2 91.2% 59.8%))
- **Secondary**: Slate variations for backgrounds and text
- **Accent**: Purple/pink gradients for highlights
- **Status Colors**: Green (success), Orange (warning), Red (error)

### Typography
- **Font**: Inter with multiple weights (300, 400, 500, 600)
- **Hierarchy**: Consistent sizing and spacing
- **Readability**: High contrast ratios for accessibility

### Components
- Built with shadcn/ui for consistency and accessibility
- Dark mode support throughout
- Responsive design with mobile-first approach
- Smooth transitions and hover states

## 🤖 AI Features

### OpenAI Integration
- **Document Generation**: Automated RFQ/RFP creation
- **Compliance Checking**: FAR regulation validation
- **Market Analysis**: Vendor landscape insights
- **Conversational AI**: Natural language assistance

### LangChain Workflows
- **Knowledge Base**: FAR 13 regulation embeddings
- **Document Processing**: Intelligent content analysis
- **Chain of Thought**: Multi-step reasoning for complex queries
- **Vector Search**: Semantic similarity matching

## 🗄️ Database Schema

### Core Tables
- **acquisitions**: Main acquisition records with status tracking
- **documents**: Generated documents and templates
- **workflow_items**: Individual workflow tasks and status
- **auth.users**: Supabase authentication (built-in)

### Security
- Row Level Security (RLS) enabled on all tables
- User-based access control
- Secure API endpoints with proper validation

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
```

### Backend (Railway/Heroku/DigitalOcean)
```bash
cd backend
npm run build
npm run start:prod
```

### Environment Variables
Ensure all production environment variables are configured in your deployment platform.

## 🧪 API Documentation

The backend provides comprehensive API documentation via Swagger:
- Local: http://localhost:3001/api
- Production: https://your-api-domain.com/api

### Key Endpoints
- `GET /acquisitions` - List user acquisitions
- `POST /acquisitions` - Create new acquisition
- `GET /documents` - Get documents by acquisition
- `POST /ai/chat` - AI chat interface
- `POST /ai/generate-document` - Generate documents with AI

## 🔒 Security Features

### Authentication
- Supabase Auth with email/password
- JWT token-based authentication
- Secure session management

### Data Protection
- Row Level Security (RLS) in database
- Input validation and sanitization
- CORS configuration
- Environment variable protection

### Compliance
- Government security standards alignment
- Audit trail capabilities
- Data encryption in transit and at rest

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is designed for government use and follows applicable federal regulations.

## 🆘 Support

For technical support:
1. Check the API documentation at `/api`
2. Review the component documentation in `components/`
3. Consult the database schema in this README
4. Open an issue for bugs or feature requests

---

**Note**: This is a production-ready application demonstrating modern web development practices for government applications. Ensure proper security hardening and compliance validation before production deployment.