import { PreviewWrapper } from './styled';

interface PreviewProps {
  title: string;
  content: string;
}

export default function Preview({ title, content }: PreviewProps) {
  return (
    <PreviewWrapper>
      <h1>{title}</h1>
      <div
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
    </PreviewWrapper>
  );
}
