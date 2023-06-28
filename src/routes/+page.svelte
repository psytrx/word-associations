<form action="/de/words" method="post">
	<label for="query">Suchbegriff eingeben:</label>
	<input type="text" id="query" name="query" value="Hund" />
	<button>Suchen</button>
</form>

<style>
	form {
		min-height: 100vh;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: var(--size-2);
	}

	input {
		border: var(--border-size-2) solid var(--surface-4);
		background-color: var(--surface-2);
		width: min(100%, 25rem);
		padding: var(--size-2) var(--size-4);
		font-size: var(--font-size-4);
	}

	button {
		font-size: var(--font-size-3);
		padding: var(--size-2) var(--size-4);
		border-radius: var(--radius-2);
	}
</style>
