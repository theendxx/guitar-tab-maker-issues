import React, { useState, useEffect, useRef } from 'react';
import './styles/main.scss';
import TabEditor from 'modules/TabEditor';
import AppContext, { openNotesInitialValue } from 'AppContext';
import { TabNote, Note } from 'types/notes';
import { EditorState } from 'draft-js';
import { getEmptyTablature, insertNote, insertMultipleNote } from 'modules/TabEditor/service';
import { convertToOpenNote } from 'utils/notes';
import GuitarFretboard from './modules/GuitarFretboard';

function App() {
  const isInit = useRef(true);
  const [openNotes, setOpenNotes] = useState(openNotesInitialValue);
  const [isMultipleNotes, setIsMultipleNotes] = useState(false);
  const [editorState, setEditorState] = useState<EditorState>(getEmptyTablature(openNotes));

  function addNote(note: TabNote): void {
    const state = isMultipleNotes
      ? insertMultipleNote(editorState, note)
      : insertNote(editorState, note);

    setEditorState(state);
  }

  function setOpenNote(note: Note, guitarString: number): void {
    setOpenNotes((currentOpenNotes) => ({
      ...currentOpenNotes,
      [guitarString]: convertToOpenNote(note),
    }));
  }

  function clearEditorState() {
    setEditorState(getEmptyTablature(openNotes));
  }

  useEffect(() => {
    if (isInit.current) {
      isInit.current = false;
    } else {
      clearEditorState();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openNotes]);

  return (
    <div className="container">
      <header className="header">Guitar</header>
      <AppContext.Provider
        value={{
          editorState,
          isMultipleNotes,
          setIsMultipleNotes,
          setEditorState,
          addNote,
          openNotes,
          setOpenNotes: setOpenNote,
          clearEditorState,
        }}
      >
        <GuitarFretboard />
        <TabEditor />
      </AppContext.Provider>
    </div>
  );
}

export default App;
