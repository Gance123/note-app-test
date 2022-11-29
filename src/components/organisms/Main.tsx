import { memo } from "react";
import { Box, Flex, Input, Text, Textarea } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";

import { note } from "../types/Note";

type Props = {
  getActiveNote: note | undefined;
  onUpdateNote: any;
};

export const Main = memo((props: Props) => {
  const { getActiveNote, onUpdateNote } = props;

  // getActiveNote(クリックしたnote)にe.target.valueをkeyプロパティに追加しmodDateを更新する
  const onEditNote = (key: string, e: string) => {
    onUpdateNote({
      ...getActiveNote,
      [key]: e,
      modDate: Date.now(),
    });
  };

  if (!getActiveNote) {
    return (
      <Flex as="h1" m="auto" alignItems="center" color="#999">
        ノートが選択されていません
      </Flex>
    );
  }
  // getActiveNoteがあれば・・・
  return (
    <Box w="70%">
      <Flex
        p="25px"
        flexDirection="column"
        gap="20px"
        borderBottom="1px solid rgb(211, 211, 211)"
      >
        <Input
          id="title"
          h="50px"
          w="100%"
          fontSize="1.6rem"
          value={getActiveNote?.title}
          onChange={(e) => onEditNote("title", e.target.value)}
          // keyとvalueを引数に取る
        />
        <Textarea
          id="content"
          placeholder="ノート内容を記入"
          display="block"
          h="calc(50vh - 130px)"
          w="100%"
          resize="none"
          value={getActiveNote?.content}
          onChange={(e) => onEditNote("content", e.target.value)}
          // keyとvalueを引数に取る
        />
      </Flex>
      <Box overflowY="scroll" bg="rgba(0,0,0,0.04)" h="50vh" w="100%">
        <Text as="h1" p="25px 25px 0px 25px" margin="0">
          {getActiveNote?.title}
        </Text>

        <ReactMarkdown className="markdown">
          {getActiveNote?.content}
        </ReactMarkdown>
      </Box>
    </Box>
  );
});

