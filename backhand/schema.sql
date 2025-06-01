-- Users table
CREATE TABLE users_table (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'member',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT,
    image TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_active INTEGER DEFAULT 1
);

-- Visitors table
CREATE TABLE visitors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    ip_address TEXT,
    visit_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    page TEXT,
    FOREIGN KEY(user_id) REFERENCES users_table(id)
);

-- Orders table
CREATE TABLE ordered_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    order_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    status TEXT DEFAULT 'pending',
    FOREIGN KEY(user_id) REFERENCES users_table(id)
);

-- Order details table
CREATE TABLE order_details (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER,
    product_id INTEGER,
    quantity INTEGER DEFAULT 1,
    price REAL NOT NULL,
    FOREIGN KEY(order_id) REFERENCES ordered_items(id),
    FOREIGN KEY(product_id) REFERENCES products(id)
);

-- Sold items table
CREATE TABLE sold_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER,
    user_id INTEGER,
    sold_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    price REAL NOT NULL,
    FOREIGN KEY(product_id) REFERENCES products(id),
    FOREIGN KEY(user_id) REFERENCES users_table(id)
); 