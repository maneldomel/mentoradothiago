/*
  # Create Admin User

  1. New Tables
    - `admin_users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `password_hash` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `admin_users` table
    - Add policy for authenticated users to read their own data

  3. Default Admin
    - Creates default admin user: admin@proaxion.com / admin123
*/

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users
CREATE POLICY "Admin users can read own data"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Insert default admin user
-- Note: In production, you should use Supabase Auth instead of storing passwords directly
INSERT INTO admin_users (email, password_hash) 
VALUES ('admin@proaxion.com', 'admin123')
ON CONFLICT (email) DO NOTHING;