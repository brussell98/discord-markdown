import * as markdown from 'simple-markdown';

interface DiscordCallback {
  user?: (id: number) => string;
  channel?: (id: number) => string;
  role?: (id: number) => string;
  everyone?: () => string;
  here?: () => string;
}

interface HTMLOptions {
  embed?: boolean;
  escapeHTML?: boolean;
  discordOnly?: boolean;
  discordCallback: DiscordCallback;
  cssModuleNames: Record<string, string>;
}

export function parser(source: string): markdown.SingleASTNode[]
export function htmlOutput(node: markdown.ASTNode, state?: markdown.OptionalState): unknown;
export function toHTML(source: string, options?: HTMLOptions): string;
export function htmlTag(tagName: string, content: string, attributes: Record<string, string>, isClosed?: boolean, state?: markdown.State): string

type MarkdownRules = Record<string, Record<string, unknown>>;

export const rules: MarkdownRules;
export const rulesDiscordOnly: MarkdownRules;
export const rulesEmbed: MarkdownRules;
export const markdownEngine: typeof markdown;
