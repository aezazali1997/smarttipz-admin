/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import cookie from "js-cookie";
import { isEmpty } from "lodash";
import InfiniteScroll from "react-infinite-scroll-component";
import { UseFetchProfile } from "hooks";
import { Button, Spinner } from "components";
import {
  Card,
  Carousel,
  CustomLoader,
  InputField,
  PopupBusinessCard,
  ProfileCard,
  Rating,
  CustomStar,
  TestimonialCard,
  NewsfeedCard,
} from "components/profile/components";
import axiosInstance from "APIs/axiosInstance";
import axios from "axios";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";

const Profile = ({ profile }) => {
  const {
    showBusinessCard,
    followed,
    followers,
    businessCard,
    formik,
    loading,
    showModal,
    modalTitle,
    loadingTestimonial,
    handleShowBusinessCard,
    _DeleteImg,
    _EditTestimonial,
    showRequestTestimonial,
    filteredTestimonial,
    fetchMoreData,
    hasMore,
    _OnRemoveThumbnail,
    onChangeThumbnail,
    MediaType,
    thumbnailRef,
    agree,
    thumbnailUrl,
    urls,
    setUrls,
    setMediaType,
    ChangeAgreement,
    _OnThumbnailClick,
    _CloseUploadModal,
    fetchingCatalogues,
    catalogues,
    myVideos,
    fetchingMyVideos,
    uploadingThumbnail,
    profileRating,
  } = UseFetchProfile(profile);
  const {
    name = "",
    about = "",
    rating = "",
    views = "",
    picture = "",
    phone = "",
    email = "",
    accountType = "",
    username = "",
    showUsername = "",
    showName = "",
  } = profile || {};
  const { website } = businessCard;

  useEffect(() => {
    cookie.set("name", name);
  }, []);

  const router = useRouter();

  return (
    <div className="flex flex-col h-full w-full px-3 sm:px-5 ">
      {/*SEO Support*/}
      <Helmet>
        <title>Profile | Smart Tipz</title>
      </Helmet>
      {/*SEO Support End */}

      {/* section starts here*/}
      <div className="flex items-center bg-white space-x-10 p-5 w-full py-3">
        <Button
          onSubmit={() => router.back()}
          type="button"
          childrens={
            <>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="pr-2">Back</span>
            </>
          }
          classNames={
            "px-3 cursor-pointer py-2 flex justify-center items-center text-white text-md font-semibold primary-btn rounded-full"
          }
        />
      </div>
      <hr />
      {/* section ends here*/}
      {/* section starts here*/}
      <div className="md:hidden flex flex-col w-full">
        <ProfileCard
          data={profile}
          followed={followed}
          followers={followers}
          website={website || ""}
          handleShowBusinessCard={handleShowBusinessCard}
          showBusinessCard={showBusinessCard}
          _rating={profileRating}
        />
      </div>
      <div className="hidden md:flex flex-row w-full h-auto">
        <div className="flex w-1/6 px-2 py-1">
          {picture ? (
            <img
              src={picture}
              alt="profile"
              className="rounded-2xl w-30 h-40"
            />
          ) : (
            <img
              src="https://thumbs.dreamstime.com/b/solid-purple-gradient-user-icon-web-mobile-design-interface-ui-ux-developer-app-137467998.jpg"
              alt=""
              className="rounded-full"
            />
          )}
        </div>
        <div className="flex flex-col w-4/6 md:w-5/6 ">
          {/* section starts here */}
          <div className="flex flex-row lg:justify-between px-2 ">
            <div className="flex flex-col w-full lg:w-1/2">
              <div className="flex justify-between items-start lg:items-end w-full md:w-2/3">
                <h1 className=" text-md lg:text-2xl font-semibold">
                  {accountType === "Personal"
                    ? showName
                      ? name
                      : showUsername
                      ? username
                      : ""
                    : name}
                </h1>
              </div>
              <h2 className="text-sm text-gray-500">{phone}</h2>
             
              <div className="flex lg:flex-row lg:justify-between w-full md:max-w-xs mt-1">
                <span className="flex w-full items-center">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                      fillRule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  &nbsp;<p className="text-xs">{views} Views</p>
                </span>
                <span className="flex w-full items-center">
                 
                      <CustomStar value={profileRating || 0} isHalf={true} /> &nbsp;
                      <p className="text-xs"> Rating </p>
                  
                </span>
              </div>
              <div className="flex w-full mt-2 px-2">
                {about ? (
                  <p className="text-sm break-words md:max-w-xs">{about}</p>
                ) : (
                  <p className="text-sm text-gray-400">
                    {" "}
                    {accountType === "Business" ? "Intro" : "About"}
                  </p>
                )}
              </div>
            </div>
            {}
            <div className="flex flex-col  lg:w-1/2">
              <div className="flex lg:justify-end space-x-10">
                <div className="flex flex-col">
                  <h1 className="text-md lg:text-3xl font-semibold text-center">
                    {followers?.length}
                  </h1>
                  <h2 className="text-sm text-black">Followers</h2>
                </div>
                <div className="flex flex-col ">
                  <h1 className=" text-md lg:text-3xl font-semibold text-center">
                    {followed?.length}
                  </h1>
                  <h2 className="text-sm  text-black">Following</h2>
                </div>
              </div>
            </div>
            <div></div>
          </div>
          {/* section ends here */}

          {accountType === "Business" && (
            <div
              className="flex w-full mt-2 px-2 "
              onClick={handleShowBusinessCard}
            >
              <p className="text-xs font-medium no-underline hover:underline text cursor-pointer">
                Contact details
              </p>
            </div>
          )}
        </div>
      </div>
      {/* section ends here */}
      {/* section starts here */}
      {accountType === "Business" && (
        <>
         
          <div className="flex flex-col w-full px-2 mt-4">
            <h1 className="text-md font-medium">My Catalogue</h1>
            {fetchingCatalogues ? (
              <div className="flex flex-col items-center w-full justify-center">
                  <p className="text-sm text-gray-400"> Loading Catalogues</p>
                  <div className=" ml-3 loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6 "></div>
              </div>
            ) : isEmpty(catalogues) ? (
              <div className="flex w-full justify-center items-center">
                <p className="text-gray-500"> No Catalogues Yet</p>
              </div>
            ) : (
              <div className=" w-auto mt-6 relative">
                <Carousel>
                  {catalogues.map((item, index) => {
                    const {
                      id: postId,
                      isLiked,
                      likeCount,
                      shareCount,
                      commentCount,
                      avgRating,
                      totalRaters,
                      Video: {
                        id,
                        UserId,
                        title,
                        url,
                        mediaType,
                        thumbnail,
                        catalogue,
                        description,
                        User,
                        videoType,
                        videoCost,
                        Shares,
                        productLink,
                        createdAt,
                        views
                      },
                    } = item;
                    return (
                      <div key={index} className="my-2 px-5">
                        <NewsfeedCard
                          id={postId}
                          videoId={id}
                          UserId={UserId}
                          index={index}
                          catalogue={catalogue}
                          url={url}
                          User={User}
                          Shares={Shares}
                          views={views}
                          createdAt={createdAt}
                          posts={catalogues}
                          isLiked={isLiked}
                          likeCount={likeCount}
                          shareCount={shareCount}
                          commentCount={commentCount}
                          mediaType={mediaType}
                          avgRating={avgRating}
                          videoType={videoType}
                          videoCost={videoCost}
                          description={description}
                          title={title}
                          productLink={productLink}
                          width={"max-w-xs"}
                          thumbnail={thumbnail}
                        />
                      </div>
                    );
                  })}
                </Carousel>
              </div>
            )}
          </div>
        </>
      )}
      {/* section ends here */}
      {/* section starts here */}
      <div className="flex flex-col w-full px-2  mt-8">
        <h1 className="text-md font-medium">Videos</h1>
        {fetchingMyVideos ? (
          <div className="flex flex-col w-full justify-center items-center">
              <p className="text-sm text-gray-400"> Loading Videos</p>
            
              <div className=" ml-3 loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6 "></div>
            
          </div>
        ) : isEmpty(myVideos) ? (
          <div className="flex w-full justify-center items-center">
            <p className="text-gray-500"> No Videos Yet</p>
          </div>
        ) : (
          <div className="w-full mt-6 justify-center lg:justify-start">
            <Carousel>
              {myVideos.map((item, index) => {
                const {
                  id: postId,
                  isLiked,
                  likeCount,
                  shareCount,
                  commentCount,
                  avgRating,
                  totalRaters,
                  Video: {
                    id,
                    UserId,
                    title,
                    url,
                    mediaType,
                    thumbnail,
                    catalogue,
                    description,
                    User,
                    videoType,
                    videoCost,
                    Shares,
                    productLink,
                    createdAt,
                    views
                  },
                } = item;
                return (
                  <div key={index} className="my-2 px-5">
                    <NewsfeedCard
                      id={postId}
                      videoId={id}
                      UserId={UserId}
                      index={index}
                      catalogue={catalogue}
                      url={url}
                      User={User}
                      Shares={Shares}
                      views={views}
                      createdAt={createdAt}
                      // rating={2.5}
                      mediaType={mediaType}
                      videoCost={videoCost}
                      videoType={videoType}
                      description={description}
                      isLiked={isLiked}
                      avgRating={avgRating}
                      likeCount={likeCount}
                      commentCount={commentCount}
                      shareCount={shareCount}
                      title={title}
                      isPost={true}
                      width={"max-w-xs"}
                      productLink={productLink}
                      thumbnail={thumbnail}
                    />
                  </div>
                );
              })}
            </Carousel>
          </div>
        )}
      </div>
      {/* section ends here */}
      {/* section starts here */}
      {accountType === "Business" && (
        <div className="flex flex-col w-full px-2  mt-8">
          <h1 className="text-md font-medium">Customer Testimonials</h1>
          <div className="flex flex-col w-full mt-6 justify-center lg:justify-start space-y-4">
            <div className="flex w-full justify-center">
              <Button
                // onSubmit={_AddTestimonial}
                type="button"
                disable={true}
                childrens={"Request Testimonial"}
                classNames={
                  "px-3 py-2 flex justify-center items-center text-white text-sm btn-disable rounded-md "
                }
              />
            </div>
            {showRequestTestimonial && (
              <form onSubmit={formik.handleSubmit}>
                <div className="flex flex-col sm:flex-row w-full p-2 ease-in-out transition-all justify-center bg-gray-50">
                  <div className="flex flex-col w-full sm:w-3/4">
                    <InputField
                      name={"email"}
                      type={"text"}
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.email && formik.errors.email}
                      svg={
                        <svg
                          className="w-6 h-6 text-gray-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      }
                      inputClass={`${getInputClasses(
                        formik,
                        "email"
                      )} border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3  h-12`}
                      label={"Email"}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <div className="text-red-700 text-sm mb-4">
                        {formik.errors.email}
                      </div>
                    ) : null}
                  </div>
                  <Button
                    type="submit"
                    childrens={"Send Email"}
                    classNames={
                      "px-3 py-2 flex h-auto sm:h-12 justify-center items-center text-white text-sm btn rounded-md "
                    }
                    loading={loading}
                  />
                </div>
              </form>
            )}
            {loadingTestimonial ? (
              <div className="flex flex-col w-full justify-center items-center">
                  <p className="text-sm text-gray-400"> Loading Testimonials</p>
                <div className=" ml-3 loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6 "></div>
                
              </div>
            ) : isEmpty(filteredTestimonial) ? (
              <div className="flex w-full justify-center items-center">
                <p className="text-gray-500"> No Testimonials Yet</p>
              </div>
            ) : (
              <InfiniteScroll
                dataLength={filteredTestimonial?.length} //This is important field to render the next data
                next={fetchMoreData}
                hasMore={hasMore}
                loader={
                  <div className="flex justify-center items-center w-full">
                    <CustomLoader />
                  </div>
                }
                endMessage={
                  <p style={{ textAlign: "center" }}>
                    <b>Yay! You have seen it all</b>
                  </p>
                }
              >
                <div className="flex flex-col sm:grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
                  {filteredTestimonial.map(
                    (
                      {
                        id,
                        picture,
                        ownerName,
                        designation,
                        description,
                        isVisible,
                      },
                      index
                    ) => (
                      <div key={index}>
                        <TestimonialCard
                          _Toggle={() => _EditTestimonial(id, isVisible)}
                          // _Edit={_EditTestimonial}
                          // _Delete={_DeleteTestimonial}
                          image={picture}
                          name={ownerName}
                          designation={designation}
                          description={description}
                          checked={isVisible}
                          index={index}
                          // data={res}
                        />
                      </div>
                    )
                  )}
                </div>
              </InfiniteScroll>
            )}
          </div>
        </div>
      )}
      {showBusinessCard && (
        <div className="hidden md:flex">
          <PopupBusinessCard
            _ShowCard={handleShowBusinessCard}
            name={name}
            image={picture}
            website={website || ""}
            email={email}
            phone={phone}
          />
        </div>
      )}

   
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const {
    query: { username },
  } = context;
  const { token } = parseCookies(context);
  if (!token)
    return {
      redirect: {
        permanent: false,
        destination: "/auth/login",
      },
      props: {},
    };
  else {
    const res = await axios.get(
      `${process.env.BASE_URL}api/user/profile?username=${username}`,
      { headers: { Authorization: "Bearer " + token } }
    );
    const { data } = res.data;
    return {
      props: {
        profile: data,
      },
    };
  }
};

export default Profile;
