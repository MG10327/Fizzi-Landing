'use client'

import FloatingCan from "@/components/FloatingCan";
import { SodaCanProps } from "@/components/SodaCan";
import {Content} from "@prismicio/client"
import { PrismicRichText, SliceComponentProps, PrismicText } from "@prismicio/react"
import { Center, Environment, View } from "@react-three/drei";
import { useState } from "react";
import { ArrowIcon } from "./ArrowIcon";
import clsx from "clsx";
import { WavyCircles } from "./WavyCircles";

const FLAVORS: {
  flavor: SodaCanProps["flavor"];
  color: string;
  name: string;
}[] = [
  { flavor: "blackCherry", color: "#710523", name: "Black Cherry" },
  { flavor: "grape", color: "#572981", name: "Grape Goodness" },
  { flavor: "lemonLime", color: "#164405", name: "Lemon Lime" },
  {
    flavor: "strawberryLemonade",
    color: "#690B3D",
    name: "Strawberry Lemonade",
  },
  { flavor: "watermelon", color: "#4B7002", name: "Watermelon Crush" },
];

type Props = {}

export type CarouselProps = SliceComponentProps<Content.CarouselSlice>

const Carousel = ({slice}: CarouselProps): JSX.Element => {
  const [currentFlavorIndex, setCurrentFlavorIndex] = useState(0)

  function changeFlavor(index: number){
    const nextIndex = (index + FLAVORS.length) % FLAVORS.length

    setCurrentFlavorIndex(nextIndex)
  }

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="carousel relative grid h-screen grid-rows-[auto, 4fr, auto] justify-center overflow-hidden bg-white py-12 text-white"
    >
      <div className="background pointer-events-none absolute inset-0 bg-[#710523] opacity-50"></div>

      <WavyCircles className="absolute left-1/2 top-1/2 h-[120vmin] -translate-x-1/2 -translate-y-1/2 text-[#710523]" />

      <h2 className="relative text-center text-5xl font-bold">
        <PrismicText field={slice.primary.heading} />
      </h2>

      <div className="grid grid-cols-[auto, auto, auto] items-center">
        {/* Left */}
        <ArrowButton onClick={() => changeFlavor(currentFlavorIndex + 1)} className="z-20" direction="left" />
        {/* Can */}
        <View className="aspect-square h-[70vmin] min-h-40">
          <Center position={[0, 0, 1.5]}>
            <FloatingCan floatIntensity={.3} rotationIntensity={1} flavor={FLAVORS[currentFlavorIndex].flavor} />
          </Center>

          <Environment files='/hdr/lobby.hdr'
            environmentIntensity={.6}
            environmentRotation={[0, 3, 0]}
          />

          <directionalLight intensity={6} position={[0, 1, 1]} />


        </View>

        {/* Right */}

        <ArrowButton onClick={() => changeFlavor(currentFlavorIndex + 1)} className="z-20" />
      </div>

      <div className="text-area relative mx-auto text-center">
        <div className="text-wrapper">
          <p>{FLAVORS[currentFlavorIndex].name}</p>
        </div>

        <div className="mt-2 text-2xl font-normal opacity-90">
          <PrismicRichText field={slice.primary.price_copy} />
        </div>
      </div>

    </section>
  )
}

export default Carousel



function ArrowButton({label, onClick, direction='right'}: ArrowButtonProps){
  return(
    <button
      onClick={onClick}
      className="z-20 size-12 border-2 border-white bg-white/10 p-3 rounded-full opacity-85 ring-white focus:outline-none
      focus-visible:opacity-100 focus-visible: ring-4 md:size-16 lg:size-20 "
    >
      <ArrowIcon className={clsx(direction === 'right' && '-scale-x-100')}/>
      <span>
        {label}
      </span>
    </button>
  )
}