<script>
  import { companies } from "$lib/data/companies.json";
  import Company from "$lib/career/Company.svelte";
  import AruLogo from "$lib/assets/logos/aru-logo.jpeg";
  import BookingLogo from "$lib/assets/logos/booking-logo.jpeg";
  import FikaLogo from "$lib/assets/logos/fika-logo.svg";
  import JayexLogo from "$lib/assets/logos/jayex-logo.jpeg";
  import SeedrsLogo from "$lib/assets/logos/seedrs-logo.jpeg";
  import AruImage from "$lib/assets/images/companies/aru.png";
  import BookingImage from "$lib/assets/images/companies/booking.png";
  import FikaImage from "$lib/assets/images/companies/fika.png";
  import JayexImage from "$lib/assets/images/companies/jayex.png";
  import SeedrsImage from "$lib/assets/images/companies/seedrs.png";

  companies.map((company) => {
    switch (company.name) {
      case "Fika Community":
        company.logoUrl = FikaLogo;
        company.imageUrl = FikaImage;
        break;
      case "Booking.com":
        company.logoUrl = BookingLogo;
        company.imageUrl = BookingImage;
        break;
      case "Anglia Ruskin University":
        company.logoUrl = AruLogo;
        company.imageUrl = AruImage;
        break;
      case "Jayex Technology":
        company.logoUrl = JayexLogo;
        company.imageUrl = JayexImage;
        break;
      case "Seedrs":
        company.logoUrl = SeedrsLogo;
        company.imageUrl = SeedrsImage;
        break;
      default:
        company.logoUrl = "";
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
