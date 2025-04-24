import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface EditorState {
  content: string
  selectedCharacter: string
  selectedEmotion: string
  tags: Array<{
    id: string
    character: string
    emotion: string
    text: string
    start: number
    end: number
  }>
}

const initialState: EditorState = {
  content: '',
  selectedCharacter: 'bean',
  selectedEmotion: 'neutral',
  tags: [],
}

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload
    },
    setSelectedCharacter: (state, action: PayloadAction<string>) => {
      state.selectedCharacter = action.payload
    },
    setSelectedEmotion: (state, action: PayloadAction<string>) => {
      state.selectedEmotion = action.payload
    },
    addTag: (state, action: PayloadAction<{
      text: string
      start: number
      end: number
    }>) => {
      const { text, start, end } = action.payload
      state.tags.push({
        id: Date.now().toString(),
        character: state.selectedCharacter,
        emotion: state.selectedEmotion,
        text,
        start,
        end,
      })
    },
    removeTag: (state, action: PayloadAction<string>) => {
      state.tags = state.tags.filter(tag => tag.id !== action.payload)
    },
  },
})

export const {
  setContent,
  setSelectedCharacter,
  setSelectedEmotion,
  addTag,
  removeTag,
} = editorSlice.actions

export const selectEditor = (state: { editor: EditorState }) => state.editor
export default editorSlice.reducer
