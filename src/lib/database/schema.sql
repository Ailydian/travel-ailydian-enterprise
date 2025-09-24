-- Global Tourism Review Platform Database Schema
-- Supports TripAdvisor & Google My Business integration

-- Countries table with multi-language support
CREATE TABLE countries (
    id SERIAL PRIMARY KEY,
    code VARCHAR(2) UNIQUE NOT NULL, -- ISO country code
    name JSONB NOT NULL, -- Multi-language names {"en": "Turkey", "tr": "Türkiye", "de": "Türkei"}
    continent VARCHAR(50) NOT NULL,
    currency_code VARCHAR(3),
    phone_code VARCHAR(10),
    timezone VARCHAR(50),
    lat DECIMAL(10, 8),
    lng DECIMAL(11, 8),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cities table with multi-language support
CREATE TABLE cities (
    id SERIAL PRIMARY KEY,
    country_id INTEGER REFERENCES countries(id),
    name JSONB NOT NULL, -- Multi-language names
    slug VARCHAR(255) UNIQUE NOT NULL, -- For SEO URLs
    description JSONB, -- Multi-language descriptions
    population INTEGER,
    lat DECIMAL(10, 8) NOT NULL,
    lng DECIMAL(11, 8) NOT NULL,
    timezone VARCHAR(50),
    popular_rank INTEGER DEFAULT 0, -- For trending/popular sorting
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Location categories (restaurants, hotels, attractions, etc.)
CREATE TABLE location_categories (
    id SERIAL PRIMARY KEY,
    name JSONB NOT NULL, -- Multi-language category names
    slug VARCHAR(100) UNIQUE NOT NULL,
    icon VARCHAR(50), -- Icon identifier
    parent_id INTEGER REFERENCES location_categories(id), -- For sub-categories
    sort_order INTEGER DEFAULT 0
);

-- Main locations table (restaurants, hotels, attractions, etc.)
CREATE TABLE locations (
    id SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES location_categories(id),
    city_id INTEGER REFERENCES cities(id),
    name JSONB NOT NULL, -- Multi-language names
    slug VARCHAR(255) UNIQUE NOT NULL, -- For SEO URLs
    description JSONB, -- Multi-language descriptions
    address JSONB, -- Multi-language addresses
    lat DECIMAL(10, 8) NOT NULL,
    lng DECIMAL(11, 8) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(255),
    website VARCHAR(500),
    price_range INTEGER DEFAULT 0, -- 1-4 scale
    
    -- Business hours (JSON format)
    opening_hours JSONB,
    
    -- Features/Amenities
    features JSONB, -- ["wifi", "parking", "pet_friendly"]
    
    -- External integrations
    google_place_id VARCHAR(255) UNIQUE,
    tripadvisor_id VARCHAR(255) UNIQUE,
    
    -- SEO and content
    seo_title JSONB,
    seo_description JSONB,
    meta_keywords JSONB,
    
    -- Status and moderation
    status VARCHAR(20) DEFAULT 'active', -- active, inactive, pending, blocked
    verified BOOLEAN DEFAULT FALSE,
    claimed BOOLEAN DEFAULT FALSE,
    claim_date TIMESTAMP,
    
    -- Statistics (updated via triggers)
    total_reviews INTEGER DEFAULT 0,
    average_rating DECIMAL(3, 2) DEFAULT 0,
    total_photos INTEGER DEFAULT 0,
    total_views INTEGER DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User accounts
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    avatar_url VARCHAR(500),
    bio JSONB, -- Multi-language bios
    
    -- Location info
    country_id INTEGER REFERENCES countries(id),
    city_id INTEGER REFERENCES cities(id),
    
    -- Preferences
    preferred_language VARCHAR(5) DEFAULT 'en',
    preferred_currency VARCHAR(3) DEFAULT 'USD',
    
    -- Authentication
    password_hash VARCHAR(255),
    email_verified BOOLEAN DEFAULT FALSE,
    email_verification_token VARCHAR(255),
    
    -- Social logins
    google_id VARCHAR(255) UNIQUE,
    facebook_id VARCHAR(255) UNIQUE,
    
    -- Status and reputation
    status VARCHAR(20) DEFAULT 'active',
    reputation_score INTEGER DEFAULT 0,
    total_reviews INTEGER DEFAULT 0,
    total_photos INTEGER DEFAULT 0,
    reviewer_level INTEGER DEFAULT 1, -- 1-10 based on contributions
    
    -- Privacy settings
    profile_public BOOLEAN DEFAULT TRUE,
    location_public BOOLEAN DEFAULT FALSE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);

-- Reviews and ratings
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    location_id INTEGER REFERENCES locations(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id),
    
    -- Review content
    title JSONB, -- Multi-language titles
    content JSONB NOT NULL, -- Multi-language content
    language VARCHAR(5) NOT NULL, -- Primary language of the review
    
    -- Ratings (1-5 scale)
    overall_rating INTEGER NOT NULL CHECK (overall_rating >= 1 AND overall_rating <= 5),
    service_rating INTEGER CHECK (service_rating >= 1 AND service_rating <= 5),
    food_rating INTEGER CHECK (food_rating >= 1 AND food_rating <= 5),
    atmosphere_rating INTEGER CHECK (atmosphere_rating >= 1 AND atmosphere_rating <= 5),
    value_rating INTEGER CHECK (value_rating >= 1 AND value_rating <= 5),
    cleanliness_rating INTEGER CHECK (cleanliness_rating >= 1 AND cleanliness_rating <= 5),
    
    -- Visit details
    visit_date DATE,
    visit_type VARCHAR(50), -- business, leisure, family, couple, solo
    
    -- Moderation and status
    status VARCHAR(20) DEFAULT 'active', -- active, pending, hidden, spam, deleted
    moderation_notes TEXT,
    flagged_count INTEGER DEFAULT 0,
    helpful_count INTEGER DEFAULT 0,
    
    -- External sync
    synced_to_google BOOLEAN DEFAULT FALSE,
    synced_to_tripadvisor BOOLEAN DEFAULT FALSE,
    google_review_id VARCHAR(255),
    tripadvisor_review_id VARCHAR(255),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Photos for locations and reviews
CREATE TABLE photos (
    id SERIAL PRIMARY KEY,
    location_id INTEGER REFERENCES locations(id) ON DELETE CASCADE,
    review_id INTEGER REFERENCES reviews(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id),
    
    -- Photo details
    url VARCHAR(500) NOT NULL,
    thumbnail_url VARCHAR(500),
    medium_url VARCHAR(500),
    filename VARCHAR(255),
    original_filename VARCHAR(255),
    file_size INTEGER,
    width INTEGER,
    height INTEGER,
    
    -- Content
    caption JSONB, -- Multi-language captions
    alt_text JSONB, -- Multi-language alt text for accessibility
    
    -- Categorization
    photo_type VARCHAR(50), -- exterior, interior, food, menu, amenity
    tags JSONB, -- ["outdoor seating", "breakfast", "view"]
    
    -- Status and moderation
    status VARCHAR(20) DEFAULT 'active',
    moderation_status VARCHAR(20) DEFAULT 'pending',
    is_cover_photo BOOLEAN DEFAULT FALSE,
    
    -- External sync
    synced_to_google BOOLEAN DEFAULT FALSE,
    synced_to_tripadvisor BOOLEAN DEFAULT FALSE,
    
    -- Engagement
    view_count INTEGER DEFAULT 0,
    like_count INTEGER DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Review helpfulness votes
CREATE TABLE review_votes (
    id SERIAL PRIMARY KEY,
    review_id INTEGER REFERENCES reviews(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id),
    vote_type VARCHAR(10) CHECK (vote_type IN ('helpful', 'not_helpful')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(review_id, user_id)
);

-- Photo likes
CREATE TABLE photo_likes (
    id SERIAL PRIMARY KEY,
    photo_id INTEGER REFERENCES photos(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(photo_id, user_id)
);

-- Location bookmarks/favorites
CREATE TABLE location_favorites (
    id SERIAL PRIMARY KEY,
    location_id INTEGER REFERENCES locations(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(location_id, user_id)
);

-- User follow system for social features
CREATE TABLE user_follows (
    id SERIAL PRIMARY KEY,
    follower_id INTEGER REFERENCES users(id),
    following_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(follower_id, following_id),
    CHECK (follower_id != following_id)
);

-- Content moderation reports
CREATE TABLE content_reports (
    id SERIAL PRIMARY KEY,
    reported_by INTEGER REFERENCES users(id),
    content_type VARCHAR(20) NOT NULL, -- review, photo, location
    content_id INTEGER NOT NULL,
    reason VARCHAR(50) NOT NULL, -- spam, inappropriate, fake, offensive
    description TEXT,
    status VARCHAR(20) DEFAULT 'pending', -- pending, reviewed, resolved, dismissed
    moderator_id INTEGER REFERENCES users(id),
    moderator_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP
);

-- Analytics and tracking
CREATE TABLE user_activities (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    activity_type VARCHAR(50) NOT NULL, -- view, review, photo_upload, favorite, search
    entity_type VARCHAR(50), -- location, review, photo
    entity_id INTEGER,
    metadata JSONB, -- Additional activity data
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- SEO and content optimization
CREATE TABLE seo_redirects (
    id SERIAL PRIMARY KEY,
    old_url VARCHAR(500) NOT NULL,
    new_url VARCHAR(500) NOT NULL,
    redirect_type INTEGER DEFAULT 301,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE location_translations (
    id SERIAL PRIMARY KEY,
    location_id INTEGER REFERENCES locations(id) ON DELETE CASCADE,
    language_code VARCHAR(5) NOT NULL,
    field_name VARCHAR(50) NOT NULL, -- name, description, address
    translated_content TEXT NOT NULL,
    translator_type VARCHAR(20) DEFAULT 'ai', -- ai, human, community
    quality_score DECIMAL(3, 2) DEFAULT 0,
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(location_id, language_code, field_name)
);

-- Indexes for performance
CREATE INDEX idx_locations_city ON locations(city_id);
CREATE INDEX idx_locations_category ON locations(category_id);
CREATE INDEX idx_locations_rating ON locations(average_rating DESC);
CREATE INDEX idx_locations_status ON locations(status);
CREATE INDEX idx_locations_coordinates ON locations(lat, lng);

CREATE INDEX idx_reviews_location ON reviews(location_id);
CREATE INDEX idx_reviews_user ON reviews(user_id);
CREATE INDEX idx_reviews_rating ON reviews(overall_rating);
CREATE INDEX idx_reviews_status ON reviews(status);
CREATE INDEX idx_reviews_created ON reviews(created_at DESC);

CREATE INDEX idx_photos_location ON photos(location_id);
CREATE INDEX idx_photos_review ON photos(review_id);
CREATE INDEX idx_photos_user ON photos(user_id);
CREATE INDEX idx_photos_status ON photos(status);

CREATE INDEX idx_cities_country ON cities(country_id);
CREATE INDEX idx_cities_popular ON cities(popular_rank DESC);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_users_reputation ON users(reputation_score DESC);

-- Full-text search indexes
CREATE INDEX idx_locations_search ON locations USING gin(to_tsvector('english', name::text));
CREATE INDEX idx_reviews_search ON reviews USING gin(to_tsvector('english', content::text));

-- Triggers for maintaining statistics
CREATE OR REPLACE FUNCTION update_location_stats()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
        UPDATE locations 
        SET 
            total_reviews = (SELECT COUNT(*) FROM reviews WHERE location_id = NEW.location_id AND status = 'active'),
            average_rating = (SELECT AVG(overall_rating) FROM reviews WHERE location_id = NEW.location_id AND status = 'active')
        WHERE id = NEW.location_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE locations 
        SET 
            total_reviews = (SELECT COUNT(*) FROM reviews WHERE location_id = OLD.location_id AND status = 'active'),
            average_rating = COALESCE((SELECT AVG(overall_rating) FROM reviews WHERE location_id = OLD.location_id AND status = 'active'), 0)
        WHERE id = OLD.location_id;
        RETURN OLD;
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_location_stats
    AFTER INSERT OR UPDATE OR DELETE ON reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_location_stats();

-- Function to update user stats
CREATE OR REPLACE FUNCTION update_user_stats()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
        UPDATE users 
        SET 
            total_reviews = (SELECT COUNT(*) FROM reviews WHERE user_id = NEW.user_id AND status = 'active'),
            total_photos = (SELECT COUNT(*) FROM photos WHERE user_id = NEW.user_id AND status = 'active')
        WHERE id = NEW.user_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE users 
        SET 
            total_reviews = (SELECT COUNT(*) FROM reviews WHERE user_id = OLD.user_id AND status = 'active'),
            total_photos = (SELECT COUNT(*) FROM photos WHERE user_id = OLD.user_id AND status = 'active')
        WHERE id = OLD.user_id;
        RETURN OLD;
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_user_review_stats
    AFTER INSERT OR UPDATE OR DELETE ON reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_user_stats();

CREATE TRIGGER trigger_update_user_photo_stats
    AFTER INSERT OR UPDATE OR DELETE ON photos
    FOR EACH ROW
    EXECUTE FUNCTION update_user_stats();