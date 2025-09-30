import { getPosts } from '../lib/content';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
	return {
		posts: getPosts()
	};
};
