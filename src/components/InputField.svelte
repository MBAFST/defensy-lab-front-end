<script>
	export let value, label, type = 'text';
	
	function typeAction(node){
		node.type = type;
	}
</script>

<p class="form-control">
	{#if label}
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="label" for="">{label}:</label>
	{/if}
	<input use:typeAction class="input" bind:value={value}/>
</p>

<style>
	.form-control{
		margin: .5rem 0;
		text-align: left;
	}

</style>