import { useState } from 'react';
import { 
  Modal, Paper, Box, Typography, TextField, 
  List, ListItem, ListItemButton, ListItemText, 
  Avatar, Chip, Button, Divider, Checkbox
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MoodIcon from '@mui/icons-material/Mood';

const characterData = [
  { id: 'bean', name: 'Bean' },
  { id: 'marcus', name: 'Marcus' },
  { id: 'luna', name: 'Luna' }
];

const emotions = [
  { id: 'neutral', label: 'Neutral', icon: '😐' },
  { id: 'happy', label: 'Happy', icon: '😊' },
  { id: 'sad', label: 'Sad', icon: '😢' }
];

interface CharacterModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (characters: Record<string, {color: string, emotion: string}>) => void;
  currentCharacters: Record<string, {color: string, emotion: string}>;
}

const CharacterModal: React.FC<CharacterModalProps> = ({ 
  open, 
  onClose, 
  onSelect,
  currentCharacters
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCharacters, setSelectedCharacters] = useState(currentCharacters);
  const [selectedEmotion, setSelectedEmotion] = useState('neutral');

  const filteredCharacters = characterData.filter(char => 
    char.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleCharacter = (characterId: string) => {
    setSelectedCharacters(prev => {
      if (prev[characterId]) {
        const { [characterId]: _, ...rest } = prev;
        return rest;
      } else {
        return {
          ...prev,
          [characterId]: {
            color: `hsl(${Math.random() * 360}, 70%, 60%)`,
            emotion: selectedEmotion
          }
        };
      }
    });
  };

  const handleApply = () => {
    onSelect(selectedCharacters);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Paper sx={{ 
        width: 400,
        maxHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}>
        <Box sx={{ p: 2, borderBottom: '1px solid rgba(0,0,0,0.12)' }}>
          <Typography variant="h6">Select Characters</Typography>
        </Box>
        
        <Box sx={{ p: 2 }}>
          <TextField
            fullWidth
            placeholder="Search characters..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1 }} />,
            }}
          />
        </Box>

        <Box sx={{ overflow: 'auto', flex: 1 }}>
          <List>
            {filteredCharacters.map((character) => (
              <ListItem 
                key={character.id} 
                disablePadding
                secondaryAction={
                  <Checkbox
                    edge="end"
                    checked={!!selectedCharacters[character.id]}
                    onChange={() => handleToggleCharacter(character.id)}
                  />
                }
              >
                <ListItemButton onClick={() => handleToggleCharacter(character.id)}>
                  <Avatar sx={{ 
                    bgcolor: selectedCharacters[character.id]?.color || 'action.disabled',
                    mr: 2 
                  }}>
                    {character.name.charAt(0)}
                  </Avatar>
                  <ListItemText primary={character.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>

        <Divider />

        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            <MoodIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
            Select Emotion
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {emotions.map(emotion => (
              <Chip
                key={emotion.id}
                label={`${emotion.icon} ${emotion.label}`}
                onClick={() => setSelectedEmotion(emotion.id)}
                variant={selectedEmotion === emotion.id ? 'filled' : 'outlined'}
                color="primary"
              />
            ))}
          </Box>
        </Box>

        <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid rgba(0,0,0,0.12)' }}>
          <Button variant="outlined" sx={{ mr: 2 }} onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleApply}>
            Apply
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
};

export default CharacterModal;
