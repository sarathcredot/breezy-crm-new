import React from 'react'
import { useState } from 'react'

function Banner() {
    const [data, setdata] = useState([
        {
            name: "Customer Report",
            count: "100+"
        },
        {
            name: "Service Report",
            count: "100+"
        },
        {
            name: "Sales Report",
            count: "100+"
        }
    ])

    const [active, setActive] = useState(0)


    return (
        <div>
            <div className='w-full h-[300px] flex justify-evenly px-5 '>

                {
                    data.map((data, index) => (

                        <div onClick={() => setActive(index)}
                            key={index} className={` ${active === index && "border-2 border-[#1f709f]"}  w-[350px] h-[180px] bg-white rounded-[26px] pt-[50px] `} >

                            <h1 className='text-center text-[20px] font-bold'> {data?.name} </h1>

                        </div>
                    ))
                }

            </div>

        </div>
    )
}

export default Banner