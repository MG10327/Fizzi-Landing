import { Bounded } from '@/components/Bounded'
import Button from '@/components/Button'
import {asText, Content} from '@prismicio/client'
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'
import {PrismicRichText, SliceComponentProps} from '@prismicio/react'

// Props for the hero go here
export type HeroProps = SliceComponentProps<Content.HeroSlice>


// component for the hero slices
const Hero = ({slice}: HeroProps): JSX.Element => {
    return (
        <Bounded
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
        >
            <div className="grid">
                <div className='grid h-screen place-items-center'>
                    <div className='grid auto-rows-min place-items-center text-center'>
                        {/* Puts our items in the center with screen height 100vh */}

                        <h1 className='hero-header text-7xl font-black
                        uppercase leading[.8] text-orange-500 md:text-[9rem] lg:text-[13rem]'>
                            {asText(slice.primary.heading)}
                        </h1>
                        data-slice-type={slice.slice_type}
                        data-slice-type={slice.variation}

                        <div className='hero-subheading mt-12 text-5xl font-semibold text-sky-950 lg:text-6xl'>
                            <PrismicRichText field={slice.primary.heading} />
                        </div>

                        <div className='hero-body text-2xl font-normal text-sky-950'>
                            <PrismicRichText field={slice.primary.heading} />
                        </div>

                        <Button buttonLink={slice.primary.button_link} buttonText={slice.primary.button_text} className='hero-button mt-12' />
                    </div>
                </div>

                <div className="grid">
                    <PrismicNextImage field={slice.primary.cans_image} className='w-full md:hidden'/>
                    <div>
                        <h2 className='text-side-heading text-balance text-6xl font-black uppercase text-sky-950 lg:text-8xl'>
                            <PrismicRichText field={slice.primary.second_heading} />
                        </h2>

                        <div className='text-side-body mt-4 max-w-xl text-balance text-xl font-normal text-sky-950'>
                            <PrismicRichText field={slice.primary.second_body} />
                        </div>
                    </div>
                </div>
            </div>

        </Bounded>

    )
}

export default Hero