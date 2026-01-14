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

export default function MainLayout({ children, initialUser }: MainLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(initialUser);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Header onMenuClick={handleDrawerToggle} user={user} setUser={setUser} />
      <Sidebar mobileOpen={mobileOpen} onClose={handleDrawerToggle} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - 240px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
