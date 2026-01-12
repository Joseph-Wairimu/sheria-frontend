
'use client';

import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  alpha,
} from '@mui/material';
import {
  Dashboard,
  Scanner,
  Verified,
  Chat,
  Insights,
} from '@mui/icons-material';
import { usePathname, useRouter } from 'next/navigation';

const drawerWidth = 260;

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { path: '/', label: 'Dashboard', icon: Dashboard, color: '#2563eb' },
  { path: '/digitize', label: 'Digitize', icon: Scanner, color: '#8b5cf6' },
  { path: '/verify', label: 'Verify', icon: Verified, color: '#10b981' },
  { path: '/ask', label: 'Ask', icon: Chat, color: '#f59e0b' },
  { path: '/predict', label: 'Predict', icon: Insights, color: '#ec4899' },
];

export default function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
    onClose();
  };

  const drawer = (
    <Box sx={{ height: '100%', bgcolor: '#fafafa' }}>
      <Toolbar />
      <List sx={{ px: 2, pt: 3 }}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;

          return (
            <ListItem key={item.path} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                sx={{
                  borderRadius: 2,
                  py: 1.5,
                  transition: 'all 0.2s',
                  ...(isActive && {
                    bgcolor: alpha(item.color, 0.1),
                    '&:hover': {
                      bgcolor: alpha(item.color, 0.15),
                    },
                  }),
                  ...(!isActive && {
                    '&:hover': {
                      bgcolor: 'rgba(0, 0, 0, 0.04)',
                    },
                  }),
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <Icon 
                    sx={{ 
                      color: isActive ? item.color : 'text.secondary',
                      fontSize: 24,
                    }} 
                  />
                </ListItemIcon>
                <ListItemText 
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: isActive ? 700 : 600,
                    color: isActive ? item.color : 'text.secondary',
                    fontSize: '0.9375rem',
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
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
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: drawerWidth,
            borderRight: '1px solid',
            borderColor: 'divider',
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
