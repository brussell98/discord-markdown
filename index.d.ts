import * as markdown from 'simple-markdown';

interface DiscordCallback {
	user?: (node: { id: string }) => string;
	channel?: (node: { id: string }) => string;
	role?: (node: { id: string }) => string;
	everyone?: () => string;
	here?: () => string;
}

interface HTMLOptions {
	embed?: boolean;
	escapeHTML?: boolean;
	discordOnly?: boolean;
	discordCallback?: DiscordCallback;
	cssModuleNames?: Record<string, string>;
}

export function parser(source: string): markdown.SingleASTNode[]
export function htmlOutput(node: markdown.ASTNode, state?: markdown.OptionalState): unknown;
export function toHTML(source: string, options?: HTMLOptions, customParser?: markdown.Parser, customOutput?: markdown.Output): string;
export function htmlTag(tagName: string, content: string, attributes: Record<string, string>, isClosed?: boolean, state?: markdown.State): string

type MarkdownRules = Record<string, Record<string, unknown>>;

export const rules: MarkdownRules;
export const rulesDiscordOnly: MarkdownRules;
export const rulesEmbed: MarkdownRules;
export const markdownEngine: typeof markdown;
