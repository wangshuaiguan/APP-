/*
  # Create todos table

  1. New Tables
    - `todos_64341`
      - `id` (primary key, uuid, default: gen_random_uuid())
      - `text` (text, not null)
      - `completed` (boolean, default: false)
      - `created_at` (timestamptz, default: now())

  2. Notes
    - This table stores todo items for the Chrome extension
    - The table name includes the suffix 64341 as per team naming conventions
*/

CREATE TABLE IF NOT EXISTS todos_64341 (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  text text NOT NULL,
  completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);