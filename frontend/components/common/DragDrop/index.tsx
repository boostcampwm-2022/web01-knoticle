import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { Container } from '@components/common/DragDrop/Container';

export interface EditScrap {
  id: number;
  order: number;
  is_original: boolean;
  article: {
    id: number;
    title: string;
  };
}
export interface ContainerState {
  data: EditScrap[];
  isContentsShown: boolean;
  isDeleteBtnShown: boolean;
}

export default function DragArticle({ data, isContentsShown, isDeleteBtnShown }: ContainerState) {
  return (
    <DndProvider backend={HTML5Backend}>
      <Container
        data={data}
        isContentsShown={isContentsShown}
        isDeleteBtnShown={isDeleteBtnShown}
      />
    </DndProvider>
  );
}
