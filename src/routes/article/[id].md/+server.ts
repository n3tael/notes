import { getPostSource } from '$lib/content';
import { error, type RequestHandler } from '@sveltejs/kit';

export const prerender = true;

export const GET: RequestHandler = ({ params }) => {
	if (!params.id) return error(404);
	return getPostSource(params.id);
};
