<script lang="ts">
	import products from '$lib/products.json';

	$: filteredProducts = products.filter((product) => {
		if (inStock) {
			return (
				product.tags.join(', ').toLowerCase().indexOf(search.toLowerCase()) > -1 &&
				product.availability !== 'Temporarily out of stock'
			);
		} else {
			return product.tags.join(', ').toLowerCase().indexOf(search.toLowerCase()) > -1;
		}
	});

	let inStock = false;
	let search = '';
</script>

<h1>Welcome to MINIMALIST Fantasia</h1>
<div class="controls">
	<label for="search"> Search: </label>
	<input type="text" bind:value={search} id="search" />
	<label>
		<input type="checkbox" bind:checked={inStock} />
		In stock?
	</label>
	🧐 Showing {filteredProducts.length} of {products.length} products
</div>
<ul class="item-list">
	{#each filteredProducts as product}
		<li>
			<div class="item">
				<h4>{product.title}</h4>
				<b>Price: </b>{product.price}:-
				<b>Availabilty: </b>
				{product.availability}
				{#if product.number}
					({product.number} Units in stock)
				{/if}
				<br />
				<a href={product.url} target="_blank">Link to Fantasia</a>
			</div>
		</li>
	{/each}
</ul>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&family=Playfair+Display:ital@1&display=swap');
	h1 {
		font-family: 'Playfair Display', serif;
		font-weight: bold;
		text-align: center;
	}

	.item-list {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	h4 {
		text-align: center;
		background-color: #033300;
		color: white;
		font-family: 'Playfair Display', serif;
		width: 20rem;
	}
	.controls {
		text-align: center;
		font-family: 'Open Sans', sans-serif;
		font-size: large;
		margin-bottom: 50px;
	}

	li {
		list-style-type: none;
		margin-bottom: 15px;
	}
	.item {
		font-family: 'Open Sans', sans-serif;
		line-height: 1.5;
		text-align: center;
	}
</style>
