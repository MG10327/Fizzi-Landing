import React from 'react'
import {FizziLogo} from '@/components/FizziLogo' // loads the logo from our components (svg)

type Props = {}

export default function Header({} : Props) {
    return (
        <header>
            <FizziLogo className='z-10 h-20 cursor-pointer text-sky-800' />
        </header>
    )
}