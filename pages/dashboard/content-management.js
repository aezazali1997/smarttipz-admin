/* eslint-disable @next/next/no-img-element */
import axiosInstance from 'APIs/axiosInstance';
import { Button, Card, Modal, Searchbar, Spinner, VideoPlayer } from 'components';
import { initial, isEmpty } from 'lodash';
import {Helmet} from 'react-helmet'
import React, { useEffect, useState } from 'react'
import { getInputClasses } from 'utils/helpers';
import { FormikProvider, useFormik } from 'formik';
import { RemoveVideoSchema } from 'utils/validation_shema';
import swal from 'sweetalert';
import useDebounce from 'utils/Debounce';
import { InView } from 'react-intersection-observer';
const initials = {
	email: '',
	message: ''
}

const ContentManagement = () => {

	const [videos, setVideos] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [loading, setLoading] = useState(true);
	const [initialValues, setInitialValues] = useState(initials);
	const [search, setSearch] = useState('');
	const [page, setPage] = useState(0);
	const [totalVideosCount, setTotalVideosCount] = useState(0);
	const [hasMore, setHasMore] = useState(true);
	const [inView, setInView] = useState(false);

	const debouncedSearchTerm = useDebounce(search, 1000);

	const fetchMedia = async (search) => {
		enableLoading(true);
		try {
			const { data: { data: { videos } } } =
				await axiosInstance.getContentVideos(search, page);
			// setTotalVideosCount(totalVideos);
			// setPage(currentPage)
			setVideos(videos);
			disableLoading(false);
		}
		catch (e) {
			console.log('error: ', e);
			disableLoading(false);
		}
	}

	useEffect(() => {
		fetchMedia(search);
	}, [])

	useEffect(() => {
		fetchMedia(debouncedSearchTerm);
	}, [debouncedSearchTerm])


	const enableLoading = () => {
		setLoading(true);
	};

	const disableLoading = () => {
		setLoading(false);
	};


	const _OpenModal = (id, UserId, email) => {
		setInitialValues({ ...initialValues, id, UserId, email })
		setShowModal(!showModal);
	}

	const ToggleModal = () => {
		setShowModal(!showModal);
	}

	const _OnSubmit = async (values, setSubmitting, resetForm) => {
		setSubmitting(true);
		try {
			const { data: { message } } = await axiosInstance.removeVideo(values)
			swal({
				text: message,
				buttons: false,
				icon: 'success',
				timer: 3000
			})
			fetchMedia(search);
			resetForm(initials);
			setSubmitting(false);
			ToggleModal();
		}
		catch (e) {
			console.log('error: ', e);
		}
	}

	const formik = useFormik({
		enableReinitialize: true,
		initialValues,
		validationSchema: RemoveVideoSchema,
		validateOnBlur: true,
		onSubmit: (values, { setSubmitting, setStatus, resetForm }) => {
			_OnSubmit(values, setSubmitting, resetForm);
		}
	});


	// const _FetchMoreData = async () => {
	// 	console.log('here');
	// 	if (videos.length >= totalVideosCount) {
	// 		setHasMore(false);
	// 	}
	// 	else {
	// 		try {
	// 			const { data: { data: { videos: newVideos, totalVideos, currentPage } } } = await axiosInstance.getContentVideos(search, page + 1);
	// 			// setVideos([...videos, [...newVideos]])
	// 			// setTotalVideosCount(totalVideos);
	// 			// setPage(currentPage);
	// 		}
	// 		catch (e) {
	// 			console.log('error: ', e);
	// 		}
	// 	}
	// };

	return (
		<div className="bg-white space-y-3 h-screen w-full">
		 {/*SEO Support*/}
            <Helmet>
                <title>Content Management | Smart Tipz Admin Panel</title>
            </Helmet>
            {/*SEO Support End */}
			{

				loading ? 
            <Spinner />
          
					:
					isEmpty(videos) ?
						<p className="flex h-screen w-full justify-center items-center">
							No Content Available
						</p>
						:
						<>
							<div className="py-2 px-3 sticky top-0 z-30 bg-white">
								<Searchbar search={search} onChange={setSearch} />
							</div>

							<div className='pb-3 px-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-6 gap-x-6'>
								{
									videos.map(({ url, thumbnail, id, UserId, mediaType,
										User: { username, picture, accountType, email, name } }, index) => (

										<div key={index}>
											<Card
												onClick={() => _OpenModal(id, UserId, email)}
												video={
													mediaType === 'video' ? (<VideoPlayer src={url} poster={thumbnail} />) :
														(<img className="w-full rounded-lg object-cover"
															src={url} alt="Sunset in the mountains" style={{ height: '200px' }} />)
												}
												title={name}
												description={accountType === 'Business' ? email : username}
												picture={picture}
											/>
										</div>
									))
								}
							</div>
				
						</>
			}
			{
				showModal &&
				<form onSubmit={formik.handleSubmit}>
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
											className={
												`${getInputClasses(formik, 'message')}
												resize-none border overflow-y-auto bg-gray-50 text-sm
												border-gray-200 focus:outline-none rounded-md
												focus:shadow-sm w-full px-2 py-3`}
											value={formik.values.message}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											placeholder="Type your message here ..."
											autoComplete="off"
										/>
										<div className="flex justify-between w-full">
											{
												formik.values.message.length === 700 ?
													<div className="text-red-700 text-sm mb-4" >Maximum limit reached</div>
													:
													formik.touched.message && formik.errors.message &&
													<div className="text-red-700 text-sm mb-4" >{formik.errors.message}</div>}
											<p className=" text-md text-gray-500">{formik.values.message.length}/700</p>
										</div>

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
									disable={formik.isSubmitting}
									type="submit"
									className={`w-full inline-flex justify-center rounded-md
										${formik.isSubmitting ? 'btn-disable' : 'primary-btn'}
										border-none px-4 py-2 primary-btn text-base font-medium
										text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm`}
									childrens={'Send and Remove Video'}
									loading={formik.isSubmitting}
								/>
							</>
						)}
					/>
				</form>
			}

		</div>
	)
}

export default ContentManagement;