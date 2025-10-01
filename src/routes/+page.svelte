<script lang="ts">
	import { resolve } from '$app/paths';
	import { BASE_URL, SITE_DESCRIPTION, SITE_NAME } from '$lib/constants';
	import Head from '$lib/Head.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Head title={SITE_NAME} description={SITE_DESCRIPTION} pathname={BASE_URL} />
<p>{SITE_DESCRIPTION}</p>
<h3>Дописи</h3>
<ul id="posts">
	{#each data.posts as post}
		<li>
			<a href={resolve('/article/[id]', { id: post.id })} class="post">
				<span class="title">{post.title}</span>
				<span class="date">
					{post.date.toLocaleDateString('uk-UA', {
						dateStyle: 'long'
					})}
				</span>
			</a>
		</li>
	{/each}
</ul>

<style lang="postcss">
	@reference '$styles';

	#posts {
		@apply flex flex-col gap-y-1;

		.post {
			@apply flex justify-between border-1 border-secondary px-2 py-1 transition-colors hover:bg-secondary;

			.title {
				@apply font-bold;
			}

			.date {
				@apply font-light text-dimmed;
			}
		}
	}
</style>
