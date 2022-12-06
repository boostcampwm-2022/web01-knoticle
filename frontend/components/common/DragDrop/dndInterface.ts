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
}
