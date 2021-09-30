import { Button, Card, Modal, VideoPlayer } from 'components';
import React, { useState } from 'react'
import { getInputClasses } from 'utils/helpers';

const ContentManagement = () => {


    const [showModal, setShowModal] = useState(false);
    const [loading, setIsLoading] = useState(false);


    const ToggleModal = () => {
        setShowModal(!showModal);
    }

    return (
        <div className="bg-white py-5 px-3 space-y-3">
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-6 gap-x-6'>
                <div>
                    <Card
                        onClick={ToggleModal}
                        video={(<VideoPlayer />)}
                        title={'Mountain'}
                        description={'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'}
                    />
                </div>
                <div>
                    <Card
                        onClick={ToggleModal}
                        video={(<VideoPlayer />)}
                        title={'Mountain'}
                        description={'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'}
                    />
                </div>

                <Card
                    onClick={ToggleModal}
                    video={(<VideoPlayer />)}
                    title={'Mountain'}
                    description={'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'}
                />
                <Card
                    onClick={ToggleModal}
                    video={(<VideoPlayer />)}
                    title={'Mountain'}
                    description={'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'}
                />
            </div>
            {
                showModal &&
                <Modal
                    _Toggle={ToggleModal}
                    title={''}
                    body={(
                        <div className="flex flex-col w-full items-center space-y-2">
                            <p className="text-center">Please tell user why you deleted this video!</p>
                            <div className="w-full flex-col space-y-1">
                                <span>Message</span>
                                <div className={`relative`}>
                                    <textarea
                                        type="text"
                                        id="message"
                                        rows={5}
                                        maxLength={700}
                                        name="message"
                                        className={` border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3`}
                                        // value={formik.values.message}
                                        // onChange={formik.handleChange}
                                        // onBlur={formik.handleBlur}
                                        placeholder="Type your message here ..."
                                        autoComplete="off"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                    footer={(
                        <>
                            <button
                                onClick={ToggleModal}
                                type="button"
                                className="mt-3 w-full inline-flex justify-center hover:underline  px-4 py-2 text-base font-medium text  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            >
                                Cancel
                            </button>
                            <Button
                                type="button"
                                className="w-full inline-flex justify-center rounded-md border-none px-4 py-2 primary-btn text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                                childrens={'Send and Remove Video'}
                            // loading={formik.isSubmitting}
                            />
                        </>
                    )}
                />
            }
        </div>
    )
}

export default ContentManagement;