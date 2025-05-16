'use client'

import {forwardRef, ReactNode} from 'react'
import {Float} from '@react-three/drei'

import {SodaCan, SodaCanProps} from '@/components/SodaCan'
import {Group} from 'three'

type FloatingCanProps = {
    flavor?: SodaCanProps['flavor'] // imports the flavor type from the soda can props in the soda can component
    floatSpeed?: number
    rotationIntensity?: number
    floatIntensity?: number
    floatingRange?: [number, number] // range so its an array
    children?: ReactNode // this will take components or jsx inside of it.
}

// now we make our component
const FloatingCan = forwardRef<Group, FloatingCanProps>(({ flavor = "blackCherry", floatSpeed = 1.5, rotationIntensity = 1, floatIntensity = 1, floatingRange = [-0.1, 0.1],
      children, ...props },  ref ) => {
        return (
            <group ref={ref} {...props}>
                <Float speed={floatSpeed} rotationIntensity={rotationIntensity} floatIntensity={floatIntensity} floatingRange={floatingRange}>
                    {children}
                    <SodaCan flavor={flavor} />
                    {/* puts all props for customizing our floating can in place. */}
                </Float>
            </group>
        )
    }
)

FloatingCan.displayName = 'FloatingCan'

export default FloatingCan // makes this component available in other files.