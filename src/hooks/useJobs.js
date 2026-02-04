import { useState, useEffect } from 'react';
import { getJobsRequest } from '../api/jobs.api';

function useJobs(filters = {}, page = 1, limit = 20) {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [totalJobs, setTotalJobs] = useState(0);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        const response = await getJobsRequest({ ...filters, page, limit });
        
        setJobs(response.jobs || []);
        setTotalPages(response.totalPages || 0);
        setTotalJobs(response.total || 0);
        setError(null);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError(err.message);
        setJobs([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, [filters, page, limit]);

  return { jobs, isLoading, error, totalPages, totalJobs };
}

export default useJobs;