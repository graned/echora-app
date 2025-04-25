import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectEditor, setSelectedCharacters } from './editorSlice';
import { 
  Box, Button, Chip, Avatar, Typography, TextField, 
  Tooltip, Stack, colors 
} from '@mui/material';
import { FloatingButton } from './FloatingButton';
import CharacterModal from './CharacterModal';
import MoodIcon from '@mui/icons-material/Mood';

const DEFAULT_COLORS = [
  colors.green[500], 
  colors.blue[500], 
  colors.purple[500]
];

const EditorSection = () => {
  const dispatch = useDispatch();
  const { content, selectedCharacters } = useSelector(selectEditor);
  const [openModal, setOpenModal] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  // Get currently selected characters
  const currentCharacters = Object.keys(selectedCharacters);

  const handleCharacterSelect = (characters: Record<string, {color: string, emotion: string}>) => {
    dispatch(setSelectedCharacters(characters));
    setOpenModal(false);
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh',
      p: 2,
      gap: 2
    }}>
      {/* Story Title */}
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Story Title"
        sx={{
          '& .MuiOutlinedInput-root': {
            fontSize: '1.5rem',
            fontWeight: 'bold'
          }
        }}
      />

      {/* Character Chips */}
      {currentCharacters.length > 0 && (
        <Box sx={{
          p: 1,
          backgroundColor: 'rgba(0,0,0,0.05)',
          borderRadius: 1,
          display: 'flex',
          gap: 1,
          flexWrap: 'wrap'
        }}>
          {currentCharacters.map(character => (
            <Chip
              key={character}
              avatar={
                <Avatar sx={{ 
                  bgcolor: selectedCharacters[character]?.color || DEFAULT_COLORS[0],
                  color: 'white'
                }}>
                  {character.charAt(0).toUpperCase()}
                </Avatar>
              }
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography>{character}</Typography>
                  <MoodIcon sx={{ fontSize: 18, ml: 1 }} />
                </Box>
              }
              sx={{
                height: 40,
                borderRadius: 20,
                backgroundColor: 'white',
                border: '1px solid #ddd'
              }}
            />
          ))}
        </Box>
      )}

      {/* Editor Area */}
      <Box
        ref={editorRef}
        contentEditable
        dangerouslySetInnerHTML={{ __html: content || '<p>Start writing your story here...</p>' }}
        sx={{
          flex: 1,
          p: 3,
          border: '1px solid #ddd',
          borderRadius: 1,
          outline: 'none',
          overflowY: 'auto',
          minHeight: '200px',
          '&:focus': {
            borderColor: '#1976d2'
          }
        }}
      />

      <FloatingButton onClick={() => setOpenModal(true)} />
      
      {/* Character Selection Modal */}
      <CharacterModal 
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSelect={handleCharacterSelect}
        currentCharacters={selectedCharacters}
      />
    </Box>
  );
};

export default EditorSection;
