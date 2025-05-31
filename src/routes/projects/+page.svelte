<script lang="ts">
    import { base } from '$app/paths';
</script>

<div  style="width: 100%"  class="min-h-screen bg-gradient-to-br from-gray-900 via-white-800 to-white-900 flex items-center justify-center p-8">
    <div class="max-w-2xl mx-auto text-center">
        <!-- Animated construction icon -->
        <div class="mb-8">
            <div class="relative mx-auto w-32 h-32">
                <div class="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full opacity-20 animate-ping"></div>
                <div class="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-8 flex items-center justify-center">
                    <svg class="w-16 h-16 text-orange-400 animate-bounce" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"/>
                        <path d="M19 15L20.09 17.26L24 18L20.09 18.74L19 21L17.91 18.74L14 18L17.91 17.26L19 15Z"/>
                        <path d="M5 6L6.09 8.26L10 9L6.09 9.74L5 12L3.91 9.74L0 9L3.91 8.26L5 6Z"/>
                    </svg>
                </div>
            </div>
        </div>

        <!-- Main heading -->
        <h1 class="text-5xl md:text-7xl font-black text-white mb-6 tracking-wide">
            PROJECTS
        </h1>

        <!-- Subtitle with company colors -->
        <div class="flex items-center justify-center space-x-6 mb-8">
            <div class="h-1 w-20 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"></div>
            <h2 class="text-xl md:text-2xl font-bold text-white/80 tracking-widest uppercase">
                Coming Soon
            </h2>
            <div class="h-1 w-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
        </div>

        <!-- Main message -->
        <div class="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 mb-8">
            <div class="mb-6">
                <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z"/>
                    </svg>
                </div>
                <h3 class="text-2xl font-bold text-white mb-4">Page Under Construction</h3>
                <p class="text-white/80 text-lg leading-relaxed">
                    We're currently working on showcasing our amazing HVAC and mechanical engineering projects.
                    This section will feature our completed installations, ongoing works, and case studies.
                </p>
            </div>

            <!-- Features coming soon -->
            <div class="grid md:grid-cols-2 gap-4 text-left">
                <div class="flex items-center space-x-3 text-white/70">
                    <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>Project Gallery</span>
                </div>
                <div class="flex items-center space-x-3 text-white/70">
                    <div class="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <span>Case Studies</span>
                </div>
                <div class="flex items-center space-x-3 text-white/70">
                    <div class="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                    <span>Before & After</span>
                </div>
                <div class="flex items-center space-x-3 text-white/70">
                    <div class="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                    <span>Technical Details</span>
                </div>
            </div>
        </div>

        <!-- Call to action -->
        <div class="space-y-4">
            <p class="text-white/60 text-sm">
                In the meantime, feel free to explore our services or get in touch
            </p>

            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                        href="{base}/"
                        class="px-8 py-4 bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl uppercase tracking-wide text-sm"
                >
                    View Services
                </a>

                <a
                        href="{base}/client"
                        class="px-8 py-4 bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl uppercase tracking-wide text-sm"
                >
                    Contact Us
                </a>
            </div>
        </div>

        <!-- Professional logo -->
        <div class="mt-12 flex justify-center">
            <div class="relative">
                <div class="absolute -inset-2 bg-gradient-to-r from-red-500/20 to-blue-500/20 rounded-lg blur-lg"></div>
                <div class="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
                    <img src="{base}/images/logo.png" alt="SRA Engineering" class="h-12 filter brightness-110" />
                </div>
            </div>
        </div>
    </div>

    <!-- Background decorations -->
    <div class="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-orange-500/10 to-transparent rounded-full blur-3xl"></div>
    <div class="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-red-500/10 to-transparent rounded-full blur-3xl"></div>
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-orange-500/5 rounded-full blur-3xl -z-10"></div>
</div>