import { Check } from "lucide-react";
import Image from 'next/image';
import Link from "next/link";

interface HeroBannerProps {
  id: string; // Add this to match HeroBannerType
  title: string;
  subtitle: string;
  features: string[];
  buttonText: string;
  buttonUrl: string;
  image: {
    url: string;
    altText: string;
    width: number;
    height: number;
  };
  backgroundColor: string; // Make this required to match HeroBannerType
}

const HeroBanner = ({ title, subtitle, features, buttonText, buttonUrl, image }: HeroBannerProps) => {
  return (
    <section className='py-8 sm:py-12 w-full overflow-hidden'>
      <div className='container mx-auto px-4 w-full'>
        <div className='flex gap-6 items-stretch flex-col sm:gap-8 w-full'>
          <div className='flex gap-12 items-center flex-col md:flex-row'>
            <div className='flex gap-12 items-stretch flex-col'>
              <span className='text-base md:!text-5xl'>
                <p>
                  <strong>{title}</strong> {subtitle}
                </p>
              </span>
              <div className='flex gap-4 items-start flex-col'>
                {features.length > 0 &&
                  features.map((feature, index) => (
                    <div key={`feature-${index}`} className='flex gap-2 items-center'>
                      <div className='flex gap-4 items-center justify-center h-[18px] w-[18px] rounded-full bg-black'>
                        <Check className='w-3 h-3 text-white' />
                      </div>
                      <span className='text-base md:!text-xl'>{feature}</span>
                    </div>
                  ))}
              </div>
              <Link
                href={buttonUrl}
                className='flex font-bold select-none items-center justify-center transition-all border no-underline hover:opacity-75 px-8 py-2 uppercase bg-[#646cff] text-white rounded'
              >
                <span>{buttonText}</span>
              </Link>
            </div>
            <div className='relative w-full md:w-2/3 md:h-[466px] h-[400px] overflow-hidden rounded-xl'>
              <Image
                src={image.url}
                alt={image.altText || 'Hero banner'}
                fill
                className='object-cover'
                priority
                sizes='(max-width: 768px) 100vw, 66vw'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner