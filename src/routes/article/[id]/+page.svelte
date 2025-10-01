<script lang="ts">
	import { page } from '$app/state';
	import { BASE_URL } from '$lib/constants';
	import Head from '$lib/Head.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Head
	title={data.metadata.title}
	description={data.metadata.description || ''}
	pathname={new URL(page.url.pathname, BASE_URL).toString()}
/>

<h1>{data.metadata.title}</h1>
<p class="meta">
	<span>
		{data.metadata.date.toLocaleDateString('uk-UA', {
			dateStyle: 'long'
		})}
	</span>
	<span>
		{Math.ceil((data.metadata.wordsCount || 0) / 120)} хв.
	</span>
	<span>
		<a
			class="transition-colors hover:text-dimmed-hover"
			data-sveltekit-reload
			href={`/article/${data.metadata.id}.md`}>переглянути код</a
		>
	</span>
</p>

<div
	class="mx-auto prose prose-neutral md:prose-lg lg:prose-xl dark:prose-invert"
>
	{@html data.html}
</div>

<style lang="postcss">
	@reference '$styles';

	.meta {
		@apply text-center text-sm text-dimmed;

		span:not(:last-child):after {
			content: ' ·';
		}
	}

	h1 {
		@apply m-0! text-center;
	}
</style>
