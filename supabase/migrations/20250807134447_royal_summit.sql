/*
  # Create testimonials table for admin management

  1. New Tables
    - `testimonials`
      - `id` (uuid, primary key)
      - `name` (text, customer name)
      - `city` (text, customer city)
      - `state` (text, customer state)
      - `avatar_url` (text, avatar image URL)
      - `youtube_url` (text, YouTube video URL)
      - `caption` (text, testimonial caption)
      - `is_active` (boolean, whether testimonial is displayed)
      - `display_order` (integer, order of display)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `testimonials` table
    - Add policy for public read access
    - Add policy for authenticated admin access
*/

CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  avatar_url text NOT NULL,
  youtube_url text NOT NULL,
  caption text NOT NULL,
  is_active boolean DEFAULT true,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Allow public read access to active testimonials
CREATE POLICY "Public can read active testimonials"
  ON testimonials
  FOR SELECT
  TO anon
  USING (is_active = true);

-- Allow authenticated users to manage testimonials (admin access)
CREATE POLICY "Authenticated users can manage testimonials"
  ON testimonials
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert default testimonials
INSERT INTO testimonials (name, city, state, avatar_url, youtube_url, caption, display_order) VALUES
('Michael Rodriguez', 'Phoenix', 'AZ', 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'After 3 years of struggling, Proaxion gave me my confidence back. My wife and I couldn''t be happier with the results!', 1),
('David Thompson', 'Austin', 'TX', 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'I was skeptical at first, but within 2 weeks of using Proaxion, I noticed incredible improvements. This product changed my life!', 2),
('Robert Chen', 'Miami', 'FL', 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'At 52, I thought my best days were behind me. Proaxion proved me wrong - I feel like I''m 30 again!', 3);