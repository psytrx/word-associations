<script lang="ts">
	export let data;
</script>

<h1>{data.query}</h1>

<ul>
	{#each data.associations.response as response}
		<li>
			{response.text}
			<ul>
				{#each response.items as item}
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

<pre><code>{JSON.stringify(data.associations, null, 2)}</code></pre>
