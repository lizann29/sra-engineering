<!-- ContactForm.svelte -->
<script lang="ts">
    import {base} from '$app/paths';
    import {t} from '$lib/stores/translations.js';
</script>

<div style="width: 100%"
     class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-600 via-gray-700 to-zinc-500 p-4">
    <div class="max-w-md w-full bg-white/5 backdrop-blur-xl rounded-none shadow-2xl border border-white/10 p-8 relative">


        <!-- Professional title -->
        <div class="text-center mb-8">
            <h2 class="text-2xl font-bold text-white mb-4 tracking-wider uppercase">{$t('contact_sra_engineering', 'Contact SRA Engineering')}</h2>
            <div class="h-0.5 w-20 bg-white mx-auto"></div>
        </div>

        <!-- Form with professional styling -->
        <form class="space-y-6" action="https://formspree.io/f/mgvydrez" method="POST">

            <!-- Name field -->
            <div>
                <label for="name"
                       class="block text-gray-300 font-semibold mb-3 text-sm uppercase tracking-wider">{$t('name', 'Name')}</label>
                <input
                        type="text"
                        id="name"
                        name="name"
                        class="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-none focus:outline-none focus:ring-2 focus:ring-white focus:border-white placeholder-gray-400 text-white transition-all duration-200 hover:bg-white/15 font-medium"
                        placeholder="{$t('name_placeholder', 'Enter your full name')}"
                        required
                />
            </div>

            <!-- Phone field -->
            <div>
                <label for="phone"
                       class="block text-gray-300 font-semibold mb-3 text-sm uppercase tracking-wider">{$t('phone', 'Phone')}</label>
                <input
                        type="tel"
                        id="phone"
                        name="phone"
                        class="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-none focus:outline-none focus:ring-2 focus:ring-white focus:border-white placeholder-gray-400 text-white transition-all duration-200 hover:bg-white/15 font-medium"
                        placeholder="{$t('phone_placeholder', '+995 123 45 67 89')}"
                        required
                />
            </div>

            <!-- Email field (recommended to add this) -->
            <div>
                <label for="email"
                       class="block text-gray-300 font-semibold mb-3 text-sm uppercase tracking-wider">{$t('email', 'Email')}</label>
                <input
                        type="email"
                        id="email"
                        name="email"
                        class="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-none focus:outline-none focus:ring-2 focus:ring-white focus:border-white placeholder-gray-400 text-white transition-all duration-200 hover:bg-white/15 font-medium"
                        placeholder="{$t('email_placeholder', 'your@email.com')}"
                        required
                />
            </div>

            <!-- Comment field -->
            <div>
                <label for="message"
                       class="block text-gray-300 font-semibold mb-3 text-sm uppercase tracking-wider">{$t('message', 'Message')}</label>
                <textarea
                        id="message"
                        name="message"
                        class="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-none focus:outline-none focus:ring-2 focus:ring-white focus:border-white placeholder-gray-400 text-white h-28 resize-none transition-all duration-200 hover:bg-white/15 font-medium"
                        placeholder="{$t('message_placeholder', 'Tell us about your project requirements...')}"
                ></textarea>
            </div>

            <!-- Submit button with professional styling -->
            <button
                    type="submit"
                    class="w-full py-4 px-6 bg-white hover:bg-gray-200 text-black font-bold rounded-none transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white uppercase tracking-wider text-sm relative overflow-hidden group border-2 border-white"
            >
                <span class="relative z-10">{$t('send_message', 'Send Message')}</span>
                <div class="absolute inset-0 bg-black/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>

            <!-- Professional contact info -->
            <div class="text-center pt-6 border-t border-white/20">
                <p class="text-gray-400 text-sm mb-4 uppercase tracking-wide font-medium">{$t('or_contact_directly', 'Or contact us directly')}:</p>
                <div class="space-y-2">
                    <p class="text-white text-sm font-semibold tracking-wide">📧 info@sra.ge</p>
                    <p class="text-white text-sm font-semibold tracking-wide">📞 +90 533 365 41 28</p>
                </div>
            </div>
        </form>
    </div>
</div>