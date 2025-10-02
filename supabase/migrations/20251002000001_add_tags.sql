create table public.tags (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  constraint unique_user_tag unique (user_id, name)
);

create table public.plr_file_tags (
  id uuid default gen_random_uuid() primary key,
  file_path text not null,
  tag_id uuid references public.tags(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  constraint unique_file_tag unique (file_path, tag_id)
);

create index idx_tags_user_id on public.tags(user_id);
create index idx_tags_name on public.tags(name);
create index idx_plr_file_tags_file_path on public.plr_file_tags(file_path);
create index idx_plr_file_tags_tag_id on public.plr_file_tags(tag_id);
create index idx_plr_file_tags_user_id on public.plr_file_tags(user_id);