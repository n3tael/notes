<script lang="ts">
	import { page } from '$app/state';
</script>

<center>
	<h1 class="text-9xl!">{page.status}</h1>
	<em>{page.error?.message}</em>
</center>
