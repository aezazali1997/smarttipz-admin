import { Button } from 'components'
import React from 'react'

const Index = ({ handleActiveTab, Active }) => {
    return (
        <div className="flex relative w-auto">
            <Button
                onSubmit={() => handleActiveTab('Unverified')}
                type="button"
                childrens={'Unverified'}
                classNames={`${Active('Unverified')}
                absolute left-12 md:left-28 px-3 py-2 w-32 md:w-36 flex justify-center items-center
                border text-sm border-purple-600 rounded-3xl active-btn`}
            />
            <Button
                onSubmit={() => handleActiveTab('verified')}
                type="button"
                childrens={'Verified'}
                classNames={`${Active('verified')} 
                border z-10 border-purple-600 px-3 py-2 w-20 md:w-36 flex justify-center 
                items-center text-sm rounded-3xl active-btn`}
            />
            <Button
                onSubmit={() => handleActiveTab('All')}
                type="button"
                childrens={'All'}
                classNames={`${Active('All')}
                border border-purple-600 absolute right-12 md:right-28 px-3 py-2 w-32 md:w-36 flex justify-center items-center
                text-sm rounded-3xl active-btn`}
            />
        </div>
    )
}

export default Index
