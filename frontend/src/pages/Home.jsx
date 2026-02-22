import React from 'react'
import { Group, Panel, Separator } from "react-resizable-panels";
import LeftSection from '../components/LeftSection';
import RightSection from '../components/RightSection';
const Home = () => {
  return (
    <div className='w-full h-full p-5'>
      <Group className='bg-slate-950 rounded-xl'>
        <Panel minSize="10%" maxSize="40%" defaultSize="25%" className='p-3'>
          <LeftSection/>
        </Panel>
        <Separator className='w-1 bg-red-200 outline-none'/>
        <Panel minSize="50%" defaultSize="70%">
          <RightSection/>
        </Panel>
      </Group>
    </div>
  )
}

export default Home
