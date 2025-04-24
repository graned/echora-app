import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CharacterData {
  color: string;
  emotion: string;
}

interface EditorState {
  content: string;
  storyTitle: string;
  selectedCharacters: Record<string, CharacterData>;
  selectedEmotion: string;
  tags: Array<{
    id: string;
    character: string;
    emotion: string;
    text: string;
    start: number;
    end: number;
  }>;
}

const initialState: EditorState = {
  content: '',
  storyTitle: '',
  selectedCharacters: {},
  selectedEmotion: 'neutral',
  tags: [],
};

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
    },
    setStoryTitle: (state, action: PayloadAction<string>) => {
      state.storyTitle = action.payload;
    },
    setSelectedCharacters: (state, action: PayloadAction<Record<string, CharacterData>>) => {
      state.selectedCharacters = action.payload;
    },
    removeSelectedCharacter: (state, action: PayloadAction<string>) => {
      const { [action.payload]: _, ...rest } = state.selectedCharacters;
      state.selectedCharacters = rest;
    },
    setSelectedEmotion: (state, action: PayloadAction<string>) => {
      state.selectedEmotion = action.payload;
      // Update emotion for all selected characters
      Object.keys(state.selectedCharacters).forEach(char => {
        state.selectedCharacters[char].emotion = action.payload;
      });
    },
    addTag: (state, action: PayloadAction<{
      id: string;
      text: string;
      character: string;
      emotion: string;
      start: number;
      end: number;
    }>) => {
      state.tags.push(action.payload);
    },
    removeTag: (state, action: PayloadAction<string>) => {
      state.tags = state.tags.filter(tag => tag.id !== action.payload);
    },
  },
});

export const {
  setContent,
  setStoryTitle,
  setSelectedCharacters,
  removeSelectedCharacter,
  setSelectedEmotion,
  addTag,
  removeTag,
} = editorSlice.actions;

export const selectEditor = (state: { editor: EditorState }) => state.editor;
export default editorSlice.reducer;
