<script lang="ts">
	import { mode, toggleMode } from 'mode-watcher';
	import RssIcon from '$lib/assets/rss.svelte';
	import SunIcon from '$lib/assets/sun.svelte';
	import MoonIcon from '$lib/assets/moon.svelte';
	import CcBy from './assets/cc-by.svelte';
</script>

<footer>
	<a
		class="flex items-center gap-x-1.5 text-xs"
		href="https://creativecommons.org/licenses/by/4.0/"
	>
		<CcBy />
		<code>CC BY 4.0</code>
	</a>
	<div class="flex gap-x-2">
		<a href="/rss.xml">
			<RssIcon />
		</a>
		<button onclick={toggleMode}>
			{#if mode.current === 'light'}
				<SunIcon />
			{:else}
				<MoonIcon />
			{/if}
		</button>
	</div>
</footer>

<style lang="postcss">
	@reference '$styles';

	footer {
		@apply mt-8 flex items-baseline justify-between border-t-1 border-secondary py-4 text-dimmed;

		a,
		button {
			@apply hover:cursor-pointer hover:text-accent transition-colors;
		}
	}
</style>
