<script>
    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    import { base } from '$app/paths';

    const services = [
        {
            id: 'plumbing',
            title: 'Plumbing System Installations',
            shortTitle: 'Plumbing Systems',
            description: 'We design and install reliable plumbing systems for residential, commercial, and industrial buildings, ensuring optimal water distribution and waste management.',
            image: `${base}/images/plumbing.jpg`,
            category: 'Infrastructure',
            color: 'blue'
        },
        {
            id: 'heatingcooling',
            title: 'Heating and Cooling System Installations',
            shortTitle: 'Heating & Cooling',
            description: 'Our team provides efficient heating and cooling solutions tailored to your building\'s needs, using modern and energy-saving technologies.',
            image: `${base}/images/heating.png`,
            category: 'Climate Control',
            color: 'red'
        },
        {
            id: 'ventilation',
            title: 'Ventilation System Installations',
            shortTitle: 'Ventilation',
            description: 'We implement ventilation systems that ensure clean air circulation, maintaining indoor air quality and comfort in all environments.',
            image: `${base}/images/vintilation.png`,
            category: 'Air Quality',
            color: 'blue'
        },
        {
            id: 'fireextinguishing',
            title: 'Fire Extinguishing System Installations',
            shortTitle: 'Fire Extinguishing',
            description: 'We install certified fire suppression systems, including sprinklers and extinguishing networks, in compliance with safety regulations and standards.',
            image: `${base}/images/project4.jpeg`,
            category: 'Safety Systems',
            color: 'red'
        },
        {
            id: 'vrfac',
            title: 'VRF and Air Conditioning System Installations',
            shortTitle: 'VRF & AC Systems',
            description: 'Our VRF and air conditioning systems offer flexible, energy-efficient climate control for buildings of any size or complexity.',
            image: `${base}/images/vrfsystem.png`,
            category: 'Climate Control',
            color: 'blue'
        },
        {
            id: 'siphonic',
            title: 'Siphonic Rainwater Drainage System Installations',
            shortTitle: 'Rainwater Drainage',
            description: 'We design and install siphonic systems for rapid and efficient rainwater drainage from roofs, minimizing pipework and maximizing flow.',
            image: `${base}/images/rainwater.png`,
            category: 'Drainage',
            color: 'blue'
        },
        {
            id: 'passivefire',
            title: 'Passive Fire Protection System Installations',
            shortTitle: 'Passive Fire Protection',
            description: 'We apply passive fire stopping solutions to contain fire and smoke, ensuring the integrity of building compartments and compliance with fire codes.',
            image: `${base}/images/passiveFireProtectionSystem.png`,
            category: 'Safety Systems',
            color: 'red'
        },
        {
            id: 'electrical',
            title: 'Electrical System Installations',
            shortTitle: 'Electrical Systems',
            description: 'We provide comprehensive electrical installations, from lighting and power distribution to smart building integrations, all adhering to international safety standards.',
            image: `${base}/images/electricalInstallation.png`,
            category: 'Power Systems',
            color: 'red'
        }
    ];

    // Svelte 5 state
    let activeServiceId = $state('plumbing');
    let activeIndex = $state(0);
    let isAnimating = $state(false);

    // Derived state
    let activeService = $derived(services.find(s => s.id === activeServiceId) || services[0]);

    let autoSlideInterval;

    function setActiveService(service, index) {
        if (isAnimating || service.id === activeServiceId) return;

        isAnimating = true;
        setTimeout(() => {
            activeServiceId = service.id;
            activeIndex = index;
            isAnimating = false;
        }, 200);
    }

    onMount(() => {
        autoSlideInterval = setInterval(() => {
            const nextIndex = (activeIndex + 1) % services.length;
            setActiveService(services[nextIndex], nextIndex);
        }, 10000);

        return () => {
            clearInterval(autoSlideInterval);
        };
    });
</script>

