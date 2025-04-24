import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { demoLogin, login } from './authSlice'
import { motion } from 'framer-motion'
import { Button, TextField, Box, Typography, Paper } from '@mui/material'

const AuthPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(login({ email, password }))
  }

  const handleDemoLogin = () => {
    dispatch(demoLogin())
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Paper elevation={6} sx={{ p: 4, width: 400 }}>
          <Typography variant="h4" gutterBottom align="center">
            Storytelling App
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              sx={{ mt: 2 }}
            >
              Login
            </Button>
            <Button
              fullWidth
              variant="outlined"
              color="secondary"
              onClick={handleDemoLogin}
              sx={{ mt: 2 }}
            >
              Login as Demo
            </Button>
          </form>
        </Paper>
      </motion.div>
    </Box>
  )
}

export default AuthPage
