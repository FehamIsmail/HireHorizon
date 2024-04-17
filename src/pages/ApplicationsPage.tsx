import React, { useEffect, useState } from "react";
import { Document, IJob } from "../constants/types";
import JobsAppliedTo from "./JobsAppliedTo";
import ExpandableDiv from "../components/ExpandableDiv/ExpandableDiv";
import JobsView from "./JobView";

type extraJobInfo = {
  status: string;
  updated_at: Date;
}

export default function ApplicationsPage() {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [jobsInfo, setJobsInfo] = useState<extraJobInfo[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
      // setJobs(res.data?.map((d: any) => d.job));
      // setJobsInfo(res.data?.map((d: any) => ({status: d.status, updated_at: new Date(d.updated_at)})));
      // setDocuments(createDocuments(res.data))

  }, []);
  return (
    <div className="space-y-6 sm:px-6 md:col-span-9 md:px-0 mr-0 md:mr-4 mb-4">
    <div className="overflow-hidden bg-white shadow sm:rounded-md mt-4">
      <ul role="list" className="divide-y divide-gray-200">
        {jobs.map((job, i) => (
          <ExpandableDiv
            key={i}
            candidate={<JobsAppliedTo job={job} status={jobsInfo[i].status} updated_at={jobsInfo[i].updated_at} />}
            candidateDetail={
              <JobsView
                job={job}
                document={documents[i]}
              />
            }
          />
        ))}
      </ul>
    </div>
  </div>
  );
}
