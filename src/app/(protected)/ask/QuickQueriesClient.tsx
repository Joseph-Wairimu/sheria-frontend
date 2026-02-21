"use client";

import { Box, Typography } from "@mui/material";
import type { SvgIconComponent } from "@mui/icons-material";

const T = {
  navy3: "#111827",
  border: "rgba(255,255,255,0.07)",
  text: "#e2e8f0",
  muted: "#64748b",
};

interface QuickQueriesClientProps {
  query: string;
  icon: SvgIconComponent;
  accent: string;
}

export default function QuickQueriesClient({
  query,
  icon: Icon,
  accent,
}: QuickQueriesClientProps) {
  const handleQuerySelect = () => {
    window.dispatchEvent(
      new CustomEvent("quickQuerySelected", { detail: { query } }),
    );
  };

  return (
    <Box
      onClick={handleQuerySelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleQuerySelect();
      }}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.25,
        px: 1.5,
        py: 1.1,
        borderRadius: "10px",
        cursor: "pointer",
        border: "1px solid transparent",
        transition: "all 0.18s ease",
        mb: 0.5,
        "&:hover": {
          background: `${accent}0d`,
          borderColor: `${accent}22`,
          "& .qi-icon": { color: accent },
          "& .qi-label": { color: "#fff" },
          "& .qi-arrow": { opacity: 1, transform: "translateX(0)" },
        },
        "&:focus-visible": {
          outline: `2px solid ${accent}60`,
          outlineOffset: 2,
        },
      }}
    >
      <Box
        sx={{
          width: 28,
          height: 28,
          borderRadius: "8px",
          flexShrink: 0,
          background: "rgba(255,255,255,0.04)",
          border: `1px solid ${T.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.18s",
        }}
      >
        <Icon
          className="qi-icon"
          sx={{ fontSize: 14, color: T.muted, transition: "color 0.18s" }}
        />
      </Box>

      <Typography
        className="qi-label"
        sx={{
          fontSize: "0.82rem",
          fontWeight: 500,
          color: T.muted,
          flex: 1,
          lineHeight: 1.3,
          transition: "color 0.18s",
        }}
      >
        {query}
      </Typography>

      <Typography
        className="qi-arrow"
        sx={{
          fontSize: "0.75rem",
          color: T.muted,
          opacity: 0,
          transform: "translateX(-4px)",
          transition: "all 0.18s ease",
          flexShrink: 0,
        }}
      >
        →
      </Typography>
    </Box>
  );
}
