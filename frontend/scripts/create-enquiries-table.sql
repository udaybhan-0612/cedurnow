-- Create the enquiries table
CREATE TABLE IF NOT EXISTS enquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  company VARCHAR(255) NOT NULL,
  employees VARCHAR(50),
  interest VARCHAR(100),
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on email for faster queries
CREATE INDEX IF NOT EXISTS idx_enquiries_email ON enquiries(email);

-- Create an index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON enquiries(created_at DESC);

-- Create an index on status for filtering
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries(status);

-- Add Row Level Security (RLS)
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to insert (for the public form)
CREATE POLICY "Anyone can insert enquiries" ON enquiries
  FOR INSERT WITH CHECK (true);

-- Create a policy for reading (you can modify this based on your auth requirements)
CREATE POLICY "Authenticated users can read enquiries" ON enquiries
  FOR SELECT USING (auth.role() = 'authenticated');

-- Add a trigger to update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_enquiries_updated_at
  BEFORE UPDATE ON enquiries
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
