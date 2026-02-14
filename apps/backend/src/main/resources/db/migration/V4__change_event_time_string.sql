-- Change event time from TIME to VARCHAR to support ranges (e.g., 18:00 - 23:00)
ALTER TABLE events ALTER COLUMN time TYPE VARCHAR(100);
