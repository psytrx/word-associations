<script lang="ts">
	import { translatePos } from './translate.js';

	export let data;
</script>

<a href="/">Zurück zur Startseite</a>

<h1>{data.query}</h1>

<ul class="group">
	{#each Object.entries(data.groupedByPos) as [key, items]}
		<li>
			<h2>{translatePos(key)}</h2>
			<ul>
				{#each items as item}
					{@const size = Math.floor(
						Math.max(1, Math.min(8, ((100 - 50) / 8) * (item.weight / 100)))
					)}
					<li>
						<a href="/{data.locale}/words/{item.item}" style:font-size="var(--font-size-{size})">
							{item.item}
						</a>
					</li>
				{/each}
			</ul>
		</li>{/each}
</ul>

<style>
	.group {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(var(--size-14), 1fr));
		gap: var(--size-4);
	}

	ul {
		list-style: none;
		padding: 0;
	}

	li {
		padding: 0;
	}
</style>
