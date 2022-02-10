/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
import { faCommentAlt, faShareAlt, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import HandIcon from 'public/purple-hand.svg';
import React from 'react';
import { Rating, VideoPlayer } from '..';
import { PostActionDropdown } from '../Dropdown';


const NewsfeedCard = ({
	index,
	id,
	videoId,
	catalogue,
	UserId,
	isPost,
	thumbnail,
	url,
	title,
	views,
	width,
	User,
	isLiked,
	likeCount,
	commentCount,
	shareCount,
	avgRating,
	videoCost,
	videoType,
	productLink,
	restrictPaidVideo
}) => {

	return (
		<>
			<div
				className={`mx-auto ${width} shadow flex flex-col justify-center rounded-lg overflow-hidden
                bg-white space-y-2`}>
				<div className='flex flex-col'>
					<div className="flex w-full py-2 px-2 justify-between space-x-2">
						<div className="flex space-x-2">
							<img
								src={User?.picture ||
									"https://logos-world.net/wp-content/uploads/2020/12/Lays-Logo.png"}
								className="rounded-full w-10 h-10 object-cover"
								alt="avatar"></img>
							<div className="flex flex-col w-full">
								<p
									// onClick={() => _HandleGotoUserProfile(UserId, User?.username)}
									className="text-sm font-bold font-sans cursor-default">
									{User?.name}
								</p>
								<p className="text-xs text-gray-500">19h</p>
							</div>
						</div>
						<div className="flex space-x-2">
							
								<>
									<span
										// onClick={ToggleTipModal}
										className="inline-flex h-8 w-14 cursor-default tip-hand">
										<Image src={HandIcon} alt="banner" objectFit='contain' />
									</span>
								</>
							
						<span>
                {/* <svg
									xmlns="http://www.w3.org/2000/svg">
									<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
								</svg> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-gray-500 cursor-default"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </span>
							<div className="flex items-start justify-start">
								<PostActionDropdown
									// _HandleCatalogue={() => _HandleCatalogue(id, catalogue)}
									// _HandleDeleteVideo={() => _HandleDeleteVideo(index, videoId)}
									catalogue={catalogue}
									ownerId={UserId}
									isPost={isPost}
								/>
							</div>
						</div>
					</div>
					<p
						// onClick={() => _HandleGotoVideoDetails(id)}
						className="px-5 text-sm max-w-md whitespace-nowrap overflow-ellipsis overflow-hidden"
					>
						{title}
					</p>
				</div>
				{
					videoCost === 'Paid' && restrictPaidVideo ?
						!stopVideo ?
							<div className="video-wrapper"
							// onClick={_HandlePaidVideos}
							>
								<VideoPlayer poster={thumbnail} src={url} />
							</div>
							:
							<div className="video-wrapper flex flex-col justify-center items-center">
								<p className="text-md text-gray-500 text-center">To continue watching video</p>
								<button
									// onClick={TogglePaymentModal}
									type="button"
									className="mt-3 w-full inline-flex justify-center hover:underline  px-4 py-2 text-base font-medium text  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
								>
									PAY NOW
								</button>
							</div>
						:
						<div className="video-wrapper">
							<VideoPlayer poster={thumbnail} src={url} />
						</div>
				}

				<div className="flex justify-between w-full px-3">
					<span className="flex items-center z-0">
						<Rating value={avgRating || 0} isHalf={true} edit={false} />
					</span>

					<span className="flex items-center">
						<svg
							className="w-4 h-4 text"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg">
							<path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
							<path
								fillRule="evenodd"
								d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
								clipRule="evenodd"
							/>
						</svg>
						&nbsp;<p className="text-xs text-gray-500">{views} Views</p>
					</span>
				</div>

				<div className="flex flex-col w-full divide-y">
					<div className="flex justify-between w-full px-3 py-2 rounded-b-lg">

						<div className="space-x-2 flex">
							<div className="flex px-2 h-6  background items-center justify-center rounded-lg">
								<p className="text-white font-sm">{videoType}</p>
							</div>
							{
								videoCost ? (
									<div className="flex px-2 h-6 max-w-sm background items-center justify-center rounded-lg">
										<p className="text-white font-sm">{videoCost}</p>
									</div>
								)
									:
									productLink && (
										<Link href={productLink} passHref>
											<a target='_blank'>
												<span className="text font-sm hover:underline cursor-pointer">
													Product Link
												</span>
											</a>
										</Link>)
							}


						</div>
						<div>
							<p
								className="text flex justify-end font-sans">
								{' '}
								Disclaimer
							</p>
	
						</div>
						{/* </div> */}
					</div>
					<div className="flex justify-evenly py-1 px-2 space-x-2 divide-x">
						<div
							// onClick={HandleLikePost}
							className="flex relative justify-center group items-center py-1 px-3 w-full  cursor-default">
							<div className="flex flex-col items-center">
								<FontAwesomeIcon icon={faThumbsUp} className={`w-6 h-6 
                                ${isLiked == null || isLiked == false ? 'text-gray-600' : 'text-purple-600'} `}
								/>
								<p
									className={`cursor-default w-full text-xs text-center 
                                    ${isLiked == null || isLiked == false ? 'text-gray-600' : 'text-purple-600'} `}
								>
									{likeCount}
								</p>
							</div>
						</div>
						<div
							// onClick={() => _HandleCommentSection()}
							className="flex space-x-2 justify-center relative group py-1 px-3 w-full  cursor-default">
							<div className="flex flex-col items-center">
								<FontAwesomeIcon icon={faCommentAlt} className="w-6 h-6 text-gray-600 " />
								<p className="cursor-defualt w-full text-xs text-center text-gray-600 ">
									{commentCount}
								</p>
							</div>
						</div>
						<div
							// onClick={() => _OpenShareModal(videoId, thumbnail, url, User?.picture, User?.name, title)}
							className="flex relative group justify-center items-center py-1 px-3 w-full cursor-default"
						>
							<div className="flex flex-col items-center" >
								<FontAwesomeIcon icon={faShareAlt} className="w-6 h-6 text-gray-600 " />
								<p className=" cursor-default text-xs w-full text-center text-gray-600 ">
									{shareCount}
								</p>
							</div>

						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default NewsfeedCard;
