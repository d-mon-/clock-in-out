'use client';

import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import { CSSObject, styled, Theme } from '@mui/material/styles';
import Link from 'next/link';
import { useState } from 'react';
import { MdChevronLeft, MdChevronRight, MdHome } from 'react-icons/md';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const menuItems: { label: string; link: string; icon: React.ReactElement }[] = [
  { label: 'Home', link: '/', icon: <MdHome /> },
];

export function Menu() {
  const [open, setOpen] = useState(false);

  const handleDrawerClose = () => {
    setOpen((v) => !v);
  };

  return (
    <Drawer variant='permanent' open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {open ? <MdChevronLeft /> : <MdChevronRight />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {menuItems.map((menuItem) => (
          <ListItem
            key={menuItem.label}
            disablePadding
            sx={{ display: 'block' }}
          >
            <Link href={menuItem.link} passHref>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {menuItem.icon}
                </ListItemIcon>
                <ListItemText
                  primary={menuItem.label}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
