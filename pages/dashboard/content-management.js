import axiosInstance from 'APIs/axiosInstance';
import { Button, Card, Modal, Spinner, VideoPlayer } from 'components';
import { initial, isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react'
import { getInputClasses } from 'utils/helpers';
import { FormikProvider, useFormik } from 'formik';
import { RemoveVideoSchema } from 'utils/validation_shema';

const initials = {
	email: '',
	message: ''
}

const ContentManagement = () => {

	const [users, setUsers] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [loading, setLoading] = useState(true);
	const [initialValues, setInitialValues] = useState(initials);

	const fetchMedia = async () => {
		enableLoading(true);
		try {
			const { data: { data: { users } } } = await axiosInstance.getContentVideos();
			console.log('response: ', users);
			setUsers(users);
			disableLoading(false);
		}
		catch (e) {
			console.log('error: ', e);
			disableLoading(false);
		}
	}

	useEffect(() => {
		fetchMedia();
	}, [])


	const enableLoading = () => {
		setLoading(true);
	};

	const disableLoading = () => {
		setLoading(false);
	};


	const _OpenModal = (email) => {
		setInitialValues({ ...initialValues, email })
		setShowModal(!showModal);
	}

	const ToggleModal = () => {
		setShowModal(!showModal);
	}

	const _OnSubmit = async (values, setSubmitting, resetForm) => {
		// setSubmitting(true);
		// try {
		// 	const res = await axiosInstance.removeVideo(values)
		// 	console.log('res: ', res);
		// 	const updatedUser = users.filter(user => user.email !== values.email && user);
		// 	setUsers(updatedUser);
		// 	resetForm(initials);
		// 	setSubmitting(false);
		// 	ToggleModal();
		// }
		// catch (e) {
		// 	console.log('error: ', e);
		// }
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

	return (
		<div className="bg-white py-5 px-3 space-y-3 h-screen w-full">
			{

				loading ? (
					<div className="flex w-full h-4/5 justify-center items-center" >
						<span className="flex flex-col items-center">
							<Spinner />
							{/* <p className="text-sm text-gray-400"> Fetching Admins</p> */}
						</span>
					</div>
				)
					:
					isEmpty(users) ?
						<p className="flex h-screen w-full justify-center items-center">
							No Content Available
						</p>
						:
						<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-6 gap-x-6'>
							{
								users.map(({ username, picture, accountType, email, name, Videos }) => (
									Videos.map(({ url, thumbnail }, index) => (
										<div key={index}>
											<Card
												onClick={() => _OpenModal(email)}
												video={(<VideoPlayer src={url} poster={thumbnail} />)}
												title={name}
												description={accountType === 'Business' ? email : username}
												picture={picture}
											/>
										</div>
									))
								))
							}
						</div>
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
												resize- none border overflow-y-auto bg-gray-50 text-sm
												border-gray-200 focus:outline-none rounded-md
												focus:shadow-sm w-full px-2 py-3`}
											value={formik.values.message}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											placeholder="Type your message here ..."
											autoComplete="off"
										/>
										{formik.touched.message && formik.errors.message &&
											<div className="text-red-700 text-sm mb-4" >{formik.errors.message}</div>
										}
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