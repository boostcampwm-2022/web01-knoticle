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
