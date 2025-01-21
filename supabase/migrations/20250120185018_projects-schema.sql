drop table if exists Projects;
drop type if exists current_status;

create type current_status as enum ('in-progress', 'completed');

create table
  Projects (
    id bigint primary key generated always as identity not null,
    created_at timestamptz not null default now(),
    name text not null,
    slug text unique not null,
    description text,
    status current_status not null default 'in-progress'::current_status,
    collaborators text array default array[]::varchar[] not null 
  );
