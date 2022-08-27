<script>
  import { companies } from '$lib/data/companies.json';
  import Company from '$lib/career/Company.svelte';
  import AruLogo from '$lib/assets/logos/aru-logo.jpeg';
  import BookingLogo from '$lib/assets/logos/booking-logo.jpeg';
  import FikaLogo from '$lib/assets/logos/fika-logo.svg';
  import JayexLogo from '$lib/assets/logos/jayex-logo.jpeg';
  import SeedrsLogo from '$lib/assets/logos/seedrs-logo.jpeg';
  import AruImage from '$lib/assets/images/companies/aru.png';
  import BookingImage from '$lib/assets/images/companies/booking.png';
  import FikaImage from '$lib/assets/images/companies/fika.png';
  import JayexImage from '$lib/assets/images/companies/jayex.png';
  import SeedrsImage from '$lib/assets/images/companies/seedrs.png';

  companies.map((company) => {
    switch (company.name) {
      case 'Fika Community':
        company.logo = FikaLogo;
        company.image = FikaImage;
        break;
      case 'Booking.com':
        company.logo = BookingLogo;
        company.image = BookingImage;
        break;
      case 'Anglia Ruskin University':
        company.logo = AruLogo;
        company.image = AruImage;
        break;
      case 'Jayex Technology':
        company.logo = JayexLogo;
        company.image = JayexImage;
        break;
      case 'Seedrs':
        company.logo = SeedrsLogo;
        company.image = SeedrsImage;
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
