import { Dispatch, memo, SetStateAction } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

import { PrimaryButton } from "../atoms/PrimaryButton";
import { note } from "../types/Note";

type Props = {
  onAddNote: () => void;
  onDeleteNote: (id: string) => void;
  notes: Array<note>;
  activeNote: string;
  setActiveNote: Dispatch<SetStateAction<string>>;
};

export const SideBar = memo((props: Props) => {
  const { onAddNote, onDeleteNote, notes, activeNote, setActiveNote } = props;
  // sortedNotes = notesのmodDateが大きい順(新しい順)に並べたもの
  const sortedNotes = notes.sort((a, b) => b.modDate - a.modDate);

  return (
    <>
      <Box w="30%" h="100vh" borderRight="1px solid #ddd">
        <Flex
          className="app-sidebar-header"
          justify="space-between"
          alignItems="center"
          p="25px"
        >
          <Text fontSize="30px" fontWeight="bold" margin={0}>
            ノート
          </Text>
          <PrimaryButton fontSize={"16px"} bg={"none"} onClick={onAddNote}>
            追加
          </PrimaryButton>
        </Flex>
        <Box
          className="app-sidebar-notes"
          h="calc(100vh - 78px)"
          overflowY="scroll"
        >
          {sortedNotes.map((note) => (
            <Box
              key={note.id}
              p="25px"
              cursor="pointer"
              transition="all .2s"
              _hover={{ bg: "rgb(211, 211, 211)" }}
              onClick={() => setActiveNote(note.id)}
              // setActiveNote()にnote.idが入る
              // ・・・初期値”false”から選択したノートのidに変わる。
              className={`app-sidebar-note ${
                // onClickしたnoteと一致しているnoteはハイライトされる
                note.id === activeNote && "active"
              }`}
            >
              <Flex
                className="app-sidebar-title"
                justify="space-between"
                alignItems="center"
              >
                <Text fontWeight="bold">{note.title}</Text>
                <PrimaryButton
                  fontSize={"16px"}
                  bg={"none"}
                  onClick={() => onDeleteNote(note.id)}
                >
                  削除
                </PrimaryButton>
              </Flex>
              {/* <Text>{note.content}</Text> */}
              <Text color="#999" fontSize="14px">
                {new Date(note.modDate).toLocaleDateString("ja-JP", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
});
