<div class="container bg-white dark:bg-grey-800">
	<div class="text-container">
		<div class="title-container">
			<h1 class="title">
				<span class="title-text">Hi, I&apos;m Antonio</span>
				<span class="title-emoji">👋</span>
			</h1>
		</div>
	</div>
</div>

<style>
	.container {
		height: 80vh;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
	}
	.text-container {
		flex: 2;
		min-width: 600px;
		padding: 0 5%;
	}
	.title-container {
		display: flex;
		flex-direction: row;
	}
	.title {
		display: flex;
	}
	.title-text {
		font-family: 'Cormorant Garamond', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
			Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		color: #fff;
		background: linear-gradient(271deg, #8797e8 30%, #a162e8 50%, #f093b0 70%, #dab56c 94%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		font-weight: 500;
		margin: 0;
		line-height: 1.15;
		font-size: 6rem;
		/* padding-left: 10%; */
	}
	.title-emoji {
		font-size: 5rem;
		margin-left: 30px;
	}
	@media (max-width: 1000px) {
		.container {
			height: auto;
		}
	}
	@media (max-width: 800px) {
		.title-text {
			font-size: 4rem;
		}
		.title-emoji {
			font-size: 3rem;
			margin-left: 10px;
		}
	}
	@media (max-width: 600px) {
		.text-container {
			min-width: unset;
		}
	}
	@media (max-width: 550px) {
		.title-container {
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.title {
			flex-direction: column;
			align-items: center;
		}
		.title-emoji {
			align-self: center;
		}
	}
</style>
