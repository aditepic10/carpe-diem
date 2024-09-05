-- Locations table with PostGIS geolocation
CREATE TABLE locations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    geo_location GEOGRAPHY(POINT, 4326), -- PostGIS data type for latitude/longitude
    description TEXT,
    address TEXT,
    city TEXT,
    state TEXT,
    country TEXT,
    postal_code TEXT,
    rating DOUBLE PRECISION DEFAULT 0.0,
    popularity DOUBLE PRECISION DEFAULT 0.0,
    price INT DEFAULT 0,
    categories JSONB, -- Denormalized categories to reduce JOINs
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- Location Categories table for standardized category storage
CREATE TABLE location_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    location_id UUID REFERENCES locations(id) ON DELETE CASCADE,
    category_id UUID REFERENCES categories(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- Categories table (standardized set of categories)
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- Photos table
CREATE TABLE photos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    location_id UUID REFERENCES locations(id) ON DELETE CASCADE,
    photo_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- Hours table for regular, special, and suggested hours
CREATE TABLE hours (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    location_id UUID REFERENCES locations(id) ON DELETE CASCADE,
    hours_type TEXT CHECK (hours_type IN ('regular', 'special', 'suggested')) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    day_of_week INT CHECK (day_of_week BETWEEN 1 AND 7),
    open_time TIME,
    close_time TIME,
    is_open BOOLEAN DEFAULT TRUE,
    priority INT DEFAULT 1, -- Higher priority overrides lower ones
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- Location Data Sources table for tracking the source of each location
CREATE TABLE location_data_sources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    location_id UUID REFERENCES locations(id) ON DELETE CASCADE,
    data_source_id UUID REFERENCES data_sources(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- Data Sources table (e.g., Foursquare, Google Maps, OpenWeatherMap)
CREATE TABLE data_sources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    api_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- Events table (future use for events tied to locations)
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    location_id UUID REFERENCES locations(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    start_time TIMESTAMPTZ,
    end_time TIMESTAMPTZ,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- Indexes for improved query performance
CREATE INDEX idx_locations_geo ON locations USING GIST (geo_location);
CREATE INDEX idx_location_categories ON location_categories(location_id, category_id);
CREATE INDEX idx_location_data_sources ON location_data_sources(location_id, data_source_id);
CREATE INDEX idx_hours_location ON hours(location_id, hours_type);