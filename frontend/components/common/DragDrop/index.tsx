import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { Container } from '@components/common/DragDrop/Container';

export interface EditScrap {
  id: number;
  order: number;
  article: {
    id: number;
    title: string;
  };
}
export interface ContainerState {
  data: EditScrap[];
  isContentsShown: boolean;
}

export default function DragArticle({ data, isContentsShown }: any) {
  return (
    <DndProvider backend={HTML5Backend}>
      <Container data={data} isContentsShown={isContentsShown} />
    </DndProvider>
  );
}
