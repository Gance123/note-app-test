import { note } from "../types/Note";
import { useButton } from "./useButton";

export const useEdit = () => {
  const {
    notes,
    setNotes,
    activeNote, //active中のnote.id
  } = useButton();

  // 複数あるnote(notes /objectの配列)から、そのnote.idと クリックしたり特定したいnoteのid(activeNote)が一致したもの(object)を見つけてそれを返す。
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

  return { onUpdateNote, getActiveNote };
};
