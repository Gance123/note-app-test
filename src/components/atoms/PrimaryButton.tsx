import React, { FC, memo, ReactNode } from "react";
import { Button } from "@chakra-ui/react";

type Props = {
  fontSize: string;
  color?: string;
  bg?: string;
  onClick: () => void;
  children: ReactNode;
};

export const PrimaryButton: FC<Props> = memo((props) => {
  const { fontSize, color = "#08c", bg = "white", onClick, children } = props;
  return (
    <Button
      fontSize={fontSize}
      color={color}
      bg={bg}
      onClick={onClick}
      outline="none"
      border="none"
      borderRadius="5px"
      cursor="pointer"
    >
      {children}
    </Button>
  );
});
