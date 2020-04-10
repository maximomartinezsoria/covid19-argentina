<script>
	import { onMount } from 'svelte';
	import { total } from './store';
	import Data from './components/Data.svelte'
	import Chart from './components/Chart.svelte'
	import ProbabilityChart from './components/ProbabilityChart.svelte'
	import Help from './components/Help.svelte'
	import Heart from './components/icons/Heart.svelte'
</script>

<main>
	<header class="container py-12">
		<h1 class="text-center text-3xl font-semibold text-gray-800 md:text-4xl"><span class="text-primary">Coronavirus</span> en Argentina</h1>
	</header>

	{#if $total}
		<Data />
		<Chart />
		<ProbabilityChart/> 
		<Help />

		<footer class="bg-gray-900 py-3">
			<p class="flex items-center justify-center text-xs text-white">With <span class="inline-block w-8"><Heart/></span> from Argentina by <a href="https://www.linkedin.com/in/maximo-martinez-soria-553475170/" class="pl-1 underline">Maximo Martinez Soria</a></p>
		</footer>

	{:else}
		<div class="mt-64 flex items-center justify-center">
			<div class="loading"></div>
		</div>
	{/if}
</main>

<style lang="postcss">
  @import 'tailwindcss/base';
  @import 'tailwindcss/components';
  @import 'tailwindcss/utilities';

:global(.loading) {
	display: inline-block;
	width: 80px;
	height: 80px;
}

:global(.loading:after) {
	content: " ";
	display: block;
	width: 64px;
	height: 64px;
	margin: 8px;
	border-radius: 50%;
	border: 6px solid #3EBD93;
	border-color: #3EBD93 transparent #3EBD93 transparent;
	animation: spiner 1.2s linear infinite;
}

@keyframes -global-spiner {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>