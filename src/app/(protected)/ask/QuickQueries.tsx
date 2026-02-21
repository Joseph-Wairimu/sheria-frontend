import { Box, Typography } from "@mui/material";
import {
  FolderOpen,
  VerifiedUser,
  BarChart,
  LocalHospital,
  AccountBalance,
  TrendingUp,
} from "@mui/icons-material";
import QuickQueriesClient from "./QuickQueriesClient";

const T = {
  navy2: "#0d1424",
  gold: "#d4a843",
  border: "rgba(255,255,255,0.07)",
  muted: "#64748b",
};

const queries = [
  { label: "Show recent documents", icon: FolderOpen, accent: "#d4a843" },
  { label: "Verify ID status", icon: VerifiedUser, accent: "#10b981" },
  { label: "Education statistics for 2024", icon: BarChart, accent: "#60a5fa" },
  {
    label: "Healthcare trends in Nairobi",
    icon: LocalHospital,
    accent: "#c084fc",
  },
  { label: "Governance insights", icon: AccountBalance, accent: "#d4a843" },
  { label: "Predict enrollment rates", icon: TrendingUp, accent: "#10b981" },
];

export default function QuickQueries() {
  return (
    <Box
      sx={{
        background: T.navy2,
        border: `1px solid ${T.border}`,
        borderRadius: "16px",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Box sx={{ px: 2.5, pt: 2.5, pb: 1.5 }}>
        <Typography
          component="p"
          sx={{
            fontFamily: "monospace",
            fontSize: "0.65rem",
            color: T.muted,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            m: 0,
            "&::before": { content: '"— "', opacity: 0.5 },
          }}
        >
          Quick Queries
        </Typography>
      </Box>

      {/* Query list */}
      <Box sx={{ px: 1.5, pb: 1.5 }}>
        {queries.map((q) => (
          <QuickQueriesClient
            key={q.label}
            query={q.label}
            icon={q.icon}
            accent={q.accent}
          />
        ))}
      </Box>
    </Box>
  );
}
