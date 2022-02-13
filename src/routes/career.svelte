<script>
  import { companies } from '$lib/data/companies.json';
  import Company from '$lib/career/Company.svelte';
  import AruLogo from '$lib/assets/logos/aru-logo.jpeg';
  import BookingLogo from '$lib/assets/logos/booking-logo.jpeg';
  import FikaLogo from '$lib/assets/logos/fika-logo.svg';
  import JayexLogo from '$lib/assets/logos/jayex-logo.jpeg';
  import SeedrsLogo from '$lib/assets/logos/seedrs-logo.jpeg';

  companies.map((company) => {
    switch (company.name) {
      case 'Fika Community':
        company.logo = FikaLogo;
        break;
      case 'Booking.com':
        company.logo = BookingLogo;
        break;
      case 'Anglia Ruskin University':
        company.logo = AruLogo;
        break;
      case 'Jayex Technology':
        company.logo = JayexLogo;
        break;
      case 'Seedrs':
        company.logo = SeedrsLogo;
        break;
      default:
        company.logo = null;
    }
  });
</script>

<h4 class="w-full flex justify-center pt-10 pb-20">
  <span class="text-5xl">👨‍💻</span>
</h4>
<div class="flex flex-col pb-10 pb-10">
  {#each companies as company, i}
    <Company {company} index={i} />
  {/each}
</div>
