<script lang="ts">
	import { page } from '$app/state';
	import { BASE_URL } from '$lib/constants';
	import Head from '$lib/Head.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Head
	title={data.metadata.title}
	description={data.metadata.description}
	pathname={new URL(page.url.pathname, BASE_URL).toString()}
/>

<span class="meta">
	{data.metadata.date.toLocaleDateString('uk-UA', {
		dateStyle: 'long'
	})} |
	{Math.ceil(data.metadata.wordsCount / 120)} хв. |
	<a
		class="transition-colors hover:text-gray-500"
		href={`/article/${data.metadata.id}.md`}>переглянути код</a
	>
</span>
<h1>{data.metadata.title}</h1>

<div class="mx-auto prose md:prose-lg lg:prose-xl">
	{@html data.html}
</div>

<style lang="postcss">
	@reference '$styles';

	.meta {
		@apply text-center text-sm text-gray-400;
	}

	h1 {
		@apply m-0! text-center;
	}
</style>
