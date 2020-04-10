<script>
    import Pin from './icons/Pin.svelte'
    import SecurityCheck from './icons/SecurityCheck.svelte'
</script>

<section class="help bg-gray-100 pt-16 pb-24 md:pt-24 md:pb-32">
    <div class="container">
        <h3 class="text-center text-2xl mb-6 md:mb-10 font-medium">Nos <span class="text-primary">Cuidamos</span> Entre Todos</h3>

        <div class="grid md:grid-cols-2 col-gap-4">
            <div class="flex flex-col items-center justify-center p-8 mt-4 bg-white border border-gray-300 rounded sm:mt-0">
                <div class="w-12"><SecurityCheck/></div>
                <p class="text-md text-center text-gray-700 mt-3">Lavate las manos</p>
            </div>

            <div class="flex flex-col items-center justify-center p-8 mt-4 bg-white border border-gray-300 rounded sm:mt-0">
                <div class="w-12"><Pin/></div>
                <p class="text-md text-center text-gray-700 mt-3">Quedate en casa</p>
            </div>
        </div>

        <p class="py-2 text-sm text-gray-600">
            Para más información, visitá la página del <a class="text-primary font-medium hover:underline" href="https://www.argentina.gob.ar/coronavirus/cuidarnos">Ministerio de Salud</a>
        </p>
    </div>
</section>