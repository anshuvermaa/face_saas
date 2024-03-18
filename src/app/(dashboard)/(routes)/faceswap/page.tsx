import { Heading } from '@/components/heading'
import React from 'react'

import { VideoIcon, Inbox } from "lucide-react";
import Facebody from "@/components/facebody"


type Props = {}

const Faceswap = (props: Props) => {

    
  return (
   <>
   <div className='lg:px-8'>
      <Heading
        title="faceswap"
        description="generate faceswaped video with AI."
        icon={VideoIcon}
        iconColor="text-orange-700"
        bgColor="bg-orange-700/10"
      />

    <Facebody/>
      
    </div>
   </>
  )
}

export default Faceswap