import { Box, Grid } from "@mui/material";
import { Language, Chat, Psychology, Speed } from "@mui/icons-material";
import PageHeader from "@/src/components/common/PageHeader";
import StatCard from "@/src/components/common/StatCard";
import { SUPPORTED_LANGUAGES } from "@/src/lib/constants";
import QuickQueries from "./QuickQueries";
import AskPageClient from "./AskPageClient";

const T = {
  navy2: "#0d1424",
  gold: "#d4a843",
  emerald: "#10b981",
  blue: "#60a5fa",
  purple: "#c084fc",
  border: "rgba(255,255,255,0.07)",
  muted: "#64748b",
};

async function getStats() {
  try {
    const response = await fetch(
      "https://sheria-backend.greyteam.co.ke/rag/stats",
      {
        headers: { accept: "application/json" },
        next: { revalidate: 60 },
      },
    );
    if (!response.ok) throw new Error("Failed to fetch stats");
    return await response.json();
  } catch {
    return {
      queriestoday: "--",
      languages: "3",
      avgResponseTime: "--",
      accuracy: "--",
    };
  }
}

export default async function AskPage() {
  const statsData = await getStats();

  const stats = [
    {
      title: "Queries Today",
      value: statsData.queriestoday || "--",
      icon: Chat,
      color: T.gold,
    },
    {
      title: "Languages",
      value: statsData.languages || "--",
      icon: Language,
      color: T.emerald,
    },
    {
      title: "Avg Response Time",
      value: statsData.avgResponseTime || "--",
      icon: Speed,
      color: T.blue,
    },
    {
      title: "Accuracy",
      value: statsData.accuracy || "--",
      icon: Psychology,
      color: T.purple,
    },
  ];

  return (
    <Box sx={{ color: "#e2e8f0" }}>
      <PageHeader
        title="Sheria Ask"
        description="Conversational AI agent for judicial data access and legal insights"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Ask" }]}
      />

      {/* Stats */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {stats.map((stat) => (
          <Grid item xs={6} md={3} key={stat.title}>
            <StatCard
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
            />
          </Grid>
        ))}
      </Grid>

      {/* Main layout */}
      <Grid container spacing={2.5}>
        {/* Left sidebar */}
        <Grid item xs={12} md={3}>
          {/* Settings card */}
          <Box
            sx={{
              background: T.navy2,
              border: `1px solid ${T.border}`,
              borderRadius: "16px",
              p: 2.5,
              mb: 2,
            }}
          >
            <Box
              sx={{
                fontFamily: "monospace",
                fontSize: "0.65rem",
                color: T.muted,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                mb: 2,
                "&::before": { content: '"— "', opacity: 0.5 },
              }}
              component="p"
              style={{ margin: 0, marginBottom: 16 }}
            >
              Settings
            </Box>
            <AskPageClient
              supportedLanguages={SUPPORTED_LANGUAGES}
              settingsOnly
            />
          </Box>

          <QuickQueries />
        </Grid>

        <Grid item xs={12} md={9}>
          <Box sx={{ height: 680 }}>
            <AskPageClient supportedLanguages={SUPPORTED_LANGUAGES} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
