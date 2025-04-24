import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material'
import { motion } from 'framer-motion'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'

const Sidebar = ({ open }: { open: boolean }) => {
  return (
    <Drawer
      variant="persistent"
      open={open}
      sx={{
        width: open ? 240 : 0,
        flexShrink: 0,
        transition: 'width 0.3s ease',
        '& .MuiDrawer-paper': {
          width: open ? 240 : 0,
          boxSizing: 'border-box',
          transition: 'width 0.3s ease',
        },
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Toolbar />
        <Divider />
        <List>
          {['Stories', 'Characters', 'Settings'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </motion.div>
    </Drawer>
  )
}

export default Sidebar
