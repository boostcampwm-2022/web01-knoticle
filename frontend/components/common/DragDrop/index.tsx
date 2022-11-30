import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { Container } from '@components/common/DragDrop/Container';

export default function DragArticle({ data, isContentsShown }: any) {
  return (
    <DndProvider backend={HTML5Backend}>
      <Container data={data} isContentsShown={isContentsShown} />
    </DndProvider>
  );
}
