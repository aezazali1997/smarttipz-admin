import React, { useEffect, useRef, useState } from 'react'
import { useFormik } from 'formik';
// import { useS3Upload } from 'next-s3-upload';
import Swal from 'sweetalert2';
import swal from 'sweetalert';
import axiosInstance from 'APIs/axiosInstance';
// import { RequestTestimonialFormSchema, UploadPhotoVideoSchema } from 'utils/validation_shema';
import {calProfileRating} from '../utils/rating'

const initial = {
    email: ''
};

const initials = {
    title: '',
    description: '',
    category: '',
    language: '',
    mediaType: ''
}

const UseFetchProfile = (profile) => {

    const [showBusinessCard, setShowBusinessCard] = useState(false);
    const [followers, setFollowers] = useState(0);
    const [followed, setFollowed] = useState(0);
    const [businessCard, setBusinessCard] = useState('');
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [loadingTestimonial, setLoadingTestimonial] = useState(true);
    const [imageUrl, setImageUrl] = useState('');
    const [hasMore, setHasMore] = useState(false);
    const [testimonial, setTestimonial] = useState([]);
    const [filteredTestimonial, setFilteredTestimonial] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showRequestTestimonial, setShowRequestTestimonial] = useState(false);
    const [MediaType, setMediaType] = useState(null);
    const [urls, setUrls] = useState('');
    const [thumbnailFile, setThumbnailFile] = useState('');
    const [thumbnailUrl, setThumbnailUrl] = useState('');
    const [agree, setAgree] = useState(false);
    const [initialValues, setInitialValues] = useState(initial);
    const [modalTitle, setModalTitle] = useState('');
    const [catalogues, setCatalogues] = useState([]);
    const [fetchingCatalogues, setFetchCatalogues] = useState(true);
    const [myVideos, setMyVideos] = useState([]);
    const [fetchingMyVideos, setFetchMyVideos] = useState(true);
    const [uploadingThumbnail, setUploadingThumbnail] = useState(false);
    const [profileRating,setProfileRating]=useState(0);

    // let { FileInput, openFileDialog, uploadToS3 } = useS3Upload();
    let thumbnailRef = useRef();

    useEffect(() => {
        const { accountType, username, isApproved } = profile;
        enableLoadTestimonial();
        // localStorage.setItem('isApproved', isApproved);
        // localStorage.setItem('username', username);
        // localStorage.setItem('accountType', accountType);
        axiosInstance.getFollow(username).then(({ data: { data: { followers, followed } } }) => {
            setFollowed(followed);
            setFollowers(followers);
        }).catch(({ response: { data: { message } } }) => {
            console.log(message);
        })
        if (accountType === 'Business') {
            axiosInstance.getBusinessCard(username).then(({ data: { data } }) => {
                setBusinessCard(data);
            }).catch(({ response: { data: { message } } }) => {
                console.log('Error in Api BusinessCard: ', message);
            })
            axiosInstance.getTestimonial(username).then(({ data: { data } }) => {
                const slicedData = data.slice(0, 5);
                if (data?.length !== slicedData?.length) {
                    setHasMore(true);
                };
                setTestimonial(data);
                setFilteredTestimonial(slicedData);
                disableLoadTestimonial();
            }).catch(({ response: { data: { message } } }) => {
                disableLoadTestimonial();
                console.log('Error in Api Testimonials: ', message);
            })
        }
    }, []);

    const fetchCatalogues = async (username) => {
        enableFetchCatalogue();
        try {
            const { data: { data: { catalogues } } } = await axiosInstance.getCatalogues(username);
            setCatalogues(catalogues);
            console.log('catalogues: ', catalogues);
            disableFetchCatalogue();
        }
        catch ({ response: { data: { message } } }) {
            console.log('Error in catalogue Api: ', message);
            disableFetchCatalogue();
        }
    }

    const fetchMyVideos = async (username) => {
        enableFetchMyVideos();
        try {
            const { data: { data: { videos } } } = await axiosInstance.getVideos(username);
            setMyVideos(videos);
            setProfileRating(calProfileRating(videos)); 
            
            disableFetchMyVideos();
        }
        catch ({ response: { data: { message } } }) {
            console.log('Error in videos Api: ', message);
            disableFetchMyVideos();
        }
    }

    useEffect(() => {
        const { accountType, username, isApproved } = profile;
        fetchCatalogues(username);
        fetchMyVideos(username);
    }, []);

    useEffect(() => { }, [testimonial, catalogues])

    let fetchMoreData = () => {
        let copyAllTestimonials = [...testimonial];
        let copyFilteredTestimonials = [...filteredTestimonial];
        let moreData = copyAllTestimonials.slice(copyFilteredTestimonials?.length, copyFilteredTestimonials?.length + 5)
        let updatedTestimonials = [...copyAllTestimonials, ...moreData];
        if (testimonial?.length !== updatedTestimonials?.length) {
            setHasMore(true);
        }
        else {
            setHasMore(false);
        }
        setFilteredTestimonial(updatedTestimonials);
    }

    let handleShowBusinessCard = () => {
        setShowBusinessCard(showBusinessCard => !showBusinessCard)
    };

    let handleFileChange = async file => {
        enableUploading();
        // let { url } = await uploadToS3(file);
        // setImageUrl(url);
        disableUploading();
    };

    const _DeleteImg = () => {
        setUrls('');
    };

    const _AddTestimonial = () => {
        setShowRequestTestimonial(!showRequestTestimonial);
    }

    const _EditTestimonial = (id, isVisible) => {
        // axiosInstance.updateTestimonial({ id, isVisible }).then(({ data: { data, message } }) => {
        //     const CopyOriginalArray = [...testimonial];
        //     let updatedArray = CopyOriginalArray.map((item, index) => {
        //         if (item.id !== id) return item;
        //         else {
        //             item.isVisible = !isVisible;
        //             return item;
        //         }
        //     })
        //     setTestimonial(updatedArray);

        // }).catch(({ response: { data: { message } } }) => {
        //     console.log('error: ', message);
        // })
    }

    const _DeleteTestimonial = (data) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            buttonsStyling: false,
            customClass: {
                confirmButton: 'w-full inline-flex justify-center rounded-md border-none px-4 py-2 btn text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm',
                cancelButton: 'mt-3 w-full inline-flex justify-center hover:underline  px-4 py-2 text-base font-medium text-red-600  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                axiosInstance.deleteTestimonial(data?.id).then(({ data: { message } }) => {
                    Swal.fire({
                        text: message,
                        icon: 'success',
                        timer: 3000,
                        showCancelButton: false,
                        showConfirmButton: false
                    })
                    let copyOriginal = [...testimonial];
                    let updatedArray = copyOriginal.filter(item => item.id !== data?.id ? item : '');
                    setTestimonial(updatedArray);
                })
                    .catch(e => {
                        Swal.fire({
                            text: e.response.data.message,
                            icon: 'error',
                            timer: 3000,
                            showCancelButton: false,
                            showConfirmButton: false
                        })
                    })
            }
        })
    }

    const handleShowModal = () => {
        setShowModal(!showModal);
    }

    const enableLoading = () => {
        setLoading(true);
    };

    const disableLoading = () => {
        setLoading(false);
    };

    const enableUploading = () => {
        setUploading(true);
    };

    const disableUploading = () => {
        setUploading(false);
    };
    const enableLoadTestimonial = () => {
        setLoadingTestimonial(true);
    };

    const disableLoadTestimonial = () => {
        setLoadingTestimonial(false);
    };

    const enableFetchCatalogue = () => {
        setFetchCatalogues(true);
    };

    const disableFetchCatalogue = () => {
        setFetchCatalogues(false);
    };

    const enableFetchMyVideos = () => {
        setFetchMyVideos(true);
    };

    const disableFetchMyVideos = () => {
        setFetchMyVideos(false);
    };


    const _OnRequestTestimonial = (values, resetForm) => {
        console.log('in RequestTestimonial')
        const { email } = values
        enableLoading();
        axiosInstance.requestTestimonial({ email }).then(({ data: { message } }) => {
            swal({
                text: message,
                icon: 'success',
                buttons: false,
                timer: 3000
            })
            _AddTestimonial();
            resetForm({ email: '' });
            disableLoading();
        }).catch(({ response: { data: { message }, status } }) => {
            status === 404 ?
                swal({
                    text: message,
                    icon: 'info',
                    buttons: false,
                    timer: 3000
                })
                :
                swal({
                    text: message,
                    icon: 'error',
                    buttons: false,
                    timer: 3000
                })
            disableLoading()
        })
    }

    const _OnUploadMedia = async (values, setSubmitting, resetForm) => {
        console.log('In Upload Media')
        setSubmitting(true);
        console.log('values => ', values);
        values.url = urls;
        values.thumbnail = thumbnailUrl;
        values.category = 'catalogue';
        values.agree = agree;
        console.log(values);
        try {
            const res = await axiosInstance.uploadNewsFeed(values)
            // console.log(res);
            const { data: { message } } = res;
            Swal.fire({
                text: message,
                timer: 3000,
                icon: 'success',
                showCancelButton: false,
                showConfirmButton: false
            })
            setCatalogues([values, ...catalogues])
            resetForm(initials);
            setSubmitting(false);
            _CloseUploadModal();
        }
        catch ({ response: { data: { message } } }) {
            console.log('API Failed: ', message);
            Swal.fire({
                text: message,
                timer: 3000,
                icon: 'error',
                showCancelButton: false,
                showConfirmButton: false
            })
            setSubmitting(false);
        }
    }


    const formik = useFormik({
        // enableReinitialize: true,
        // initialValues,
        // validationSchema: (modalTitle === '' ? RequestTestimonialFormSchema : UploadPhotoVideoSchema),
        // validateOnBlur: true,
        // onSubmit: (values, { resetForm, setSubmitting }) => {
        //     modalTitle === '' ?
        //         _OnRequestTestimonial(values, resetForm)
        //         :
        //         _OnUploadMedia(values, setSubmitting, resetForm)
        // }
    });

    let onChangeThumbnail = async ({ target }) => {
        const { files } = target;
        for (let i = 0; i < files.length; i++) {
            setUploadingThumbnail(true);
            let file = files[0];
            setThumbnailFile(file)
            const { url } = await uploadToS3(file);
            setThumbnailUrl(url);
            setUploadingThumbnail(false);

        }
    }

    let _OnThumbnailClick = () => {
        thumbnailRef.current.click();
    }

    let _OnRemoveThumbnail = () => {
        setThumbnailUrl('');
        setThumbnailFile('');
    }

    let _OpenUploadModal = () => {
        setModalTitle('Upload Photo/Video');
        // setSelectedLanguage('');
        setInitialValues(initials);
        setShowModal(true);
    }

    let _CloseUploadModal = () => {
        setModalTitle('');
        setUrls('');
        setThumbnailUrl('');
        setAgree(false);
        setShowModal(false);
    }

    let ChangeAgreement = (e) => {
        const { checked } = e.target;
        setAgree(checked);
    }


    return {
        followed, followers, showModal, businessCard, showBusinessCard, formik, imageUrl, loading, testimonial, uploading,
        loadingTestimonial, _AddTestimonial, handleShowBusinessCard, _EditTestimonial, _DeleteImg, handleFileChange,
        handleShowModal, _DeleteTestimonial, showRequestTestimonial, fetchMoreData, filteredTestimonial,
        hasMore, _OnRemoveThumbnail, onChangeThumbnail, MediaType, thumbnailRef, modalTitle,
        agree, thumbnailUrl, urls, setUrls, setMediaType, ChangeAgreement, _OnThumbnailClick, uploadingThumbnail,
        _CloseUploadModal, _OpenUploadModal, catalogues, setCatalogues, fetchingCatalogues, myVideos, fetchingMyVideos,
        profileRating
    }
}

export default UseFetchProfile;
