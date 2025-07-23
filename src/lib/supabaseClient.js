import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ysbdzpuzhcoelscqyewm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzYmR6cHV6aGNvZWxzY3F5ZXdtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MzI3NTkzMSwiZXhwIjoyMDY4ODUxOTMxfQ._FGIk13MOKmuUCEyvOsN5o6dNN0NAA8WBWwvgv8EYlQ';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
