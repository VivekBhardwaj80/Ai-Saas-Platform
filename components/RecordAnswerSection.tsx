import Image from 'next/image'
import React from 'react'
import Webcam from 'react-webcam'
import { Button } from './ui/button'

const RecordAnswerSection = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
    <div className='flex flex-col justify-center items-center rounded-lg p-5 my-10 bg-black'>
        <Image src={'/webCamImage.png'} alt='Web Cam' width={200} height={200} className='absolute' />
        <Webcam 
        mirrored={true}
        style={{
            height:300,
            width:'100%',
            zIndex:10
        }}/>
    </div>
    <Button variant='outline' className='my-10'>Record Anser</Button>
    </div>
  )
}

export default RecordAnswerSection