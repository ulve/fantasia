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

<table>
	<thead>
		<th>Product</th>
		<th>Price</th>
		<th>Availability</th>
		<th>Units</th>
		<th>Link</th>
	</thead>
	<tbody>
		{#each filteredProducts as product}
			<tr>
				<td scope="grid">{product.title}</td>
				<td>{product.price}</td>
				<td>{product.availability}</td>
				{#if product.number}
					<td>{product.number}</td>
				{:else}
					<td>0</td>
				{/if}
				<td><a href={product.url} target="_blank">Fantasia</a> </td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&family=Playfair+Display:ital@1&display=swap');
	h1 {
		font-family: 'Playfair Display', serif;
		font-weight: bold;
		text-align: center;
	}

	.controls {
		text-align: center;
		font-family: 'Open Sans', sans-serif;
		font-size: large;
		margin-bottom: 50px;
	}

	table {
		border-spacing: 1;
		border-collapse: collapse;
		background: white;
		border-radius: 6px;
		overflow: hidden;
		max-width: 800px;
		width: 100%;
		margin: 0 auto;
		position: relative;
		font-family: 'Open Sans', sans-serif;
	}

	td,
	th {
		padding-left: 8px;
	}
	thead th {
		height: 60px;
		background-color: #033300;
		color: white;
		font-size: 16px;
		font-family: 'Playfair Display', serif;
	}

	tr:nth-child(even) {
		background-color: rgba(29, 138, 29, 0.1);
	}
	tr:nth-child(odd) {
		background: #fff;
	}

	tbody tr {
		height: 48px;
		border-bottom: 1px solid #e3f1d5;
		&:last-child {
			border: 0;
		}
	}
</style>
