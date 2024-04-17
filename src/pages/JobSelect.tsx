import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { getAccessToken } from "../scripts/utils";
import { JobType } from "../constants/types";
import { jobListAtom } from "../constants/atoms";
import JobList from "../components/JobList/JobList";
import { useNavigate } from "react-router";

type JobSelectProps = {
    pathSegment : string
}

export default function JobSelect(props:JobSelectProps) {
  const jobListSetter = useSetRecoilState(jobListAtom);
  const navigate = useNavigate();

  useEffect(() => {



  }, []);


  return (
    <div className="space-y-6 sm:px-6 md:col-span-9 md:px-0 mr-0 md:mr-4 mb-4">
      <div className="overflow-y-visible bg-white shadow sm:rounded-md mt-4">
        <JobList cb={jobId => navigate(`/job/${props.pathSegment}/${jobId}`)} showControls />
      </div>
    </div>
  );
}
