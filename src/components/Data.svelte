<script>
import { total } from '../store';
import { onMount } from 'svelte';

const colors = ['green', 'red', 'orange'];

</script>

<section class="data pb-12 md:pb-24">
    <div class="container">
        {#if $total }
            <div class="grid md:grid-cols-3 col-gap-4">
                {#each Object.entries($total) as [label, number]}
                    <div class="flex flex-col justify-center px-4 py-4 mt-4 bg-white border border-gray-300 rounded sm:mt-0">
                        <!-- <div>
                            <p class="flex items-center justify-end text-red-500 text-md">
                                <span class="font-bold">6%</span>
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path class="heroicon-ui" d="M20 9a1 1 0 012 0v8a1 1 0 01-1 1h-8a1 1 0 010-2h5.59L13 10.41l-3.3 3.3a1 1 0 01-1.4 0l-6-6a1 1 0 011.4-1.42L9 11.6l3.3-3.3a1 1 0 011.4 0l6.3 6.3V9z"/></svg>
                            </p>
                        </div> -->
                        <p class="text-3xl font-semibold text-center text-gray-800">{number}</p>
                        <p class="text-lg text-center text-gray-500">{label.charAt(0).toUpperCase()}{label.slice(1)}</p>
                    </div>
                {/each}
            </div>
        {/if}
    </div>
</section>
