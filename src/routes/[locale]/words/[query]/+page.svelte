<script lang="ts">
	export let data;
</script>

<h1>{data.query}</h1>

<ul>
	{#each Object.entries(data.groupedByPos) as [key, items]}
		<li>
			{key}
			<ul>
				{#each items as item}
					<li>
						<a href="/{data.locale}/words/{item.item}">
							{item.item}
						</a>
					</li>
				{/each}
			</ul>
		</li>
	{/each}
</ul>
