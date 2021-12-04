<script>
  import { companies } from '$lib/data/companies.json';
  import Company from '$lib/career/Company.svelte';
  import AruLogo from '$lib/assets/logos/aru-logo.jpeg';
  import BookingLogo from '$lib/assets/logos/booking-logo.jpeg';
  import FikaLogo from '$lib/assets/logos/fika-logo.svg';
  import JayexLogo from '$lib/assets/logos/jayex-logo.jpeg';
  import SeedrsLogo from '$lib/assets/logos/seedrs-logo.jpeg';

  let logo;
  companies.map((company) => {
    switch (company.name) {
      case 'Fika Community':
        logo = FikaLogo;
        break;
      case 'Booking.com':
        logo = BookingLogo;
        break;
      case 'Anglia Ruskin University':
        logo = AruLogo;
        break;
      case 'Jayex Technology':
        logo = JayexLogo;
        break;
      case 'Seedrs':
        logo = SeedrsLogo;
        break;
      default:
        logo = null;
    }
  });
</script>

<h4 class="py-10">Where I worked</h4>
<div class="flex flex-col pb-10 px-10">
  {#each companies as company}
    <Company {company} {logo} />
  {/each}
</div>