<!-- Main Container -->
<section class="min-h-screen bg-gray-50 py-20">
    <div class="max-w-7xl mx-auto px-6">

        <!-- Header Section -->
        <div class="text-center mb-16">
            <div class="inline-block">
                <span class="text-blue-600 font-semibold tracking-wider uppercase text-sm mb-4 block">
                    Professional Solutions
                </span>
                <h2 class="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                    Our <span class="text-red-600">Services</span>
                </h2>
                <div class="w-24 h-1 bg-gradient-to-r from-blue-600 to-red-600 mx-auto mb-6"></div>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    Professional installations tailored to your needs with the highest industry standards
                </p>
            </div>

            <!-- Stats -->
            <div class="grid grid-cols-3 gap-8 mt-12 max-w-2xl mx-auto">
                <div class="text-center">
                    <div class="text-3xl font-bold text-red-600 mb-2">50+</div>
                    <div class="text-gray-600 font-medium">Completed Projects</div>
                </div>
                <div class="text-center">
                    <div class="text-3xl font-bold text-blue-600 mb-2">5+</div>
                    <div class="text-gray-600 font-medium">Years Experience</div>
                </div>
                <div class="text-center">
                    <div class="text-3xl font-bold text-red-600 mb-2">98%</div>
                    <div class="text-gray-600 font-medium">Success Rate</div>
                </div>
            </div>
        </div>

        <!-- Main Content Grid -->
        <div class="grid lg:grid-cols-12 gap-12">

            <!-- Services Navigation -->
            <div class="lg:col-span-4">
                <div class="bg-white rounded-2xl shadow-xl p-8 sticky top-8">
                    <h3 class="text-2xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-200">
                        Service Categories
                    </h3>

                    <div class="space-y-3">
                        {#each services as service, index}
                            <button
                                    class="group w-full text-left p-5 rounded-xl transition-all duration-300 border-2 {
                                    service.id === activeServiceId
                                        ? `${service.color === 'red' ? 'border-red-600 bg-red-50' : 'border-blue-600 bg-blue-50'} shadow-lg`
                                        : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                                }"
                                    on:click={() => setActiveService(service, index)}
                            >
                                <div class="flex items-center justify-between">
                                    <div class="flex-1">
                                        <div class="flex items-center gap-4 mb-2">
                                            <div class="w-12 h-12 rounded-xl flex items-center justify-center {
                                                service.id === activeServiceId
                                                    ? `${service.color === 'red' ? 'bg-red-600 text-white' : 'bg-blue-600 text-white'}`
                                                    : `${service.color === 'red' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'} group-hover:bg-gray-100`
                                            }">
                                                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h4 class="font-bold text-gray-900 text-lg">{service.shortTitle}</h4>
                                                <p class="text-sm font-medium {
                                                    service.id === activeServiceId
                                                        ? `${service.color === 'red' ? 'text-red-600' : 'text-blue-600'}`
                                                        : 'text-gray-500'
                                                }">{service.category}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Arrow indicator -->
                                    <div class="transition-transform duration-300 {
                                        service.id === activeServiceId ? 'rotate-90' : 'rotate-0'
                                    }">
                                        <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                            </button>
                        {/each}
                    </div>
                </div>
            </div>

            <!-- Service Details -->
            <div class="lg:col-span-8">
                <div class="bg-white rounded-2xl shadow-xl overflow-hidden">

                    <!-- Image Section -->
                    <div class="relative h-96 overflow-hidden">
                        {#key activeServiceId}
                            <div
                                    in:fade={{ duration: 600 }}
                                    class="absolute inset-0"
                            >
                                <img
                                        src={activeService.image}
                                        alt={activeService.title}
                                        class="w-full h-full object-cover"
                                />
                                <!-- Gradient Overlay -->
                                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                                <!-- Service Badge -->
                                <div class="absolute top-6 left-6">
                                    <span class="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold">
                                        {activeService.category}
                                    </span>
                                </div>
                            </div>
                        {/key}

                        <!-- Title Overlay -->
                        <div class="absolute bottom-0 left-0 right-0 p-8">
                            {#key activeServiceId}
                                <div
                                        in:fly={{ y: 30, duration: 600, delay: 300 }}
                                        class="text-white"
                                >
                                    <h3 class="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                                        {activeService.title}
                                    </h3>
                                    <div class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                                        <div class="w-2 h-2 rounded-full {
                                            activeService.color === 'red' ? 'bg-red-400' : 'bg-blue-400'
                                        }"></div>
                                        <span class="text-sm font-medium">Professional Installation</span>
                                    </div>
                                </div>
                            {/key}
                        </div>
                    </div>

                    <!-- Content Section -->
                    <div class="p-8">
                        {#key activeServiceId}
                            <div
                                    in:fly={{ y: 20, duration: 600 }}
                                    class="space-y-8"
                            >
                                <!-- Description with features -->
                                <div class="space-y-6">
                                    <p class="text-gray-700 text-lg leading-relaxed">
                                        {activeService.description}
                                    </p>

                                    <!-- Key Features -->
                                    <div class="grid md:grid-cols-2 gap-4">
                                        <div class="flex items-start gap-3">
                                            <div class="w-6 h-6 rounded-full {
                                                activeService.color === 'red' ? 'bg-red-100' : 'bg-blue-100'
                                            } flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <svg class="w-3 h-3 {
                                                    activeService.color === 'red' ? 'text-red-600' : 'text-blue-600'
                                                }" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h5 class="font-semibold text-gray-900 mb-1">Expert Installation</h5>
                                                <p class="text-sm text-gray-600">Professional certified technicians</p>
                                            </div>
                                        </div>

                                        <div class="flex items-start gap-3">
                                            <div class="w-6 h-6 rounded-full {
                                                activeService.color === 'red' ? 'bg-red-100' : 'bg-blue-100'
                                            } flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <svg class="w-3 h-3 {
                                                    activeService.color === 'red' ? 'text-red-600' : 'text-blue-600'
                                                }" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h5 class="font-semibold text-gray-900 mb-1">Quality Materials</h5>
                                                <p class="text-sm text-gray-600">Industry-leading components</p>
                                            </div>
                                        </div>

                                        <div class="flex items-start gap-3">
                                            <div class="w-6 h-6 rounded-full {
                                                activeService.color === 'red' ? 'bg-red-100' : 'bg-blue-100'
                                            } flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <svg class="w-3 h-3 {
                                                    activeService.color === 'red' ? 'text-red-600' : 'text-blue-600'
                                                }" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h5 class="font-semibold text-gray-900 mb-1">Full Warranty</h5>
                                                <p class="text-sm text-gray-600">Comprehensive coverage included</p>
                                            </div>
                                        </div>

                                        <div class="flex items-start gap-3">
                                            <div class="w-6 h-6 rounded-full {
                                                activeService.color === 'red' ? 'bg-red-100' : 'bg-blue-100'
                                            } flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <svg class="w-3 h-3 {
                                                    activeService.color === 'red' ? 'text-red-600' : 'text-blue-600'
                                                }" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h5 class="font-semibold text-gray-900 mb-1">Fast Delivery</h5>
                                                <p class="text-sm text-gray-600">On-time project completion</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Features Grid -->
                                <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    <div class="text-center p-4 bg-gray-50 rounded-xl">
                                        <div class="text-2xl font-bold {
                                            activeService.color === 'red' ? 'text-red-600' : 'text-blue-600'
                                        } mb-2">24/7</div>
                                        <div class="text-sm text-gray-600 font-medium">Support</div>
                                    </div>
                                    <div class="text-center p-4 bg-gray-50 rounded-xl">
                                        <div class="text-2xl font-bold {
                                            activeService.color === 'red' ? 'text-red-600' : 'text-blue-600'
                                        } mb-2">98%</div>
                                        <div class="text-sm text-gray-600 font-medium">Success Rate</div>
                                    </div>
                                    <div class="text-center p-4 bg-gray-50 rounded-xl">
                                        <div class="text-2xl font-bold {
                                            activeService.color === 'red' ? 'text-red-600' : 'text-blue-600'
                                        } mb-2">5★</div>
                                        <div class="text-sm text-gray-600 font-medium">Rating</div>
                                    </div>
                                    <div class="text-center p-4 bg-gray-50 rounded-xl">
                                        <div class="text-2xl font-bold {
                                            activeService.color === 'red' ? 'text-red-600' : 'text-blue-600'
                                        } mb-2">ISO</div>
                                        <div class="text-sm text-gray-600 font-medium">Certified</div>
                                    </div>
                                </div>

                                <!-- Bottom Actions -->
                                <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pt-6 border-t border-gray-200">
                                    <!-- Progress Indicators -->
                                    <div class="flex items-center gap-3">
                                        <span class="text-sm text-gray-500 font-medium">
                                            {activeIndex + 1} / {services.length}
                                        </span>
                                        <div class="flex gap-2">
                                            {#each services as _, idx}
                                                <button
                                                        class="w-3 h-3 rounded-full transition-all duration-300 {
                                                        idx === activeIndex
                                                            ? (activeService.color === 'red' ? 'bg-red-600 w-8' : 'bg-blue-600 w-8')
                                                            : 'bg-gray-300 hover:bg-gray-400'
                                                    }"
                                                        on:click={() => setActiveService(services[idx], idx)}
                                                ></button>
                                            {/each}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        {/key}
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<style>
    /* Smooth animations */
    * {
        transition: transform 0.3s ease, opacity 0.3s ease;
    }

    /* Enhanced shadows */
    .shadow-xl {
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
    }

    /* Glassmorphism effect */
    .backdrop-blur-sm {
        backdrop-filter: blur(4px);
    }

    /* Smooth hover effects */
    button:hover {
        transform: translateY(-1px);
    }

    /* Typography improvements */
    h2, h3, h4 {
        font-feature-settings: 'kern' 1, 'liga' 1;
        text-rendering: optimizeLegibility;
    }
</style>