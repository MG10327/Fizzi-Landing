import {Content} from '@prismicio/client'
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'
import {PrismicRichText, SliceComponentProps} from '@prismicio/react'

// Props for the hero go here
export type HeroProps = SliceComponentProps<Content.HeroSlice>


// component for the hero slices
const Hero = ({slice}: HeroProps): JSX.Element => {
    return (
        <section>
            data-slice-type={slice.slice_type}
            data-slice-type={slice.variation}

            <PrismicRichText field={slice.primary.heading} />
            <PrismicRichText field={slice.primary.heading} />
            <PrismicRichText field={slice.primary.heading} />
            {slice.primary.button_text}
            <PrismicNextLink field={slice.primary.button_link}>
                Link
            </PrismicNextLink>
            <PrismicNextImage field={slice.primary.cans_image}/>
            <PrismicRichText field={slice.primary.second_heading} />
            <PrismicRichText field={slice.primary.second_body} />
        </section>

    )
}

export default Hero