<script>
    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    import { base } from '$app/paths';
    import { t } from '$lib/stores/translations.js';

    // Create derived translations for services
    const serviceTranslations = $derived({
        // Service titles
        plumbing_title: $t('plumbing_system_installations', 'Plumbing System Installations'),
        plumbing_short: $t('plumbing_systems', 'Plumbing Systems'),
        plumbing_desc: $t('plumbing_description', 'We design and install reliable plumbing systems for residential, commercial, and industrial buildings, ensuring optimal water distribution and waste management.'),

        heating_title: $t('heating_cooling_installations', 'Heating and Cooling System Installations'),
        heating_short: $t('heating_cooling', 'Heating & Cooling'),
        heating_desc: $t('heating_description', 'Our team provides efficient heating and cooling solutions tailored to your building\'s needs, using modern and energy-saving technologies.'),

        ventilation_title: $t('ventilation_installations', 'Ventilation System Installations'),
        ventilation_short: $t('ventilation', 'Ventilation'),
        ventilation_desc: $t('ventilation_description', 'We implement ventilation systems that ensure clean air circulation, maintaining indoor air quality and comfort in all environments.'),

        fire_title: $t('fire_extinguishing_installations', 'Fire Extinguishing System Installations'),
        fire_short: $t('fire_extinguishing', 'Fire Extinguishing'),
        fire_desc: $t('fire_description', 'We install certified fire suppression systems, including sprinklers and extinguishing networks, in compliance with safety regulations and standards.'),

        vrf_title: $t('vrf_ac_installations', 'VRF and Air Conditioning System Installations'),
        vrf_short: $t('vrf_ac_systems', 'VRF & AC Systems'),
        vrf_desc: $t('vrf_description', 'Our VRF and air conditioning systems offer flexible, energy-efficient climate control for buildings of any size or complexity.'),

        siphonic_title: $t('siphonic_drainage_installations', 'Siphonic Rainwater Drainage System Installations'),
        siphonic_short: $t('rainwater_drainage', 'Rainwater Drainage'),
        siphonic_desc: $t('siphonic_description', 'We design and install siphonic systems for rapid and efficient rainwater drainage from roofs, minimizing pipework and maximizing flow.'),

        passive_title: $t('passive_fire_installations', 'Passive Fire Protection System Installations'),
        passive_short: $t('passive_fire_protection', 'Passive Fire Protection'),
        passive_desc: $t('passive_description', 'We apply passive fire stopping solutions to contain fire and smoke, ensuring the integrity of building compartments and compliance with fire codes.'),

        electrical_title: $t('electrical_installations', 'Electrical System Installations'),
        electrical_short: $t('electrical_systems', 'Electrical Systems'),
        electrical_desc: $t('electrical_description', 'We provide comprehensive electrical installations, from lighting and power distribution to smart building integrations, all adhering to international safety standards.'),

        // Categories
        infrastructure: $t('infrastructure', 'Infrastructure'),
        climate_control: $t('climate_control', 'Climate Control'),
        air_quality: $t('air_quality', 'Air Quality'),
        safety_systems: $t('safety_systems', 'Safety Systems'),
        drainage: $t('drainage', 'Drainage'),
        power_systems: $t('power_systems', 'Power Systems'),
    });

    const services = $derived([
        {
            id: 'plumbing',
            title: serviceTranslations.plumbing_title,
            shortTitle: serviceTranslations.plumbing_short,
            description: serviceTranslations.plumbing_desc,
            image: `${base}/images/pumbingnew.jpeg`,
            category: serviceTranslations.infrastructure,
            color: 'charcoal'
        },
        {
            id: 'heatingcooling',
            title: serviceTranslations.heating_title,
            shortTitle: serviceTranslations.heating_short,
            description: serviceTranslations.heating_desc,
            image: `${base}/images/heating.png`,
            category: serviceTranslations.climate_control,
            color: 'steel'
        },
        {
            id: 'ventilation',
            title: serviceTranslations.ventilation_title,
            shortTitle: serviceTranslations.ventilation_short,
            description: serviceTranslations.ventilation_desc,
            image: `${base}/images/vintilation.png`,
            category: serviceTranslations.air_quality,
            color: 'charcoal'
        },
        {
            id: 'fireextinguishing',
            title: serviceTranslations.fire_title,
            shortTitle: serviceTranslations.fire_short,
            description: serviceTranslations.fire_desc,
            image: `${base}/images/project4.jpeg`,
            category: serviceTranslations.safety_systems,
            color: 'steel'
        },
        {
            id: 'vrfac',
            title: serviceTranslations.vrf_title,
            shortTitle: serviceTranslations.vrf_short,
            description: serviceTranslations.vrf_desc,
            image: `${base}/images/vrfsystem.png`,
            category: serviceTranslations.climate_control,
            color: 'charcoal'
        },
        {
            id: 'siphonic',
            title: serviceTranslations.siphonic_title,
            shortTitle: serviceTranslations.siphonic_short,
            description: serviceTranslations.siphonic_desc,
            image: `${base}/images/rainwater.png`,
            category: serviceTranslations.drainage,
            color: 'charcoal'
        },
        {
            id: 'passivefire',
            title: serviceTranslations.passive_title,
            shortTitle: serviceTranslations.passive_short,
            description: serviceTranslations.passive_desc,
            image: `${base}/images/passiveFireProtectionSystem.png`,
            category: serviceTranslations.safety_systems,
            color: 'steel'
        },
        {
            id: 'electrical',
            title: serviceTranslations.electrical_title,
            shortTitle: serviceTranslations.electrical_short,
            description: serviceTranslations.electrical_desc,
            image: `${base}/images/electricalInstallation.png`,
            category: serviceTranslations.power_systems,
            color: 'steel'
        }
    ]);

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
                <span class="text-zinc-700 font-semibold tracking-wider uppercase text-sm mb-4 block">
                    {$t('professional_solutions', 'Professional Solutions')}
                </span>
                <h2 class="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                    {$t('our_services', 'Our Services')}
                </h2>
                <div class="w-24 h-1 bg-gradient-to-r from-zinc-700 to-gray-800 mx-auto mb-6"></div>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    {$t('professional_installations_description', 'Professional installations tailored to your needs with the highest industry standards')}
                </p>
            </div>

            <!-- Stats -->
            <div class="grid grid-cols-3 gap-8 mt-12 max-w-2xl mx-auto">
                <div class="text-center">
                    <div class="text-3xl font-bold text-gray-800 mb-2">50+</div>
                    <div class="text-gray-600 font-medium">{$t('completed_projects', 'Completed Projects')}</div>
                </div>
                <div class="text-center">
                    <div class="text-3xl font-bold text-zinc-700 mb-2">5+</div>
                    <div class="text-gray-600 font-medium">{$t('years_experience', 'Years Experience')}</div>
                </div>
                <div class="text-center">
                    <div class="text-3xl font-bold text-gray-800 mb-2">98%</div>
                    <div class="text-gray-600 font-medium">{$t('success_rate', 'Success Rate')}</div>
                </div>
            </div>
        </div>

        <!-- Main Content Grid -->
        <div class="grid lg:grid-cols-12 gap-12">

            <!-- Services Navigation -->
            <div class="lg:col-span-4">
                <div class="bg-white rounded-2xl shadow-xl p-8 sticky top-8">
                    <h3 class="text-2xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-200">
                        {$t('service_categories', 'Service Categories')}
                    </h3>

                    <div class="space-y-3">
                        {#each services as service, index}
                            <button
                                    class="group w-full text-left p-5 rounded-xl transition-all duration-300 border-2 {
                                    service.id === activeServiceId
                                        ? `${service.color === 'steel' ? 'border-zinc-700 bg-zinc-50' : 'border-gray-800 bg-gray-50'} shadow-lg`
                                        : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                                }"
                                    on:click={() => setActiveService(service, index)}
                            >
                                <div class="flex items-center justify-between">
                                    <div class="flex-1">
                                        <div class="flex items-center gap-4 mb-2">
                                            <div class="w-12 h-12 rounded-xl flex items-center justify-center {
                                                service.id === activeServiceId
                                                    ? `${service.color === 'steel' ? 'bg-zinc-700 text-white' : 'bg-gray-800 text-white'}`
                                                    : `${service.color === 'steel' ? 'bg-zinc-100 text-zinc-700' : 'bg-gray-100 text-gray-800'} group-hover:bg-gray-100`
                                            }">
                                                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h4 class="font-bold text-gray-900 text-lg">{service.shortTitle}</h4>
                                                <p class="text-sm font-medium {
                                                    service.id === activeServiceId
                                                        ? `${service.color === 'steel' ? 'text-zinc-700' : 'text-gray-800'}`
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
                                            activeService.color === 'steel' ? 'bg-zinc-400' : 'bg-gray-400'
                                        }"></div>
                                        <span class="text-sm font-medium">{$t('professional_installation', 'Professional Installation')}</span>
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
                                                activeService.color === 'steel' ? 'bg-zinc-100' : 'bg-gray-100'
                                            } flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <svg class="w-3 h-3 {
                                                    activeService.color === 'steel' ? 'text-zinc-700' : 'text-gray-800'
                                                }" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h5 class="font-semibold text-gray-900 mb-1">{$t('expert_installation', 'Expert Installation')}</h5>
                                                <p class="text-sm text-gray-600">{$t('professional_certified_technicians', 'Professional certified technicians')}</p>
                                            </div>
                                        </div>

                                        <div class="flex items-start gap-3">
                                            <div class="w-6 h-6 rounded-full {
                                                activeService.color === 'steel' ? 'bg-zinc-100' : 'bg-gray-100'
                                            } flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <svg class="w-3 h-3 {
                                                    activeService.color === 'steel' ? 'text-zinc-700' : 'text-gray-800'
                                                }" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h5 class="font-semibold text-gray-900 mb-1">{$t('quality_materials', 'Quality Materials')}</h5>
                                                <p class="text-sm text-gray-600">{$t('industry_leading_components', 'Industry-leading components')}</p>
                                            </div>
                                        </div>

                                        <div class="flex items-start gap-3">
                                            <div class="w-6 h-6 rounded-full {
                                                activeService.color === 'steel' ? 'bg-zinc-100' : 'bg-gray-100'
                                            } flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <svg class="w-3 h-3 {
                                                    activeService.color === 'steel' ? 'text-zinc-700' : 'text-gray-800'
                                                }" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h5 class="font-semibold text-gray-900 mb-1">{$t('full_warranty', 'Full Warranty')}</h5>
                                                <p class="text-sm text-gray-600">{$t('comprehensive_coverage_included', 'Comprehensive coverage included')}</p>
                                            </div>
                                        </div>

                                        <div class="flex items-start gap-3">
                                            <div class="w-6 h-6 rounded-full {
                                                activeService.color === 'steel' ? 'bg-zinc-100' : 'bg-gray-100'
                                            } flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <svg class="w-3 h-3 {
                                                    activeService.color === 'steel' ? 'text-zinc-700' : 'text-gray-800'
                                                }" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h5 class="font-semibold text-gray-900 mb-1">{$t('fast_delivery', 'Fast Delivery')}</h5>
                                                <p class="text-sm text-gray-600">{$t('ontime_project_completion', 'On-time project completion')}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Features Grid -->
                                <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    <div class="text-center p-4 bg-gray-50 rounded-xl">
                                        <div class="text-2xl font-bold {
                                            activeService.color === 'steel' ? 'text-zinc-700' : 'text-gray-800'
                                        } mb-2">24/7</div>
                                        <div class="text-sm text-gray-600 font-medium">{$t('support', 'Support')}</div>
                                    </div>
                                    <div class="text-center p-4 bg-gray-50 rounded-xl">
                                        <div class="text-2xl font-bold {
                                            activeService.color === 'steel' ? 'text-zinc-700' : 'text-gray-800'
                                        } mb-2">98%</div>
                                        <div class="text-sm text-gray-600 font-medium">{$t('success_rate', 'Success Rate')}</div>
                                    </div>
                                    <div class="text-center p-4 bg-gray-50 rounded-xl">
                                        <div class="text-2xl font-bold {
                                            activeService.color === 'steel' ? 'text-zinc-700' : 'text-gray-800'
                                        } mb-2">5★</div>
                                        <div class="text-sm text-gray-600 font-medium">{$t('rating', 'Rating')}</div>
                                    </div>
                                    <div class="text-center p-4 bg-gray-50 rounded-xl">
                                        <div class="text-2xl font-bold {
                                            activeService.color === 'steel' ? 'text-zinc-700' : 'text-gray-800'
                                        } mb-2">ISO</div>
                                        <div class="text-sm text-gray-600 font-medium">{$t('certified', 'Certified')}</div>
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
                                                            ? (activeService.color === 'steel' ? 'bg-zinc-700 w-8' : 'bg-gray-800 w-8')
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