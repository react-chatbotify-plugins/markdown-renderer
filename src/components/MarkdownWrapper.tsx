import ReactMarkdown from "react-markdown";

/**
 * Renders markdown content passed as children.
 *
 * @param children markdown text to render
 */
const MarkdownWrapper = ({
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
		>
			{markdownText}
		</ReactMarkdown>
	);
};

export default MarkdownWrapper;
