"use client";

import { useState } from "react";
import { Box, Toolbar } from "@mui/material";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface UserProfileData {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  role?: string;
}

interface MainLayoutProps {
  children: React.ReactNode;
  initialUser: UserProfileData;
}

const T = {
  navy: "#070b14",
  navy2: "#0d1424",
};

export default function MainLayout({ children, initialUser }: MainLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(initialUser);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <Box sx={{ display: "flex", background: T.navy, minHeight: "100vh" }}>
      <Header onMenuClick={handleDrawerToggle} user={user} setUser={setUser} />
      <Sidebar mobileOpen={mobileOpen} onClose={handleDrawerToggle} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          background: T.navy,
          width: { sm: `calc(100% - 256px)` },
          // Thin scrollbar styled for dark theme
          overflowY: "auto",
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(255,255,255,0.1) transparent",
          "&::-webkit-scrollbar": { width: 5 },
          "&::-webkit-scrollbar-track": { background: "transparent" },
          "&::-webkit-scrollbar-thumb": {
            background: "rgba(255,255,255,0.1)",
            borderRadius: 4,
            "&:hover": { background: "rgba(255,255,255,0.18)" },
          },
        }}
      >
        <Toolbar sx={{ minHeight: "64px !important" }} />
        <Box sx={{ p: { xs: 2, md: 3 } }}>{children}</Box>
      </Box>
    </Box>
  );
}
