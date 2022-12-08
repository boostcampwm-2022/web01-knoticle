import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';

import DragContainer from '@components/common/DragDrop/Container';

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
    <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
      <DragContainer
        data={data}
        isContentsShown={isContentsShown}
        isDeleteBtnShown={isDeleteBtnShown}
      />
    </DndProvider>
  );
}
