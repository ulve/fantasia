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

<h1>Welcome to SUPERFantasia</h1>
<div class="controls">
	<label>
		<input type="checkbox" bind:checked={inStock} />
		In stock?
	</label>
	<label for="search"> Search: </label>
	<input type="text" bind:value={search} id="search" />
	<p class="info">Showing {filteredProducts.length} of {products.length} products</p>
</div>
<div class="flexi">
	{#each filteredProducts as product}
		<div class="product">
			<img
				src={product.img.split('/').pop()}
				loading="lazy"
				alt={product.title}
				style="width:100%"
			/>
			<div class="container">
				<h4><b>{product.title}</b></h4>
				<p>
					<b>Price: </b>{product.price}:-<br />
					<b>Availabilty: </b>
					{product.availability}
					{#if product.number}
						({product.number} units)
					{/if}<br />
					<b>Tags: </b>{product.tags.join(', ')}<br />
					<a href={product.url}>Fantasia</a>
				</p>
			</div>
		</div>
	{/each}
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&family=Playfair+Display:ital@1&display=swap');
	.flexi {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		align-items: first-baseline;
	}
	h1 {
		font-family: 'Playfair Display', serif;
		font-weight: bold;
		text-align: center;
	}
	.controls {
		text-align: center;
	}

	h4 {
		font-family: 'Playfair Display', serif;
	}

	/* The card container */
	.product {
		box-shadow: 0 8px 12px 0 rgba(0, 0, 0, 0.4);
		transition: 0.3s;
		border-radius: 5px; /* 5px rounded corners */
		width: 30%;
		padding: 10px;
		font-family: 'Open Sans', sans-serif;
		line-height: 1.5;
		background-color: white;
		margin: 10px;
	}
	label {
		font-family: 'Open Sans', sans-serif;
	}
	.info {
		font-family: 'Open Sans', sans-serif;
	}
	/* On mouse-over, add a deeper shadow */
	.product:hover {
		box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
	}

	/* Add some padding inside the card container */
	.container {
		padding: 2px 16px;
	}
</style>
