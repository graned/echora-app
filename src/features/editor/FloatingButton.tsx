import { Button } from '@mui/material'
import { motion } from 'framer-motion'
import PeopleIcon from '@mui/icons-material/People'

export const FloatingButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 1000
      }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={onClick}
        sx={{
          borderRadius: '50%',
          width: '56px',
          height: '56px',
          minWidth: 0,
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
          '& .MuiButton-startIcon': {
            margin: 0
          }
        }}
      >
        <PeopleIcon />
      </Button>
    </motion.div>
  )
}
