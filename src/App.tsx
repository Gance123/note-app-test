import "./App.css";
import { Flex } from "@chakra-ui/react";

import { Main } from "./components/organisms/Main";
import { SideBar } from "./components/organisms/SideBar";
import { useButton } from "./components/hooks/useButton";
import { note } from "./components/types/Note";
import { useEffect } from "react";

import { useEdit } from "./components/hooks/useEdit";

export default function App() {
  const {
    onClickAddNote,
    onClickDeleteNote,
    setNotes,
    notes,
    activeNote, //acctive中のnote.id
    setActiveNote,
  } = useButton();

  // const { onUpdateNote, getActiveNote } = useEdit();

  useEffect(() => {
    // ローカルストレージにノートを保存する
    // 値はJSON形式化しないと保存できない
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    setActiveNote(notes[0].id);
  }, []);

  // 複数あるnote(notes /objectの配列)から、そのnote.idと クリックしたnoteのid(activeNote)が一致したもの(object)を見つけてそれを返す。
  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  };
  // 初期のactiveNoteは"false” → UseEffectでnote[0].id →クリックするとクリックしたnote.idになる

  //修正された新しいノートの配列を返す。
  const onUpdateNote = (updatedNote: note) => {
    const updatedNotesArray = notes.map((note) => {
      // 修正(編集)された(されている)noteのidと一致しているnoteには・・
      if (note.id === updatedNote.id) {
        return updatedNote;
      } else {
        return note;
      }
    });
    setNotes(updatedNotesArray);
  };

  return (
    <Flex>
      <SideBar
        onAddNote={onClickAddNote}
        onDeleteNote={onClickDeleteNote}
        notes={notes}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
      />
      <Main getActiveNote={getActiveNote()} onUpdateNote={onUpdateNote} />
    </Flex>
  );
}

// getActiveNoteでactiveNoteを特定
// onEditNoteでgetActiveNoteを書き換える
// onUpdateNoteでSideBarを書き換える
