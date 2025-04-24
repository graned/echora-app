import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { selectAuth } from './features/auth/authSlice'
import AuthPage from './features/auth/AuthPage'
import MainLayout from './layout/MainLayout'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

function App() {
  const { isAuthenticated } = useSelector(selectAuth)

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {isAuthenticated ? <MainLayout /> : <AuthPage />}
      </motion.div>
    </ThemeProvider>
  )
}

export default App
