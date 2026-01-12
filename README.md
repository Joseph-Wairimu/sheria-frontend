# Sheria Platform - Material-UI Edition

AI-powered governance platform for Kenya with document digitization, verification, conversational AI, and predictive analytics built with Material-UI.

## Features

### 🔍 Sheria Digitize
- Advanced OCR with Tesseract and OpenCV
- Multi-language support (English, Kiswahili)
- Document classification and quality assurance
- Named Entity Recognition for Kenyan context

### ✅ Sheria Verify
- Real-time document validation
- ML-based fraud detection
- Blockchain-certified audit trails
- Sub-60-second processing

### 💬 Sheria Ask
- Natural language query processing
- Multilingual interface (English, Kiswahili, Sheng)
- Rule-driven decision support
- Transparent explanations with cited sources

### 📊 Sheria Predict
- No-code predictive modeling
- Domain-driven analytics (Education, Healthcare, Governance)
- Proactive resource allocation
- Continuous learning capabilities

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI Library**: Material-UI (MUI) v5
- **Language**: TypeScript
- **State Management**: Zustand
- **Data Fetching**: SWR + Axios
- **Charts**: Recharts + MUI X Charts
- **Icons**: Material Icons

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Backend API running

### Installation

1. Clone and install:
```bash
git clone https://github.com/yourusername/sheria-platform.git
cd sheria-platform
npm install
```

2. Configure environment:
```bash
cp .env.local.example .env.local
# Edit .env.local with your API endpoints
```

3. Run development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
sheria-platform/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with MUI theme
│   │   ├── page.tsx            # Homepage
│   │   ├── theme.ts            # MUI theme configuration
│   │   ├── ThemeRegistry.tsx   # Theme provider
│   │   ├── digitize/           # Digitize module
│   │   ├── verify/             # Verify module
│   │   ├── ask/                # Ask module
│   │   └── predict/            # Predict module
│   ├── components/
│   │   ├── layout/             # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── MainLayout.tsx
│   │   ├── common/             # Shared components
│   │   │   ├── StatCard.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   ├── PageHeader.tsx
│   │   │   └── StatusChip.tsx
│   │   ├── digitize/           # Digitize components
│   │   │   ├── FileUpload.tsx
│   │   │   └── ProcessingResults.tsx
│   │   ├── verify/             # Verify components
│   │   │   ├── VerificationForm.tsx
│   │   │   └── VerificationResults.tsx
│   │   ├── ask/                # Ask components
│   │   │   ├── ChatInterface.tsx
│   │   │   ├── MessageBubble.tsx
│   │   │   └── QuickQueries.tsx
│   │   └── predict/            # Predict components
│   │       ├── ModelBuilder.tsx
│   │       ├── PredictionChart.tsx
│   │       └── InsightsDashboard.tsx
│   ├── lib/
│   │   ├── api/                # API clients
│   │   │   ├── client.ts
│   │   │   ├── digitize.ts
│   │   │   ├── verify.ts
│   │   │   ├── ask.ts
│   │   │   └── predict.ts
│   │   ├── utils/              # Utilities
│   │   │   └── formatters.ts
│   │   └── constants.ts
│   ├── store/                  # Zustand stores
│   │   └── useAuthStore.ts
│   └── types/                  # TypeScript types
│       └── index.ts
└── public/                     # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Check TypeScript types

## MUI Customization

The theme is configured in `src/app/theme.ts`. Key customizations:

- **Primary Color**: Sky Blue (#0284c7) - represents Kenyan sky
- **Secondary Color**: Purple (#c026d3) - for accents
- **Typography**: Inter font family
- **Custom Components**: Button, Card styling

To modify the theme, edit `src/app/theme.ts`.

## API Integration

API clients are in `src/lib/api/`. Each module has its own client:

- `digitize.ts` - Document processing
- `verify.ts` - Document verification
- `ask.ts` - Conversational AI
- `predict.ts` - Predictive analytics

Update `NEXT_PUBLIC_API_URL` in `.env.local` to connect to your backend.

## Component Library

All components use Material-UI:

- **Layout**: AppBar, Drawer, Container
- **Forms**: TextField, Select, Button
- **Feedback**: Alert, Snackbar, Progress
- **Data Display**: Card, Chip, Avatar
- **Navigation**: Tabs, Menu

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import in Vercel
3. Add environment variables
4. Deploy

### Docker

```bash
docker build -t sheria-platform .
docker run -p 3000:3000 sheria-platform
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## License

MIT License - see LICENSE file

## Support

- GitHub Issues: [Report bugs](https://github.com/yourusername/sheria-platform/issues)
- Email: support@sheriaplatform.ke
- Documentation: [docs.sheriaplatform.ke](https://docs.sheriaplatform.ke)

## Acknowledgments

- Material-UI team for the excellent UI library
- Next.js team for the framework
- Kenya government for inspiration







