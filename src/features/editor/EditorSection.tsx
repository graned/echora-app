import { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectEditor, addTag } from './editorSlice'
import { Box, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import { motion } from 'framer-motion'

const EditorSection = () => {
  const dispatch = useDispatch()
  const { content, selectedCharacter, selectedEmotion, tags } = useSelector(selectEditor)
  const editorRef = useRef<HTMLDivElement>(null)
  const [selection, setSelection] = useState<Range | null>(null)

  const handleSelection = () => {
    const sel = window.getSelection()
    if (sel && sel.rangeCount > 0) {
      setSelection(sel.getRangeAt(0))
    }
  }

  const handleAssignTag = () => {
    if (selection && !selection.collapsed) {
      const selectedText = selection.toString()
      dispatch(addTag({
        text: selectedText,
        start: getOffset(editorRef.current!, selection.startContainer, selection.startOffset),
        end: getOffset(editorRef.current!, selection.endContainer, selection.endOffset),
      }))
    }
  }

  const getOffset = (parent: Node, node: Node, offset: number): number => {
    // Helper function to calculate text offset
    return 0 // Implementation needed
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Character</InputLabel>
          <Select
            value={selectedCharacter}
            onChange={(e) => dispatch(setSelectedCharacter(e.target.value))}
            label="Character"
          >
            <MenuItem value="bean">Bean</MenuItem>
            <MenuItem value="marcus">Marcus</MenuItem>
            <MenuItem value="luna">Luna</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Emotion</InputLabel>
          <Select
            value={selectedEmotion}
            onChange={(e) => dispatch(setSelectedEmotion(e.target.value))}
            label="Emotion"
          >
            <MenuItem value="neutral">Neutral</MenuItem>
            <MenuItem value="happy">Happy</MenuItem>
            <MenuItem value="sad">Sad</MenuItem>
            <MenuItem value="angry">Angry</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          onClick={handleAssignTag}
          disabled={!selection || selection.collapsed}
        >
          Assign
        </Button>
      </Box>
      <Box
        ref={editorRef}
        contentEditable
        onMouseUp={handleSelection}
        onKeyUp={handleSelection}
        sx={{
          flexGrow: 1,
          p: 2,
          border: '1px solid #555',
          borderRadius: 1,
          outline: 'none',
          overflowY: 'auto',
          '&:focus': {
            borderColor: '#777',
          },
        }}
      >
        {content || <p>Start writing your story here...</p>}
      </Box>
    </Box>
  )
}

export default EditorSection
