create extension if not exists pg_cron;

select cron.unschedule(jobid)
from cron.job
where jobname = 'purge-expired-enquiries';

select cron.schedule(
  'purge-expired-enquiries',
  '0 2 * * *',
  'delete from public.enquiries where created_at < now() - interval ''7 days'''
);
