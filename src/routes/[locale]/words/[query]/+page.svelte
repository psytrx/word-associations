<script lang="ts">
	export let data;
</script>

<a href="/">Zurück zur Startseite</a>

<h1>{data.query}</h1>

<ul>
	{#each Object.entries(data.groupedByPos) as [key, items]}
		<li>
			{key}
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
		</li>
	{/each}
</ul>
