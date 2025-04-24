import { useState } from 'react'
import { Box, CssBaseline, AppBar, Toolbar, IconButton, Typography, Avatar, Menu, MenuItem } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { motion } from 'framer-motion'
import Sidebar from './Sidebar'
import EditorSection from '../features/editor/EditorSection'

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Storytelling App
          </Typography>
          <IconButton onClick={handleMenuOpen} color="inherit">
            <Avatar sx={{ width: 32, height: 32 }} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Sidebar open={sidebarOpen} />
      <Box component="main" sx={{ flexGrow: 1, p: 3, pt: '64px' }}>
        <EditorSection />
      </Box>
    </Box>
  )
}

export default MainLayout
