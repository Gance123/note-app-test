import { useEffect, useState } from "react";
import uuid from "react-uuid";

import { note } from "../types/Note";

export const useButton = () => {
  const [activeNote, setActiveNote] = useState<string>("false");
  //初期値が空だと更新ボタンで初期化されてしまう
  // App.jsでsetItemするためにJSON化→今回はgetItemの為に戻す
  const [notes, setNotes] = useState<Array<note>>(
    JSON.parse(localStorage.getItem("notes") || "")
  );

  const onClickAddNote = () => {
    const newNote = {
      id: uuid(),
      title: "新しいノート",
      content: "",
      modDate: Date.now(),
    };
    setNotes([...notes, newNote]);
  };

  const onClickDeleteNote = (id: string) => {
    // trueになったものを残す。
    // ・・・note.id !== idなもの（一致しないもの）を残す。
    // ・・・一致したものだけ消す。
    const filterNotes = notes.filter((note) => note.id !== id);
    setNotes(filterNotes);
  };

  return {
    onClickAddNote,
    onClickDeleteNote,
    notes,
    setNotes,
    activeNote,
    setActiveNote,
  };
};
