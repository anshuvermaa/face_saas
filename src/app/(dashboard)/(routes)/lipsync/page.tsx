import { Heading } from '@/components/heading'
import React from 'react'

import { VideoIcon, Inbox } from "lucide-react";
import Lipbody from '@/components/lipbody'


type Props = {}

const Lipsync = (props: Props) => {

    
  return (
   <>
   <div className='px-4 lg:px-8 '>
      <Heading
        title="lipsync"
        description="generate lipsynced video with AI."
        icon={VideoIcon}
        iconColor="text-orange-700"
        bgColor="bg-orange-700/10"
      />
      <Lipbody/>
      
    </div>
   </>
  )
}

export default Lipsync