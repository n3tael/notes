<script lang="ts">
	import RssIcon from '$lib/assets/rss.svelte';
</script>

<header>
	<a href="/">
		<h1><span class="font-normal italic">нотатки</span> нетаєля</h1>
	</a>
	<a href="/rss.xml">
		<RssIcon />
	</a>
</header>

<style lang="postcss">
	@reference '$styles';

	header {
		@apply my-8 flex items-baseline justify-center gap-x-2;

		h1 {
			@apply m-0! text-4xl font-bold;
		}
	}
</style>
