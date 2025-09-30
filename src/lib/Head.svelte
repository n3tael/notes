<script lang="ts">
	import { page } from '$app/state';
	import { BASE_URL, SITE_NAME } from '$lib/constants';

	interface Props {
		title: string;
		description: string;
		pathname: string;
	}

	let { title, description, pathname }: Props = $props();

	const canonicalURL = new URL(pathname, BASE_URL).toString();
</script>

<svelte:head>
	<!--<link rel="sitemap" href="/sitemap.xml" />-->

	<link rel="canonical" href={canonicalURL} />

	<title>
		{page.url.pathname === '/' ? title : `${title} • ${SITE_NAME}`}
	</title>
	<meta name="title" content={title} />
	<meta name="description" content={description} />

	<meta property="og:type" content="website" />
	<meta property="og:url" content={canonicalURL} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />

	<meta property="twitter:card" content="summary" />
	<meta property="twitter:url" content={canonicalURL} />
	<meta property="twitter:title" content={title} />
	<meta property="twitter:description" content={description} />
</svelte:head>
