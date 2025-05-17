"use client";

import { Content } from "@prismicio/client";
import { Cloud, Clouds, Environment, Text } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import FloatingCan from "@/components/FloatingCan";
import { useMediaQuery } from "@/hooks/useMediaQuery";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type SkyDiveProps = {
  sentence: string | null;
  flavor: Content.SkyDiveSliceDefaultPrimary["flavor"];
};

export default function Scene({ sentence, flavor }: SkyDiveProps) {
  const groupRef = useRef<THREE.Group>(null);
  const canRef = useRef<THREE.Group>(null);
  const cloud1Ref = useRef<THREE.Group>(null);
  const cloud2Ref = useRef<THREE.Group>(null);
  const cloudsRef = useRef<THREE.Group>(null);
  const wordsRef = useRef<THREE.Group>(null);

  const ANGLE = 75 * (Math.PI / 180)

  const getXPosition = (distance: number) => distance * Math.cos(ANGLE)
  const getYPosition = (distance: number) => distance * Math.cos(ANGLE)

  const getXYPositions = (distance: number) => ({
    x: getXPosition(distance),
    y: getYPosition(-1 * distance)
  })

  useGSAP(() => {
    if(
      // first we check if our refs are there.
      !cloudsRef.current ||
      !wordsRef.current ||
      !canRef.current ||
      !cloud1Ref.current ||
      !cloud2Ref.current
    ) return // stops if the refs aren't there

    // now we continue with our animation
    gsap.set(cloudsRef.current.position, {z: 10})

    gsap.set(canRef.current.position, {...getXYPositions(-4)})

    // now we do each individual word
    gsap.set(wordsRef.current.children.map((word) => word.position), {...getXYPositions(7)})

    gsap.to(canRef.current.rotation, {
      y: Math.PI * 2,
      duration: 1.7,
      repeat: -1,
      ease: 'none'
    })



    // Infinite cloud movement
    const DISTANCE = 15;
    const DURATION = 6;

    gsap.set([cloud2Ref.current.position, cloud1Ref.current.position], {
      ...getXYPositions(DISTANCE),
    });

    gsap.to(cloud1Ref.current.position, {
      y: `+=${getYPosition(DISTANCE * 2)}`,
      x: `+=${getXPosition(DISTANCE * -2)}`,
      ease: "none",
      repeat: -1,
      duration: DURATION,
    });

    gsap.to(cloud2Ref.current.position, {
      y: `+=${getYPosition(DISTANCE * 2)}`,
      x: `+=${getXPosition(DISTANCE * -2)}`,
      ease: "none",
      repeat: -1,
      delay: DURATION / 2,
      duration: DURATION,
    });

    const scrollTimeline = gsap.timeline({
      // defines the timeline we're gonna animate on scroll trigger
      scrollTrigger : {
        trigger: '.skydive',
        pin: true,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5 // scrub based playback control
      }
    })

    // now we animate that timeline.
    scrollTimeline.to('body', {
      backgroundColor: '#C0F0F5',
      overwrite: 'auto', // prioritizes this animation if another runs at the same time
      duration: 0.1
    })

    .to(cloudsRef.current.position, {z: 0, duration: .3}, 0)
    .to(canRef.current.position, {x: 0, y: 0, duration: .3, ease: 'back.out(1.7)'})

    
  })
  return (
    <group ref={groupRef}>
      {/* Can */}
      <group rotation={[0, 0, 0.5]}>
        <FloatingCan
          ref={canRef}
          flavor={flavor}
          rotationIntensity={0}
          floatIntensity={3}
          floatSpeed={3}
        >
          {/* Adds an axis for the can so its spins on its own axis. */}
          <pointLight intensity={30} color="#8C0413" decay={0.6} />
        </FloatingCan>
      </group>

      {/* Clouds */}
      <Clouds ref={cloudsRef}>
        <Cloud ref={cloud1Ref} bounds={[10, 10, 2]}/>
        <Cloud ref={cloud2Ref} bounds={[10, 10, 2]}/>
      </Clouds>



      {/* Text */}
      <group ref={wordsRef}>
        {sentence && <ThreeText sentence={sentence} color="#F97315" />}
      </group>

      {/* Lights */}
      <ambientLight intensity={2} color="#9DDEFA" />
      <Environment files="/hdr/field.hdr" environmentIntensity={1.5} />
    </group>
  );
}

function ThreeText({
  sentence,
  color = "white",
}: {
  sentence: string;
  color?: string;
}) {
  const words = sentence.toUpperCase().split(" ");

  const material = new THREE.MeshLambertMaterial();
  const isDesktop = useMediaQuery("(min-width: 950px)", true);

  return words.map((word: string, wordIndex: number) => (
    <Text
      key={`${wordIndex}-${word}`}
      scale={isDesktop ? 1: .5}
      color={color}
      material={material}
      font='/fonts/Alpino-Variable.woff'
      fontWeight={900}
      anchorX={'center'}
      anchorY={'middle'}
      characters='ABCDEFGHIJKLMNOPQRSTUVWXYZ!,.?'
    >
      {word}
    </Text>
  ));
}