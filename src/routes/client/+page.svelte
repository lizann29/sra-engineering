<!-- ContactForm.svelte -->
<script lang="ts">
    import { base } from '$app/paths';
</script>

<div style="width: 100%" class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 p-4">
    <div class="max-w-md w-full bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8 relative">
        <!-- Close button in the top-right corner -->
<!--        <button class="absolute top-4 right-4 text-white hover:text-red-400 transition-colors duration-200 p-2 rounded-full hover:bg-white/10">-->
<!--            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">-->
<!--                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />-->
<!--            </svg>-->
<!--        </button>-->

        <!-- Logo with professional styling -->
        <div class="flex justify-center mb-8">
            <div class="relative">
                <div class="absolute -inset-2 bg-gradient-to-r from-red-500/30 to-blue-500/30 rounded-lg blur-lg opacity-50"></div>
                <div class="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
                    <img src="{base}/images/logo.png" alt="SRA Engineering Logo" class="h-16 filter brightness-110" />
                </div>
            </div>
        </div>

        <!-- Professional title -->
        <div class="text-center mb-8">
            <h2 class="text-2xl font-bold text-white mb-2">Contact SRA Engineering</h2>
            <div class="h-1 w-16 bg-gradient-to-r from-red-500 to-blue-500 mx-auto rounded-full"></div>
        </div>

        <!-- Form with professional styling -->
        <form class="space-y-6">
            <!-- Name field -->
            <div>
                <label for="name" class="block text-white font-medium mb-2 text-sm uppercase tracking-wide">Name</label>
                <input
                        type="text"
                        id="name"
                        class="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder-white/60 text-white transition-all duration-200 hover:bg-white/25"
                        placeholder="Enter your full name"
                        required
                />
            </div>

            <!-- Phone field -->
            <div>
                <label for="phone" class="block text-white font-medium mb-2 text-sm uppercase tracking-wide">Phone</label>
                <input
                        type="tel"
                        id="phone"
                        class="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-white/60 text-white transition-all duration-200 hover:bg-white/25"
                        placeholder="+995 123 45 67 89"
                        required
                />
            </div>

            <!-- Comment field -->
            <div>
                <label for="comment" class="block text-white font-medium mb-2 text-sm uppercase tracking-wide">Message</label>
                <textarea
                        id="comment"
                        class="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder-white/60 text-white h-24 resize-none transition-all duration-200 hover:bg-white/25"
                        placeholder="Tell us about your project requirements..."
                ></textarea>
            </div>

            <!-- Submit button with professional gradient -->
            <button
                    type="submit"
                    class="w-full py-4 px-6 bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 uppercase tracking-wide text-sm relative overflow-hidden group"
            >
                <span class="relative z-10">Send Message</span>
                <div class="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>

            <!-- Professional contact info -->
            <div class="text-center pt-4 border-t border-white/20">
                <p class="text-white/70 text-sm mb-2">Or contact us directly:</p>
                <div class="space-y-1">
                    <p class="text-white text-sm font-medium">📧 info@sra.ge</p>
                    <p class="text-white text-sm font-medium">📞 +90 533 365 41 28</p>
                </div>
            </div>
        </form>
    </div>
</div>