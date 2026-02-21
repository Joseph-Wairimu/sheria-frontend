"use client";

import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import {
  Dashboard,
  Scanner,
  Verified,
  Chat,
  Insights,
} from "@mui/icons-material";
import { usePathname, useRouter } from "next/navigation";

const drawerWidth = 256;

const T = {
  navy: "#070b14",
  navy2: "#0d1424",
  navy3: "#111827",
  gold: "#d4a843",
  border: "rgba(255,255,255,0.07)",
  text: "#e2e8f0",
  muted: "#64748b",
};

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { path: "/dashboard", label: "Dashboard", icon: Dashboard, accent: T.gold },
  { path: "/digitize", label: "Digitize", icon: Scanner, accent: "#d4a843" },
  { path: "/verify", label: "Verify", icon: Verified, accent: "#10b981" },
  { path: "/ask", label: "Ask", icon: Chat, accent: "#60a5fa" },
  { path: "/predict", label: "Predict", icon: Insights, accent: "#c084fc" },
];

export default function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
    onClose();
  };

  const drawer = (
    <Box
      sx={{
        height: "100%",
        background: T.navy,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Toolbar sx={{ minHeight: "64px !important" }} />

      <Box sx={{ px: 2.5, pt: 2.5, pb: 1 }}>
        <Typography
          sx={{
            fontFamily: "monospace",
            fontSize: "0.62rem",
            fontWeight: 500,
            color: T.muted,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            "&::before": { content: '"— "', opacity: 0.5 },
          }}
        >
          Navigation
        </Typography>
      </Box>

      <List sx={{ px: 1.5, flex: 1 }}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;

          return (
            <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                sx={{
                  borderRadius: "12px",
                  py: 1.25,
                  px: 1.5,
                  position: "relative",
                  transition: "all 0.2s ease",
                  background: isActive ? `${item.accent}14` : "transparent",
                  border: `1px solid ${isActive ? `${item.accent}28` : "transparent"}`,
                  "&:hover": {
                    background: isActive
                      ? `${item.accent}18`
                      : "rgba(255,255,255,0.04)",
                    borderColor: isActive ? `${item.accent}35` : T.border,
                  },
                }}
              >
                {isActive && (
                  <Box
                    sx={{
                      position: "absolute",
                      left: 0,
                      top: "20%",
                      bottom: "20%",
                      width: 3,
                      borderRadius: "0 3px 3px 0",
                      background: item.accent,
                      boxShadow: `0 0 8px ${item.accent}80`,
                    }}
                  />
                )}

                <ListItemIcon sx={{ minWidth: 38 }}>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: "9px",
                      background: isActive
                        ? `${item.accent}20`
                        : "rgba(255,255,255,0.05)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.2s",
                    }}
                  >
                    <Icon
                      sx={{
                        color: isActive ? item.accent : T.muted,
                        fontSize: 17,
                        transition: "color 0.2s",
                      }}
                    />
                  </Box>
                </ListItemIcon>

                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: isActive ? 700 : 500,
                    fontSize: "0.88rem",
                    color: isActive ? "white" : T.muted,
                    letterSpacing: isActive ? "-0.01em" : 0,
                  }}
                />

                {isActive && (
                  <Box
                    sx={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: item.accent,
                      opacity: 0.8,
                      flexShrink: 0,
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider sx={{ borderColor: T.border, mx: 2 }} />
      <Box sx={{ px: 2.5, py: 2.5 }}>
        <Box
          sx={{
            p: 1.5,
            borderRadius: "12px",
            background: "rgba(212,168,67,0.06)",
            border: "1px solid rgba(212,168,67,0.15)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#10b981",
                boxShadow: "0 0 6px #10b98180",
                animation: "lpPulse 2s ease-in-out infinite",
              }}
            />
            <Typography
              sx={{
                fontSize: "0.72rem",
                color: "#10b981",
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              All systems online
            </Typography>
          </Box>
          <Typography sx={{ fontSize: "0.7rem", color: T.muted }}>
            Sheria Platform v1.0
          </Typography>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            background: T.navy,
            borderRight: `1px solid ${T.border}`,
          },
        }}
      >
        {drawer}
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            background: T.navy,
            borderRight: `1px solid ${T.border}`,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
