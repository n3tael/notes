import { XMLBuilder } from 'fast-xml-parser';

import { BASE_URL, SITE_DESCRIPTION, SITE_NAME } from '$lib/constants';
import { getPosts, getPost } from '$lib/content';

import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = async () => {
	const posts = getPosts().slice(0, 15);

	const rssObject = {
		rss: {
			'@_version': '2.0',
			'@_xmlns:atom': 'http://www.w3.org/2005/Atom',
			channel: {
				title: SITE_NAME,
				link: BASE_URL,
				description: SITE_DESCRIPTION,
				language: 'uk-ua',
				pubDate: new Date().toUTCString(),
				'atom:link': {
					'@_href': `${BASE_URL}rss.xml`,
					'@_rel': 'self',
					'@_type': 'application/rss+xml'
				},
				item: await Promise.all(
					posts.map(async (post) => ({
						title: post.title,
						link: new URL(`/article/${post.id}`, BASE_URL).toString(),
						guid: `n3tael-notes:${post.id}`,
						description: (await getPost(post.id)).html,
						pubDate: post.date.toUTCString()
					}))
				)
			}
		}
	};

	const builder = new XMLBuilder({
		ignoreAttributes: false,
		format: true
	});

	const rssXml = builder.build(rssObject);

	return new Response(rssXml, {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
};
