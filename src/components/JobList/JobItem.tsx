import React, { useCallback, useEffect, useRef, useState } from "react";
import { IJob, DefaultJobPic } from "../../constants/types";
import { HeartIcon } from "@heroicons/react/24/outline";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {authAtom, favoriteJobsAtom, jobOnPreviewIDAtom} from "../../constants/atoms";
import JobDescription from "../JobDescription/JobDescription";
import JobLabel from "./JobLabel";
import { getAccessToken, useWindowDimensions } from "../../scripts/utils";
import { useNavigate } from "react-router";

type JobItemProps = {
  job: IJob;
  cb?: (jobId: number) => void;
  showControls?: boolean;
};

const JobItem = (props: JobItemProps) => {
  const { job, cb, showControls } = props;
  const jobOnPreviewSetter = useSetRecoilState(jobOnPreviewIDAtom);
  const jobOnPreviewId = useRecoilValue(jobOnPreviewIDAtom);
  const [previewed, setPreviewed] = useState<boolean>(false);
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const [favoriteJobs, setFavoriteJobs] = useRecoilState(favoriteJobsAtom)
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
  const { isAuthenticated } = useRecoilValue(authAtom);
  const jobItemRef = useRef<HTMLDivElement>(null);
  const { width } = useWindowDimensions();
  const navigate = useNavigate();

  const getMatchColor = (match: number) => {
    // return hexcolor based on match percentage return a darker and lighter shade of the same color
    if (match < 25) {
      return ['#FF4D4F', '#ffbab8'];
    } else if (match < 50) {
      return ['#c95a2d', '#ffc7ab'];
    } else if (match < 75) {
      return ['#e19b12', '#ffebbd'];
    } else {
      return ['#3c9a10', '#d8ffc1'];
    }
  }

  useEffect(() => {
    localStorage.setItem('favs', JSON.stringify(favoriteJobs));
  }, [favoriteJobs]);

  useEffect(() => {
    let favs: string | null = localStorage.getItem("favs");
    let favsArray: number[] = [];

    if (favs !== null) {
      favsArray = JSON.parse(favs);
    }

    const idx = favsArray.indexOf(job.id);
    setIsFavourite(idx >= 0);
  }, []);

  useEffect(() => {
    //Changes the jobOnPreview
    setPreviewed(jobOnPreviewId == job.id);
    //Scrolls on top of the job item when the job is previewed after 500ms
    const timer = setTimeout(() => {
      if (previewed && jobItemRef.current && width <= 1060) {
        // jobItemRef.current.scrollIntoView({behavior: "smooth"})
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [jobOnPreviewId]);

  const setJobOnPreview = useCallback(() => {
    if (cb) {
      cb(job.id);
    } else {
      //Sets the new jobOnPreviewID
      jobOnPreviewSetter(() => job.id);
    }
  }, [job.id, jobOnPreviewSetter]);

  const onDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
  };

  const onToggleShowConfirmDelete = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setShowConfirmDelete(!showConfirmDelete);
  };

  const JobItemBorder = () => {
    if (showControls || !previewed) {
      return "hover:border-gray-300 border-transparent";
    }
    return "border-gray-400 drop-shadow-md";
  };

  function toggleFavourite(
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    id: number
  ): void {
    e.stopPropagation();

    let favs: string | null = localStorage.getItem("favs");
    let favsArray: number[] = [];

    if (favs !== null) {
      favsArray = JSON.parse(favs);
    }

    const idx = favsArray.indexOf(id);

    if (idx >= 0) {
      favsArray.splice(idx, 1);
    } else {
      favsArray.push(id);
    }

    localStorage.setItem("favs", JSON.stringify(favsArray));
    setIsFavourite(!isFavourite);
    setFavoriteJobs(favsArray)
  }

  return (
    <>
      <div
        ref={jobItemRef}
        onClick={setJobOnPreview}
        className="cursor-pointer w-full"
      >
        <div
          className={`h-fit bg-white overflow-visible transition-[border-color] transition-shadow ${JobItemBorder()} border-[1px] p-6 duration-100 ease-linear`}
        >
          <div className="logo-top h-8 flex items-center gap-3">
            <img
              alt="Job Logo"
              src={job.company_logo || DefaultJobPic}
              className="w-8 h-8 object-cover"
            />
            <div className="w-full flex flex-col ss:gap-1.5 ss:flex-row ss:items-center overflow-hidden ">
              <div className="job-title font-normal text-[#3F3F46] text-base sm:leading-5 whitespace-nowrap overflow-hidden overflow-ellipsis">
                {job.company || job.employer_profile?.company || ""}
              </div>
              <div className="hidden ss:block relative top-[1px] job-location font-normal text-[#A1A1AA] text-xs">
                •
              </div>
              <div className="relative top-[1px] job-location font-normal text-[#A1A1AA] text-xs whitespace-nowrap overflow-hidden overflow-ellipsis">
                {job.street_address}
              </div>
            </div>
            { isAuthenticated && <div className=" text-xs px-2 py-1 whitespace-nowrap rounded-md" style={{
                color: getMatchColor(job.match || 0)[0],
                backgroundColor: getMatchColor(job.match || 0)[1]
              }}
            >
            {job.match} % Match</div>}
            <div className={`text-xs px-2 py-1 rounded-md ml-auto whitespace-nowrap`}
              style={{
                color: job.id < 4 ? '#2563EB' : '#A1A1AA',
                backgroundColor: job.id < 4 ? '#E5EDFF' : '#F4F4F5'
              }}
            >
              {job.id < 4 ? "New" : "1 d"}
            </div>
          </div>
          <div className="job-title overflow-ellipsis overflow-hidden mt-2 text-lg font-bold">
            {job.title}
          </div>
          <div className="job-description text-sm text-[#71717A]">
            {job.short_description}
          </div>
          <div className="relative mt-2 items-center flex flex-row gap-2">
            {job.types &&
              job.types.map((type, index) => (
                <JobLabel key={index} jobType={type} />
              ))}
            {showControls && (
              <div className="ml-auto">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/job/edit/${job.id}`);
                  }}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => onToggleShowConfirmDelete(e)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
                >
                  Delete
                </button>
                {showConfirmDelete && (
                  <div className="absolute top-[25px] right-[9px] p-4 z-50">
                    <div className="relative w-full h-full max-w-md md:h-auto border-gray-400 drop-shadow-md overflow-hidden">
                      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700  w-[250px]">
                        <div className="px-6 py-6 lg:px-8">
                          <p className="mb-4 text-l font-medium text-gray-900 ">
                            Confirm Job Deletion
                          </p>
                          <div className="space-y-6">
                            <div>
                              <div className="flex justify-around">
                                <button
                                  onClick={(e) => onDelete(e)}
                                  className="text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                >
                                  Yes
                                </button>
                                <button
                                  onClick={(e) => onToggleShowConfirmDelete(e)}
                                  className="text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                >
                                  No
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            {!showControls && (
              <HeartIcon
                onClick={(e) => toggleFavourite(e, job.id)}
                className={
                  isFavourite ? "h-4 ml-auto fill-red-500" : "h-4 ml-auto"
                }
              />
            )}
          </div>
        </div>
        <JobDescription job={job} isFromJobItem={false} />
      </div>
    </>
  );
};

export default JobItem;
