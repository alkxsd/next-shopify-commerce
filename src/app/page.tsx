import HeroBanner from '@/components/HeroBanner';
import { getHeroBanner } from '@/lib/apollo/utils';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  description: 'High-performance e-commerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website',
  },
};

export default async function Home() {
  const banner = await getHeroBanner('hero-banner');

  return (
    <main className='flex-1'>
      {/* Herro Banner section */}
      {banner && <HeroBanner {...banner} />}
      <section className='w-full py-12 md:py-24 lg:py-32 grid place-content-center'>
        <div className='container space-y-12 px-4 md:px-6'>
          <div className='flex flex-col items-center justify-center space-y-4 text-center'>
            {/* New Arrivals section */}
            <div className='space-y-2'>
              <div className='inline-block rounded-lg bg-muted px-3 py-1 text-sm'>New Arrivals</div>
              <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>Trending Now</h2>
              <p className='max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                Check out our latest collection of stylish and comfortable clothing.
              </p>
            </div>
          </div>
          <div className='mx-auto grid items-start justify-center gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-4'>
            <div className='grid gap-1'>
              <Link href='/search/womens-collection' className='group' prefetch={false}>
                <Image
                  src='/womens-collection.png'
                  width={400}
                  height={500}
                  alt="Women's Collection"
                  className='aspect-[4/5] overflow-hidden rounded-lg object-cover group-hover:scale-105 transition-transform'
                />
                <h3 className='mt-4 text-lg font-bold group-hover:underline'>Women&apos;s Collection</h3>
              </Link>
            </div>
            <div className='grid gap-1'>
              <Link href='/search/mens-collection' className='group' prefetch={false}>
                <Image
                  src='/mens-collection.png'
                  width={400}
                  height={500}
                  alt="Men's Collection"
                  className='aspect-[4/5] overflow-hidden rounded-lg object-cover group-hover:scale-105 transition-transform'
                />
                <h3 className='mt-4 text-lg font-bold group-hover:underline'>Men&apos;s Collection</h3>
              </Link>
            </div>
            <div className='grid gap-1'>
              <Link href='/search/kids' className='group' prefetch={false}>
                <Image
                  src='/kids-collection.png'
                  width={400}
                  height={500}
                  alt="Kids' Collection"
                  className='aspect-[4/5] overflow-hidden rounded-lg object-cover group-hover:scale-105 transition-transform'
                />
                <h3 className='mt-4 text-lg font-bold group-hover:underline'>Kids&apos;s Collection</h3>
              </Link>
            </div>
            <div className='grid gap-1'>
              <Link href='/search/sales' className='group' prefetch={false}>
                <Image
                  src='/sales-collection.png'
                  width={400}
                  height={500}
                  alt="Sale's Collection"
                  className='aspect-[4/5] overflow-hidden rounded-lg object-cover group-hover:scale-105 transition-transform'
                />
                <h3 className='mt-4 text-lg font-bold group-hover:underline'>Sale&apos;s Collection</h3>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 lg:py-7 bg-[url('/sale-backdrop.svg')] grid place-content-center">
        <div className='container grid items-center justify-center gap-4 px-4 text-center md:px-6'>
          <Image
            src='/sale-banner.svg'
            width={800} // Adjust based on your actual image size
            height={400} // Adjust based on your actual image size
            alt='sale footer banner'
            priority
          />
          <div className='space-y-3 z-50'>
            <div className='bg-white dark:bg-black'>
              <h2 className='text-3xl font-bold tracking-tighter md:text-4xl/tight p-2'>Explore Our Sale Collection</h2>
            </div>
            <div className='bg-white'>
              <p className='mx-auto max-w-[600px] text-black md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed p-2'>
                Don&apos;t miss out on our amazing deals and discounts.
              </p>
            </div>
          </div>
          <div className='mx-auto w-full max-w-sm space-y-2 z-50'>
            <Link
              href='#'
              className='inline-flex h-10 items-center justify-center rounded-md bg-slate-200 dark:bg-black px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'
              prefetch={false}
            >
              Shop Sale
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
