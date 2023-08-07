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

	function getLogo(tags: string[]) {
		if (tags.includes('Grand Alliance Chaos')) {
			return 'chaos.png';
		} else if (tags.includes('Grand Alliance Order')) {
			return 'order.png';
		} else if (tags.includes('Grand Alliance Death')) {
			return 'death.png';
		} else if (tags.includes('Grand Alliance Destruction')) {
			return 'destruction.png';
		} else {
			return '';
		}
	}

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
<div class="flexi">
	{#each filteredProducts as product}
		<div class="product">
			<img class="grand-alliance" src={getLogo(product.tags)} alt={getLogo(product.tags)} />
			<img
				src={product.img === 'not found' ? 'no_image.png' : product.img.split('/').pop()}
				loading="lazy"
				class="product-img"
				alt={product.title}
				style="width:100%"
			/>
			<h4><b>{product.title}</b></h4>
			<div class="container">
				<p>
					<b>Price: </b>{product.price}:-<br />
					<b>Availabilty: </b>
					{product.availability}
					{#if product.number}
						({product.number} units)
					{/if}<br />
					<b>Tags: </b>{product.tags.join(', ')}<br />
				</p>
			</div>
			<div class="logo">
				<a href={product.url} target="_blank">
					<img src="logo.png" alt="Logo" width="100%" />
				</a>
			</div>
		</div>
	{/each}
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&family=Playfair+Display:ital@1&display=swap');

	.product-img {
		margin-top: 20px;
		width: 100%;
		height: 400px;
		object-fit: contain;
	}

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
		font-family: 'Open Sans', sans-serif;
		font-size: large;
		margin-bottom: 50px;
	}

	h4 {
		text-align: center;
		background-color: #033300;
		color: white;
		font-family: 'Playfair Display', serif;
		padding-top: 5px;
		padding-bottom: 5px;
	}

	.product {
		position: relative;

		box-shadow: 0 8px 12px 0 rgba(0, 0, 0, 0.4);
		transition: 0.3s;
		border-radius: 5px; /* 5px rounded corners */
		width: 80%;
		height: 700px;
		padding: 0px;
		margin: 10px;
		margin-bottom: 60px;
		font-family: 'Open Sans', sans-serif;
		line-height: 1.5;
		background-color: white;
	}

	.product:hover {
		box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.8);
	}

	@media only screen and (min-width: 600px) {
		/* The card container */
		.product {
			width: 45%;
		}
	}

	@media only screen and (min-width: 1024px) {
		/* The card container */
		.product {
			width: 30%;
		}
	}
	/* On mouse-over, add a deeper shadow */

	.grand-alliance {
		position: absolute;
		float: left;
		top: 0;
		left: 0;
		translate: -35px -35px;
		max-width: 100px;
		max-height: 150px;
		opacity: 0.5;
	}

	.product:hover .grand-alliance {
		transition: opacity 0.3s;
		opacity: 1;
	}

	.product .logo {
		transition: scale 0.3s;
		display: block;
		position: absolute;
		scale: 0.6;
		bottom: 0px;
		right: 0px;
		transform: translateY(75%) translateX(45%);
	}

	.product:hover .logo {
		scale: 0.7;
	}

	.container {
		padding: 2px 16px;
	}
</style>
