import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  StyledMarkdownRoot,
  StyledMarkdownHeading,
  StyledMarkdownParagraph,
  StyledMarkdownList,
  StyledMarkdownQuote,
  StyledMarkdownLink,
  StyledMarkdownDivider,
  StyledInlineCode,
  StyledCodeBlock,
  StyledMarkdownTableWrap,
  StyledMarkdownTable,
} from './styled/Markdown.styled.component';

const MARKDOWN_PLUGINS = [remarkGfm];

const MARKDOWN_COMPONENTS: Components = {
  h1: ({ children }) => <StyledMarkdownHeading component="h3">{children}</StyledMarkdownHeading>,
  h2: ({ children }) => <StyledMarkdownHeading component="h4">{children}</StyledMarkdownHeading>,
  h3: ({ children }) => <StyledMarkdownHeading component="h5">{children}</StyledMarkdownHeading>,
  h4: ({ children }) => <StyledMarkdownHeading component="h6">{children}</StyledMarkdownHeading>,
  h5: ({ children }) => <StyledMarkdownHeading component="h6">{children}</StyledMarkdownHeading>,
  h6: ({ children }) => <StyledMarkdownHeading component="h6">{children}</StyledMarkdownHeading>,
  p: ({ children }) => <StyledMarkdownParagraph component="p">{children}</StyledMarkdownParagraph>,
  ul: ({ children }) => <StyledMarkdownList component="ul">{children}</StyledMarkdownList>,
  ol: ({ children }) => <StyledMarkdownList component="ol">{children}</StyledMarkdownList>,
  blockquote: ({ children }) => <StyledMarkdownQuote component="blockquote">{children}</StyledMarkdownQuote>,
  hr: () => <StyledMarkdownDivider component="hr" />,
  a: ({ children, href }) => (
    <StyledMarkdownLink component="a" href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </StyledMarkdownLink>
  ),
  code: ({ children }) => <StyledInlineCode component="code">{children}</StyledInlineCode>,
  pre: ({ children }) => <StyledCodeBlock component="pre">{children}</StyledCodeBlock>,
  table: ({ children }) => (
    <StyledMarkdownTableWrap>
      <StyledMarkdownTable component="table">{children}</StyledMarkdownTable>
    </StyledMarkdownTableWrap>
  ),
};

interface MarkdownProps {
  children: string;
}

function Markdown({ children }: MarkdownProps) {
  return (
    <StyledMarkdownRoot>
      <ReactMarkdown remarkPlugins={MARKDOWN_PLUGINS} components={MARKDOWN_COMPONENTS}>
        {children}
      </ReactMarkdown>
    </StyledMarkdownRoot>
  );
}

export default Markdown;
