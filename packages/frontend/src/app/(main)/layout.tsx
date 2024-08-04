import { Box } from '@mui/material';

import { Menu } from '@/app/components/menu';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <Menu />
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
}
