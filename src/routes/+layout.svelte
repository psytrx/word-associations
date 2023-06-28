<script lang="ts">
	import '$lib/styles/app.css';
</script>

<div>
	<slot />
</div>

<style>
	div {
		margin: 0 auto;
		max-width: min(calc(100% - var(--size-4)), 80ch);
	}
</style>
