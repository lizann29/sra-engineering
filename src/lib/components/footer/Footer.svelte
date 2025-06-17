<!-- src/lib/components/Footer.svelte -->
<script lang="ts">
    import { t } from '$lib/stores/translations.js';

    // Function to open Google Maps location
    function openGoogleMaps() {
        window.open('https://maps.google.com/?q=41.6863086,44.8272199', '_blank');
    }
</script>

<footer class="w-full">
    <div class="relative w-full h-auto md:h-64 bg-gradient-to-r from-slate-800 via-slate-900 to-blue-900 flex items-center overflow-hidden py-8 md:py-0">
        <!-- Map Background - Hidden on Mobile -->
        <div class="absolute right-0 top-0 w-full md:w-3/5 h-full hidden md:block">
            <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d953.5981930801715!2d44.8272199!3d41.6863086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440cfea78bc6a1%3A0xc68492dc13a1a5fb!2sOrtachala%20St%2C%20T'bilisi!5e0!3m2!1sen!2sge!4v1714542161623!5m2!1sen!2sge"
                    width="100%"
                    height="100%"
                    style="border:0;"
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                    class="w-full h-full object-cover"
            ></iframe>
            <div class="absolute inset-0 bg-slate-900 opacity-60"></div>
        </div>

        <div class="container mx-auto px-4 flex flex-col md:flex-row items-center relative z-10">
            <!-- Contact Information -->
            <div class="text-white mb-8 md:mb-0 text-center md:text-left">
                <h2 class="text-2xl font-bold mb-4 text-white uppercase tracking-wide">{$t('contacts', 'Contacts')}</h2>
                <div class="mb-2">
                    <p class="text-sm mb-2 text-gray-300 uppercase tracking-wider">{$t('support', 'Support')}:</p>
                    <div class="flex items-center justify-center md:justify-start mb-4">
                        <p class="font-bold text-lg">
                            <a href="tel:+905333654128" class="hover:text-red-400 transition-colors duration-200">+90 533 365 41 28</a>
                        </p>
                    </div>

                    <!-- Social Icons -->
                    <div class="flex mt-4 justify-center md:justify-start space-x-3">
                        <!-- Viber Icon -->
                        <div class="w-10 h-10 bg-purple-600 hover:bg-purple-700 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl">
							<span class="flex items-center justify-center">
								<svg xmlns="http://www.w3.org/2000/svg" fill="white" height="18px" width="18px" viewBox="0 0 52.511 52.511">
									<g>
										<path d="M31.256,0H21.254C10.778,0,2.255,8.521,2.255,18.995v9.01c0,7.8,4.793,14.81,12,17.665v5.841 c0,0.396,0.233,0.754,0.595,0.914c0.13,0.058,0.268,0.086,0.405,0.086c0.243,0,0.484-0.089,0.671-0.259L21.725,47h9.531 c10.476,0,18.999-8.521,18.999-18.995v-9.01C50.255,8.521,41.732,0,31.256,0z M48.255,28.005C48.255,37.376,40.63,45,31.256,45 h-9.917c-0.248,0-0.487,0.092-0.671,0.259l-4.413,3.997v-4.279c0-0.424-0.267-0.802-0.667-0.942 C8.81,41.638,4.255,35.196,4.255,28.005v-9.01C4.255,9.624,11.881,2,21.254,2h10.002c9.374,0,16.999,7.624,16.999,16.995V28.005z"/>
										<path d="M39.471,30.493l-6.146-3.992c-0.672-0.437-1.472-0.585-2.255-0.423c-0.784,0.165-1.458,0.628-1.895,1.303l-0.289,0.444 c-2.66-0.879-5.593-2.002-7.349-7.085l0.727-0.632h0c1.248-1.085,1.379-2.983,0.294-4.233l-4.808-5.531 c-0.362-0.417-0.994-0.46-1.411-0.099l-3.019,2.624c-2.648,2.302-1.411,5.707-1.004,6.826c0.018,0.05,0.04,0.098,0.066,0.145 c0.105,0.188,2.612,4.662,6.661,8.786c4.065,4.141,11.404,7.965,11.629,8.076c0.838,0.544,1.781,0.805,2.714,0.805 c1.638,0,3.244-0.803,4.202-2.275l2.178-3.354C40.066,31.413,39.934,30.794,39.471,30.493z M35.91,34.142 c-0.901,1.388-2.763,1.782-4.233,0.834c-0.073-0.038-7.364-3.835-11.207-7.75c-3.592-3.659-5.977-7.724-6.302-8.291 c-0.792-2.221-0.652-3.586,0.464-4.556l2.265-1.968l4.152,4.776c0.369,0.424,0.326,1.044-0.096,1.411l-1.227,1.066 c-0.299,0.26-0.417,0.671-0.3,1.049c2.092,6.798,6.16,8.133,9.13,9.108l0.433,0.143c0.433,0.146,0.907-0.021,1.155-0.403 l0.709-1.092c0.146-0.226,0.37-0.379,0.63-0.434c0.261-0.056,0.527-0.004,0.753,0.143l5.308,3.447L35.91,34.142z"/>
										<path d="M28.538,16.247c-0.532-0.153-1.085,0.156-1.236,0.688c-0.151,0.531,0.157,1.084,0.688,1.235 c1.49,0.424,2.677,1.613,3.097,3.104c0.124,0.44,0.525,0.729,0.962,0.729c0.09,0,0.181-0.012,0.272-0.037 c0.531-0.15,0.841-0.702,0.691-1.234C32.405,18.578,30.69,16.859,28.538,16.247z"/>
										<path d="M36.148,22.219c0.09,0,0.181-0.012,0.272-0.037c0.532-0.15,0.841-0.703,0.691-1.234c-1.18-4.183-4.509-7.519-8.689-8.709 c-0.531-0.153-1.084,0.158-1.235,0.689c-0.151,0.531,0.157,1.084,0.688,1.235c3.517,1,6.318,3.809,7.311,7.328 C35.311,21.931,35.711,22.219,36.148,22.219z"/>
										<path d="M27.991,7.582c-0.532-0.153-1.085,0.156-1.236,0.689c-0.151,0.531,0.157,1.084,0.688,1.235 c5.959,1.695,10.706,6.453,12.388,12.416c0.124,0.44,0.525,0.729,0.962,0.729c0.09,0,0.181-0.012,0.272-0.037 c0.531-0.15,0.841-0.703,0.691-1.234C39.887,14.753,34.613,9.467,27.991,7.582z"/>
									</g>
								</svg>
							</span>
                        </div>
                        <!-- WhatsApp Icon -->
                        <div class="w-10 h-10 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl">
							<span class="flex items-center justify-center">
								<svg xmlns="http://www.w3.org/2000/svg" fill="white" height="18px" width="18px" viewBox="0 0 52.511 52.511">
									<g>
										<path d="M31.256,0H21.254C10.778,0,2.255,8.521,2.255,18.995v9.01c0,7.8,4.793,14.81,12,17.665v5.841 c0,0.396,0.233,0.754,0.595,0.914c0.13,0.058,0.268,0.086,0.405,0.086c0.243,0,0.484-0.089,0.671-0.259L21.725,47h9.531 c10.476,0,18.999-8.521,18.999-18.995v-9.01C50.255,8.521,41.732,0,31.256,0z M48.255,28.005C48.255,37.376,40.63,45,31.256,45 h-9.917c-0.248,0-0.487,0.092-0.671,0.259l-4.413,3.997v-4.279c0-0.424-0.267-0.802-0.667-0.942 C8.81,41.638,4.255,35.196,4.255,28.005v-9.01C4.255,9.624,11.881,2,21.254,2h10.002c9.374,0,16.999,7.624,16.999,16.995V28.005z"/>
										<path d="M39.471,30.493l-6.146-3.992c-0.672-0.437-1.472-0.585-2.255-0.423c-0.784,0.165-1.458,0.628-1.895,1.303l-0.289,0.444 c-2.66-0.879-5.593-2.002-7.349-7.085l0.727-0.632h0c1.248-1.085,1.379-2.983,0.294-4.233l-4.808-5.531 c-0.362-0.417-0.994-0.46-1.411-0.099l-3.019,2.624c-2.648,2.302-1.411,5.707-1.004,6.826c0.018,0.05,0.04,0.098,0.066,0.145 c0.105,0.188,2.612,4.662,6.661,8.786c4.065,4.141,11.404,7.965,11.629,8.076c0.838,0.544,1.781,0.805,2.714,0.805 c1.638,0,3.244-0.803,4.202-2.275l2.178-3.354C40.066,31.413,39.934,30.794,39.471,30.493z M35.91,34.142 c-0.901,1.388-2.763,1.782-4.233,0.834c-0.073-0.038-7.364-3.835-11.207-7.75c-3.592-3.659-5.977-7.724-6.302-8.291 c-0.792-2.221-0.652-3.586,0.464-4.556l2.265-1.968l4.152,4.776c0.369,0.424,0.326,1.044-0.096,1.411l-1.227,1.066 c-0.299,0.26-0.417,0.671-0.3,1.049c2.092,6.798,6.16,8.133,9.13,9.108l0.433,0.143c0.433,0.146,0.907-0.021,1.155-0.403 l0.709-1.092c0.146-0.226,0.37-0.379,0.63-0.434c0.261-0.056,0.527-0.004,0.753,0.143l5.308,3.447L35.91,34.142z"/>
										<path d="M28.538,16.247c-0.532-0.153-1.085,0.156-1.236,0.688c-0.151,0.531,0.157,1.084,0.688,1.235 c1.49,0.424,2.677,1.613,3.097,3.104c0.124,0.44,0.525,0.729,0.962,0.729c0.09,0,0.181-0.012,0.272-0.037 c0.531-0.15,0.841-0.702,0.691-1.234C32.405,18.578,30.69,16.859,28.538,16.247z"/>
										<path d="M36.148,22.219c0.09,0,0.181-0.012,0.272-0.037c0.532-0.15,0.841-0.703,0.691-1.234c-1.18-4.183-4.509-7.519-8.689-8.709 c-0.531-0.153-1.084,0.158-1.235,0.689c-0.151,0.531,0.157,1.084,0.688,1.235c3.517,1,6.318,3.809,7.311,7.328 C35.311,21.931,35.711,22.219,36.148,22.219z"/>
										<path d="M27.991,7.582c-0.532-0.153-1.085,0.156-1.236,0.689c-0.151,0.531,0.157,1.084,0.688,1.235 c5.959,1.695,10.706,6.453,12.388,12.416c0.124,0.44,0.525,0.729,0.962,0.729c0.09,0,0.181-0.012,0.272-0.037 c0.531-0.15,0.841-0.703,0.691-1.234C39.887,14.753,34.613,9.467,27.991,7.582z"/>
									</g>
								</svg>
							</span>
                        </div>
                    </div>

                    <div class="mt-4">
                        <p class="text-sm text-gray-300 uppercase tracking-wider mb-1">{$t('email', 'Email')}:</p>
                        <p class="font-bold text-lg">
                            <a href="mailto:info@sra.ge" class="hover:text-red-400 transition-colors duration-200">info@sra.ge</a>
                        </p>
                    </div>
                </div>
            </div>

            <!-- Vertical Divider - Visible only on desktop -->
            <div class="hidden md:block h-32 w-px bg-red-500 mx-8"></div>

            <!-- Right Content - Address -->
            <div class="text-white text-center md:text-left mb-8 md:mb-0">
                <p class="text-sm mb-2 text-gray-300 uppercase tracking-wider">{$t('address', 'Address')}</p>
                <div
                        class="cursor-pointer hover:text-red-400 transition-colors duration-200"
                        on:click={openGoogleMaps}
                >
                    <p class="font-bold text-lg">{$t('street_address', 'Krtsanisi Ortachala street')}</p>
                    <p class="font-bold text-lg">{$t('city', 'Tbilisi')}</p>
                </div>
            </div>

            <!-- Logo on Map - Visible only on desktop -->
            <div class="absolute cursor-pointer right-12 top-1/2 transform -translate-y-1/2 hidden lg:block">
                <div class="bg-white bg-opacity-95 p-4 rounded-lg shadow-xl border border-gray-200 relative hover:bg-opacity-100 transition-all duration-200">
                    <div class="w-20 h-20 flex items-center justify-center">
                        <div class="text-xl text-slate-800 font-bold">
                            <span class="block text-center font-black tracking-wide">SRA</span>
                            <span class="block text-xs text-center font-semibold tracking-widest">{$t('engineering', 'ENGINEERING')}</span>
                        </div>
                    </div>
                    <!-- Pointer Triangle -->
                    <div class="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-t-white border-l-transparent border-r-transparent"></div>
                </div>
            </div>
        </div>
    </div>

    <!-- Bottom Bar -->
    <div class="w-full bg-slate-900 py-4 border-t border-slate-700">
        <div class="container mx-auto px-4">
            <div class="text-white text-sm flex flex-col md:flex-row items-center justify-center md:justify-start">
                <span class="font-bold mr-2 uppercase tracking-wide">{$t('company_name', 'SRA ENGINEERING')}</span>
                <span class="text-gray-300">{$t('copyright_text', 'International Company. © ყველა უფლება დაცულია.')}</span>
            </div>
        </div>
    </div>
</footer>