-- Test Data for JobScoutAI Database
USE jobscoutai;

-- Insert Companies
INSERT INTO companies (name, description, logo_url, website, industry, company_size, founded_year, location, is_verified, created_at, updated_at) VALUES
('TechCorp', 'Leading technology company', 'https://example.com/logo1.png', 'https://techcorp.com', 'Technology', '1000+', 2010, 'San Francisco, CA', true, NOW(), NOW()),
('DesignStudio', 'Creative design agency', 'https://example.com/logo2.png', 'https://designstudio.com', 'Design', '50-200', 2015, 'New York, NY', true, NOW(), NOW()),
('DataTech', 'Data analytics company', 'https://example.com/logo3.png', 'https://datatech.com', 'Technology', '200-500', 2012, 'Boston, MA', true, NOW(), NOW());

-- Insert Users (Passwords are hashed version of "password123")
INSERT INTO users (email, password, first_name, last_name, role, phone, profile_picture, resume_url, linkedin_url, github_url, is_active, created_at, updated_at) VALUES
('john@example.com', '$2a$10$xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 'John', 'Doe', 'APPLICANT', '+1234567890', 'https://example.com/profile1.jpg', 'https://example.com/resume1.pdf', 'https://linkedin.com/in/johndoe', 'https://github.com/johndoe', true, NOW(), NOW()),
('jane@example.com', '$2a$10$xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 'Jane', 'Smith', 'APPLICANT', '+1234567891', 'https://example.com/profile2.jpg', 'https://example.com/resume2.pdf', 'https://linkedin.com/in/janesmith', 'https://github.com/janesmith', true, NOW(), NOW()),
('admin@techcorp.com', '$2a$10$xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 'Admin', 'User', 'ADMIN', '+1234567892', NULL, NULL, NULL, NULL, true, NOW(), NOW());

-- Insert Job Posts
INSERT INTO job_posts (id, company_id, title, description, requirements, responsibilities, location_type, location, employment_type, experience_level, salary_min, salary_max, salary_currency, status, application_deadline, created_at, updated_at) VALUES
('job1', 'comp1', 'Senior Frontend Developer', 'Exciting opportunity for a senior frontend developer', 'React, TypeScript, 5+ years experience', 'Lead frontend development, mentor junior developers', 'REMOTE', NULL, 'FULL_TIME', 'SENIOR', 120000.00, 150000.00, 'USD', 'PUBLISHED', DATE_ADD(NOW(), INTERVAL 30 DAY), NOW(), NOW()),
('job2', 'comp2', 'UI/UX Designer', 'Join our creative design team', 'Figma, Adobe Suite, 3+ years experience', 'Design user interfaces, create prototypes', 'HYBRID', 'New York, NY', 'FULL_TIME', 'MID', 90000.00, 120000.00, 'USD', 'PUBLISHED', DATE_ADD(NOW(), INTERVAL 30 DAY), NOW(), NOW());

-- Insert Job Skills
INSERT INTO job_skills (id, job_post_id, skill_name, is_required) VALUES
('skill1', 'job1', 'React', true),
('skill2', 'job1', 'TypeScript', true),
('skill3', 'job1', 'Next.js', false),
('skill4', 'job2', 'Figma', true),
('skill5', 'job2', 'Adobe XD', true);

-- Insert Applications
INSERT INTO applications (id, job_post_id, applicant_id, status, cover_letter, resume_version, current_stage, created_at, updated_at) VALUES
('app1', 'job1', 'user1', 'REVIEWING', 'I am excited to apply...', 'v1', 'INITIAL_REVIEW', NOW(), NOW()),
('app2', 'job2', 'user2', 'SHORTLISTED', 'I would love to join...', 'v1', 'TECHNICAL_ASSESSMENT', NOW(), NOW());

-- Insert Interviews
INSERT INTO interviews (id, application_id, interviewer_id, type, scheduled_at, duration_minutes, location, meeting_link, notes, status, created_at, updated_at) VALUES
('int1', 'app1', 'admin1', 'TECHNICAL', DATE_ADD(NOW(), INTERVAL 7 DAY), 60, NULL, 'https://meet.example.com/int1', 'Technical interview for frontend position', 'SCHEDULED', NOW(), NOW());

-- Insert Interview Feedback
INSERT INTO interview_feedback (id, interview_id, technical_score, communication_score, cultural_fit_score, overall_score, strengths, weaknesses, recommendation, notes, created_at, updated_at) VALUES
('feed1', 'int1', 4, 5, 4, 4, 'Strong technical skills, great communication', 'Could improve system design knowledge', 'YES', 'Would be a great addition to the team', NOW(), NOW());

-- Insert Stage Transitions
INSERT INTO stage_transitions (id, application_id, from_stage, to_stage, transitioned_by, notes, created_at) VALUES
('trans1', 'app1', 'INITIAL_REVIEW', 'TECHNICAL_ASSESSMENT', 'admin1', 'Moving forward with technical assessment', NOW());