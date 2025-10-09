import React from 'react'
import Frontend from './Skill/Frontend';

const Skill = () => {
    return (
        <div className='grid grid-cols-2  bg-[#1A1A2E] border-t-2    border-[#30A585] pt-10 pl-7 pr-7'>
            {/* left side */}
            <div className='width-[30%] flex flex-col gap-10 items-baseline justify-center' >
                <button className='ghost-button' >Frontend</button>
            </div>
            {/* RightSide */}
            <div className='width-[70%]'>
                <Frontend />
            </div>
        </div>
    )
}

export default Skill;