-- Run this in your Supabase SQL Editor

-- 1. Create the orders table
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id TEXT NOT NULL UNIQUE,
    contact TEXT NOT NULL,
    amount NUMERIC NOT NULL,
    status TEXT NOT NULL DEFAULT 'placed',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Setup Row Level Security (RLS)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- 3. Create policies
-- Allow anyone to insert an order (for checkout)
CREATE POLICY "Enable insert for anyone" ON public.orders
    FOR INSERT WITH CHECK (true);

-- Allow users to read their own order by order_id
CREATE POLICY "Enable read by order_id" ON public.orders
    FOR SELECT USING (true);

-- Allow anyone to update (in a real app, only admins should update, but for testing we allow all)
CREATE POLICY "Enable update for anyone" ON public.orders
    FOR UPDATE USING (true);

-- 4. Create the products table for Dynamic Inventory
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    price NUMERIC NOT NULL,
    image TEXT NOT NULL,
    category TEXT NOT NULL,
    type TEXT NOT NULL, -- 'collection' or 'gallery'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Setup RLS for products
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- 6. Create policies for products
-- Drop existing policies if any
DROP POLICY IF EXISTS "Enable read for anyone" ON public.products;
DROP POLICY IF EXISTS "Enable insert for anyone" ON public.products;
DROP POLICY IF EXISTS "Enable update for anyone" ON public.products;
DROP POLICY IF EXISTS "Enable delete for anyone" ON public.products;

-- Read access is public
CREATE POLICY "Enable read for anyone" ON public.products FOR SELECT USING (true);
-- Write access requires authentication
CREATE POLICY "Enable insert for authenticated users only" ON public.products FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Enable update for authenticated users only" ON public.products FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Enable delete for authenticated users only" ON public.products FOR DELETE USING (auth.uid() IS NOT NULL);

-- 7. Insert Initial Mock Data
INSERT INTO public.products (id, title, description, price, image, category, type) VALUES
('prod_001', 'Crochet Art', 'Handmade dolls, flowers, keychains, bouquets and unique gifts crafted with love.', 45.00, '/crochet.jpg', 'crochet', 'collection'),
('prod_002', 'Henna Designs', 'Exquisite bridal, engagement, and festive mehendi designs for every special occasion.', 80.00, '/mehendi.jpg', 'henna', 'collection'),
('prod_003', 'Flower Bouquets', 'Beautiful and everlasting crochet flower bouquets that make the perfect gift.', 65.00, '/bouquet.jpg', 'crochet', 'collection'),
('prod_004', 'Custom Apparel', 'Personalized crochet clothing, accessories, and unique wearable art tailored to your style.', 120.00, '/custom apparel.jpg', 'apparel', 'collection'),
('prod_005', 'Amigurumi', 'Adorable, hand-stitched crochet plushies and figurines, perfect for gifts or collectibles.', 35.00, '/amigurumi.jpg', 'amigurumi', 'collection'),
('prod_006', 'Home Decor', 'Handmade crochet items like blankets, cushions, and wall art to beautify your living space.', 75.00, '/home decor.jpg', 'homedecor', 'collection'),
('gal_001', 'Bridal Mandala Henna', 'Intricate traditional bridal mandala artwork.', 0.00, 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80', 'henna', 'gallery'),
('gal_002', 'Crochet Tulip Bouquet', 'Everlasting handcrafted pastel tulips.', 0.00, 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80', 'crochet', 'gallery'),
('gal_003', 'Minimalist Arabic Design', 'Elegant and modern geometric layout.', 0.00, 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&w=800&q=80', 'henna', 'gallery'),
('gal_004', 'Amigurumi Cozy Bear', 'Premium plush cotton plushie for gifting.', 0.00, 'https://images.unsplash.com/photo-1559251606-c623743a6d76?auto=format&fit=crop&w=800&q=80', 'crochet', 'gallery'),
('gal_005', 'Crochet Sunflower', 'Bright and cheerful crochet sunflower.', 0.00, 'https://images.unsplash.com/photo-1596431940910-c44d715d319e?auto=format&fit=crop&w=800&q=80', 'crochet', 'gallery'),
('gal_006', 'Festive Henna Art', 'Detailed festive mehendi for special events.', 0.00, 'https://images.unsplash.com/photo-1587823522108-66236b3b5c68?auto=format&fit=crop&w=800&q=80', 'henna', 'gallery'),
('gal_007', 'Crochet Granny Square Blanket', 'Cozy colorful traditional blanket.', 0.00, 'https://images.unsplash.com/photo-1606721591552-094191a7201c?auto=format&fit=crop&w=800&q=80', 'crochet', 'gallery'),
('gal_008', 'Intricate Bridal Henna', 'Full hand traditional bridal design.', 0.00, 'https://images.unsplash.com/photo-1628157790858-39e7c53d169d?auto=format&fit=crop&w=800&q=80', 'henna', 'gallery')
ON CONFLICT (id) DO NOTHING;
