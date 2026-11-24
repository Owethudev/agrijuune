alter table public.enquiries
  add column idempotency_key_hash text,
  add column idempotency_request_hash text,
  add constraint enquiries_idempotency_hash_pair_check
    check (
      (
        idempotency_key_hash is null
        and idempotency_request_hash is null
      )
      or (
        idempotency_key_hash is not null
        and idempotency_request_hash is not null
        and idempotency_key_hash ~ '^[0-9a-f]{64}$'
        and idempotency_request_hash ~ '^[0-9a-f]{64}$'
      )
    );

create unique index enquiries_idempotency_key_hash_idx
  on public.enquiries (idempotency_key_hash)
  where idempotency_key_hash is not null;
