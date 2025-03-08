import ReactMarkdown from "react-markdown";
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import 'katex/dist/katex.min.css';

/**
 * Renders markdown content passed as children.
 *
 * @param children markdown text to render
 */
const MarkdownLatexWrapper = ({
	children
}: {
	children: React.ReactNode
}) => {
    // ensures that markdownText is a string
	const markdownText = typeof children === "string" ? children : "";
	return (
		<ReactMarkdown
			components={{
				p: ({ ...props }) => <>{props.children}</>,
			}}
			remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeKatex]}
		>
			{markdownText}
		</ReactMarkdown>
	);
};

export default MarkdownLatexWrapper;
