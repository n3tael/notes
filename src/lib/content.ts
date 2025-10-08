import * as v from 'valibot';
import matter from 'gray-matter';
import { error, text } from '@sveltejs/kit';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkGfm from 'remark-gfm';
import rehypeFigure from '@microflash/rehype-figure';
import rehypeStringify from 'rehype-stringify';
import stripMarkdown from 'strip-markdown';
import remarkStringify from 'remark-stringify';

const posts = import.meta.glob('/src/articles/*.mdx', {
	query: '?raw',
	import: 'default',
	eager: true
});

const scheme = v.object({
	id: v.pipe(v.string(), v.trim()),
	title: v.pipe(v.string(), v.trim()),
	description: v.optional(v.pipe(v.string(), v.trim())),
	wordsCount: v.optional(v.pipe(v.number())),
	date: v.pipe(
		v.string(),
		v.transform((s) => new Date(s)),
		v.date()
	)
});

export function getPosts() {
	return Object.entries(posts)
		.map(([path, rawContent]) => {
			const { data } = matter(rawContent);
			const id = path
				.split('/')
				.pop()
				?.replace(/\.mdx$/, '') as string;

			const post = v.parse(scheme, { id, ...data });

			return post;
		})
		.sort((a, b) => b.date.valueOf() - a.date.valueOf());
}

export async function getPost(id: string) {
	const path = `/src/articles/${id}.mdx`;
	if (!posts[path]) return error(404);

	let { content, data } = matter(posts[path]);
	
	data.wordsCount = (await unified().use(remarkParse).use(stripMarkdown).use(remarkStringify, { resourceLink: false }).process(content)).toString().match(/\S+/g)?.length || 0;
	
	data.description = content.trim().split('\n')[0];

	const metadata = v.parse(scheme, { id, ...data });
	const html = (
		await unified()
			.use(remarkParse)
			.use(remarkGfm)
			.use(remarkRehype, { allowDangerousHtml: true, footnoteLabel: 'Примітки' })
			.use(rehypeFigure)
			.use(rehypeStringify, { allowDangerousHtml: true })
			.process(content)
	).toString();

	return { metadata, html };
}

export function getPostSource(id: string): Response {
	const path = `/src/articles/${id}.mdx`;
	if (!posts[path]) return error(404);

	const { content, data } = matter(posts[path]);

	return text(`# ${data.title}\n\n${content}`, {
		headers: {
			'Content-Type': 'text/markdown; charset=utf-8'
		}
	});
}
