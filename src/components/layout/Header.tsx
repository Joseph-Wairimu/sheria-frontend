"use client";

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Avatar,
  Box,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
} from "@mui/material";
import {
  Notifications,
  Settings,
  Logout,
  Person,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { useState } from "react";
import { useAuthStore } from "@/src/store/useAuthStore";
import { useRouter } from "next/navigation";

const T = {
  navy: "#070b14",
  navy2: "#0d1424",
  gold: "#d4a843",
  goldLt: "#f0c96a",
  border: "rgba(255,255,255,0.07)",
  text: "#e2e8f0",
  muted: "#64748b",
};

interface UserProfileData {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  role?: string;
}
interface HeaderProps {
  onMenuClick: () => void;
  user: UserProfileData;
  setUser: (user: UserProfileData) => void;
}

export default function Header({ onMenuClick, user, setUser }: HeaderProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notifAnchor, setNotifAnchor] = useState<null | HTMLElement>(null);
  const router = useRouter();

  const handleMenu = (e: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(e.currentTarget);
  const handleNotifications = (e: React.MouseEvent<HTMLElement>) =>
    setNotifAnchor(e.currentTarget);
  const handleClose = () => {
    setAnchorEl(null);
    setNotifAnchor(null);
  };

  const handleLogout = async () => {
    const logout = useAuthStore.getState().logout;
    try {
      await logout();
      handleClose();
      router.push("/user-login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const menuPaperSx = {
    background: T.navy2,
    border: `1px solid ${T.border}`,
    borderRadius: "14px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
    color: T.text,
    mt: 1.5,
    "& .MuiMenuItem-root": {
      color: T.text,
      fontSize: "0.88rem",
      fontWeight: 500,
      borderRadius: "8px",
      mx: 0.75,
      "&:hover": { background: "rgba(255,255,255,0.06)" },
    },
    "& .MuiDivider-root": { borderColor: T.border, mx: 1 },
    "& .MuiListItemIcon-root": { color: T.muted, minWidth: 36 },
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: `${T.navy}ee`,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: `1px solid ${T.border}`,
      }}
    >
      <Toolbar sx={{ py: 1, minHeight: "64px !important" }}>
        {/* Mobile menu button */}
        <IconButton
          edge="start"
          onClick={onMenuClick}
          sx={{
            mr: 2,
            display: { sm: "none" },
            color: T.muted,
            "&:hover": { color: "white" },
          }}
        >
          <MenuIcon />
        </IconButton>

        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: "10px",
              background: "linear-gradient(135deg, #d4a843, #b8860b)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
              fontSize: "1.2rem",
              color: T.navy,
              fontFamily: "Georgia, serif",
              boxShadow: "0 0 16px rgba(212,168,67,0.3)",
            }}
          >
            S
          </Box>
          <Box>
            <Typography
              sx={{
                fontFamily: "Georgia, serif",
                fontWeight: 700,
                fontSize: "1.2rem",
                color: "white",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
              }}
            >
              Sheria
            </Typography>
            <Typography
              sx={{
                fontSize: "0.62rem",
                fontWeight: 600,
                color: T.muted,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Governance Platform
            </Typography>
          </Box>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        {/* Right actions */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          {/* Notifications */}
          <IconButton
            onClick={handleNotifications}
            sx={{
              color: T.muted,
              "&:hover": {
                color: "white",
                background: "rgba(255,255,255,0.06)",
              },
              borderRadius: "10px",
            }}
          >
            <Badge
              badgeContent={3}
              sx={{
                "& .MuiBadge-badge": {
                  background: T.gold,
                  color: T.navy,
                  fontWeight: 800,
                  fontSize: "0.6rem",
                  minWidth: 16,
                  height: 16,
                },
              }}
            >
              <Notifications sx={{ fontSize: 20 }} />
            </Badge>
          </IconButton>

          {/* Avatar */}
          <IconButton
            onClick={handleMenu}
            sx={{
              ml: 0.5,
              "&:hover": { background: "rgba(255,255,255,0.06)" },
              borderRadius: "10px",
              p: 0.75,
            }}
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                background: `linear-gradient(135deg, ${T.gold}, #b8860b)`,
                color: T.navy,
                fontWeight: 800,
                fontSize: "0.85rem",
                fontFamily: "Georgia, serif",
              }}
            >
              {user?.username?.charAt(0)?.toUpperCase() || "U"}
            </Avatar>
          </IconButton>

          {/* Profile menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            PaperProps={{ elevation: 0, sx: { ...menuPaperSx, minWidth: 210 } }}
          >
            <Box sx={{ px: 2.5, py: 1.75 }}>
              <Typography
                sx={{ fontWeight: 700, color: "white", fontSize: "0.9rem" }}
              >
                {user?.username || "---"}
              </Typography>
              <Typography sx={{ fontSize: "0.75rem", color: T.muted }}>
                {user?.email || "---"}
              </Typography>
            </Box>
            <Divider />
            <Box sx={{ p: 0.75 }}>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Person sx={{ fontSize: 17 }} />
                </ListItemIcon>
                My Profile
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Settings sx={{ fontSize: 17 }} />
                </ListItemIcon>
                Settings
              </MenuItem>
              <Divider />
              <MenuItem
                onClick={handleLogout}
                sx={{ color: "#f87171 !important" }}
              >
                <ListItemIcon>
                  <Logout sx={{ fontSize: 17, color: "#f87171" }} />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Box>
          </Menu>

          {/* Notifications menu */}
          <Menu
            anchorEl={notifAnchor}
            open={Boolean(notifAnchor)}
            onClose={handleClose}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            PaperProps={{ elevation: 0, sx: { ...menuPaperSx, minWidth: 320 } }}
          >
            <Box
              sx={{
                px: 2.5,
                py: 1.75,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{ fontWeight: 700, color: "white", fontSize: "0.9rem" }}
              >
                Notifications
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.7rem",
                  color: T.gold,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Mark all read
              </Typography>
            </Box>
            <Divider />
            <Box sx={{ p: 0.75 }}>
              {[
                {
                  msg: "Document digitized — Case #KE-2024-8821",
                  time: "2 min ago",
                  color: T.gold,
                },
                {
                  msg: "Verification passed — Affidavit filed",
                  time: "11 min ago",
                  color: "#10b981",
                },
                {
                  msg: "Prediction ready — Case #KE-2024-7103",
                  time: "34 min ago",
                  color: "#c084fc",
                },
              ].map((n, i) => (
                <MenuItem
                  key={i}
                  onClick={handleClose}
                  sx={{ py: 1.5, px: 1.5, alignItems: "flex-start", gap: 1.5 }}
                >
                  <Box
                    sx={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: n.color,
                      mt: 0.7,
                      flexShrink: 0,
                      boxShadow: `0 0 6px ${n.color}80`,
                    }}
                  />
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "0.82rem",
                        color: T.text,
                        fontWeight: 600,
                        mb: 0.25,
                      }}
                    >
                      {n.msg}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "0.7rem",
                        color: T.muted,
                        fontFamily: "monospace",
                      }}
                    >
                      {n.time}
                    </Typography>
                  </Box>
                </MenuItem>
              ))}
            </Box>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
