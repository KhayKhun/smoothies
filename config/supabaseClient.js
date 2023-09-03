import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
console.log(process.env.SUPABASE_URL)
const supabase = createClient(
    'https://ljxtjaelogodwobtnlpt.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxqeHRqYWVsb2dvZHdvYnRubHB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM2ODkzMjcsImV4cCI6MjAwOTI2NTMyN30.xohqB9VmskYkZIR9G4LX5QDOemE6NIFQVQJI6H_kAro'
    )

export default supabase;