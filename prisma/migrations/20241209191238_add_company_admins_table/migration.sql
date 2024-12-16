-- CreateTable
CREATE TABLE `users` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password_hash` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(100) NOT NULL,
    `last_name` VARCHAR(100) NOT NULL,
    `role` ENUM('ADMIN', 'APPLICANT', 'COMPANY_ADMIN', 'INTERVIEWER') NOT NULL DEFAULT 'APPLICANT',
    `phone` VARCHAR(20) NULL,
    `profile_picture` VARCHAR(255) NULL,
    `profession` VARCHAR(100) NULL,
    `location` VARCHAR(255) NULL,
    `bio` TEXT NULL,
    `experience_years` VARCHAR(20) NULL,
    `education` VARCHAR(255) NULL,
    `languages` VARCHAR(255) NULL,
    `resume_url` VARCHAR(255) NULL,
    `linkedin_url` VARCHAR(255) NULL,
    `github_url` VARCHAR(255) NULL,
    `website` VARCHAR(255) NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` TIMESTAMP NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    INDEX `idx_email`(`email`),
    INDEX `idx_role`(`role`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `companies` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `logo_url` VARCHAR(255) NULL,
    `website` VARCHAR(255) NULL,
    `industry` VARCHAR(100) NULL,
    `company_size` VARCHAR(50) NULL,
    `founded_year` YEAR NULL,
    `location` VARCHAR(255) NULL,
    `is_verified` BOOLEAN NOT NULL DEFAULT false,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` TIMESTAMP NOT NULL,

    INDEX `idx_name`(`name`),
    INDEX `idx_industry`(`industry`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `company_admins` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT UNSIGNED NOT NULL,
    `company_id` BIGINT UNSIGNED NOT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `idx_user_id`(`user_id`),
    INDEX `idx_company_id`(`company_id`),
    UNIQUE INDEX `company_admins_user_id_company_id_key`(`user_id`, `company_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `job_posts` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `company_id` BIGINT UNSIGNED NOT NULL,
    `created_by` BIGINT UNSIGNED NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `requirements` TEXT NOT NULL,
    `responsibilities` TEXT NOT NULL,
    `location_type` ENUM('REMOTE', 'HYBRID', 'ON_SITE') NOT NULL,
    `location` VARCHAR(255) NULL,
    `employment_type` ENUM('FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP') NOT NULL,
    `experience_level` ENUM('ENTRY', 'MID', 'SENIOR', 'LEAD', 'EXECUTIVE') NOT NULL,
    `salary_min` DECIMAL(12, 2) NULL,
    `salary_max` DECIMAL(12, 2) NULL,
    `salary_currency` CHAR(3) NULL,
    `status` ENUM('DRAFT', 'PUBLISHED', 'CLOSED', 'ARCHIVED') NOT NULL DEFAULT 'DRAFT',
    `application_deadline` DATE NOT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` TIMESTAMP NOT NULL,

    INDEX `idx_status`(`status`),
    INDEX `idx_deadline`(`application_deadline`),
    INDEX `idx_location_type`(`location_type`),
    INDEX `idx_employment_type`(`employment_type`),
    INDEX `idx_created_by`(`created_by`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `job_skills` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `job_post_id` BIGINT UNSIGNED NOT NULL,
    `skill_name` VARCHAR(100) NOT NULL,
    `is_required` BOOLEAN NOT NULL DEFAULT true,

    INDEX `idx_skill_name`(`skill_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `applications` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `job_post_id` BIGINT UNSIGNED NOT NULL,
    `applicant_id` BIGINT UNSIGNED NOT NULL,
    `status` ENUM('PENDING', 'REVIEWING', 'SHORTLISTED', 'INTERVIEWING', 'OFFERED', 'ACCEPTED', 'REJECTED', 'WITHDRAWN') NOT NULL DEFAULT 'PENDING',
    `cover_letter` TEXT NULL,
    `resume_version` VARCHAR(255) NOT NULL,
    `current_stage` ENUM('INITIAL_REVIEW', 'TECHNICAL_ASSESSMENT', 'FIRST_INTERVIEW', 'SECOND_INTERVIEW', 'FINAL_INTERVIEW', 'OFFER', 'COMPLETED') NOT NULL DEFAULT 'INITIAL_REVIEW',
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` TIMESTAMP NOT NULL,

    INDEX `idx_status`(`status`),
    INDEX `idx_current_stage`(`current_stage`),
    UNIQUE INDEX `applications_job_post_id_applicant_id_key`(`job_post_id`, `applicant_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `interviews` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `application_id` BIGINT UNSIGNED NOT NULL,
    `interviewer_id` BIGINT UNSIGNED NOT NULL,
    `type` ENUM('PHONE', 'VIDEO', 'ON_SITE', 'TECHNICAL') NOT NULL,
    `scheduled_at` DATETIME NOT NULL,
    `duration_minutes` INTEGER NOT NULL,
    `location` VARCHAR(255) NULL,
    `meeting_link` VARCHAR(255) NULL,
    `notes` TEXT NULL,
    `reschedule_count` TINYINT UNSIGNED NOT NULL DEFAULT 0,
    `status` ENUM('SCHEDULED', 'COMPLETED', 'CANCELLED', 'RESCHEDULED') NOT NULL DEFAULT 'SCHEDULED',
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` TIMESTAMP NOT NULL,

    INDEX `idx_scheduled_at`(`scheduled_at`),
    INDEX `idx_status`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `interview_feedback` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `interview_id` BIGINT UNSIGNED NOT NULL,
    `technical_score` TINYINT NULL,
    `communication_score` TINYINT NULL,
    `cultural_fit_score` TINYINT NULL,
    `overall_score` TINYINT NULL,
    `strengths` TEXT NULL,
    `weaknesses` TEXT NULL,
    `recommendation` ENUM('STRONG_YES', 'YES', 'MAYBE', 'NO', 'STRONG_NO') NOT NULL,
    `notes` TEXT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` TIMESTAMP NOT NULL,

    UNIQUE INDEX `interview_feedback_interview_id_key`(`interview_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stage_transitions` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `application_id` BIGINT UNSIGNED NOT NULL,
    `from_stage` ENUM('INITIAL_REVIEW', 'TECHNICAL_ASSESSMENT', 'FIRST_INTERVIEW', 'SECOND_INTERVIEW', 'FINAL_INTERVIEW', 'OFFER', 'COMPLETED') NOT NULL,
    `to_stage` ENUM('INITIAL_REVIEW', 'TECHNICAL_ASSESSMENT', 'FIRST_INTERVIEW', 'SECOND_INTERVIEW', 'FINAL_INTERVIEW', 'OFFER', 'COMPLETED') NOT NULL,
    `transitioned_by` BIGINT UNSIGNED NOT NULL,
    `notes` TEXT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `idx_application_stage`(`application_id`, `to_stage`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `company_admins` ADD CONSTRAINT `company_admins_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `company_admins` ADD CONSTRAINT `company_admins_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `job_posts` ADD CONSTRAINT `job_posts_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `job_skills` ADD CONSTRAINT `job_skills_job_post_id_fkey` FOREIGN KEY (`job_post_id`) REFERENCES `job_posts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `applications` ADD CONSTRAINT `applications_job_post_id_fkey` FOREIGN KEY (`job_post_id`) REFERENCES `job_posts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `applications` ADD CONSTRAINT `applications_applicant_id_fkey` FOREIGN KEY (`applicant_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `interviews` ADD CONSTRAINT `interviews_application_id_fkey` FOREIGN KEY (`application_id`) REFERENCES `applications`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `interviews` ADD CONSTRAINT `interviews_interviewer_id_fkey` FOREIGN KEY (`interviewer_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `interview_feedback` ADD CONSTRAINT `interview_feedback_interview_id_fkey` FOREIGN KEY (`interview_id`) REFERENCES `interviews`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stage_transitions` ADD CONSTRAINT `stage_transitions_application_id_fkey` FOREIGN KEY (`application_id`) REFERENCES `applications`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stage_transitions` ADD CONSTRAINT `stage_transitions_transitioned_by_fkey` FOREIGN KEY (`transitioned_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
