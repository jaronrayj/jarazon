use jarazon_db;
-- Insert rows into table 'products'
INSERT INTO products
    ( -- columns to insert data into
    item,price, department_name, quantity
    )
VALUES
    ( "My shoe", 30, "Personal Household Goods", 11),
    ( "Used Toothbrush", 7.50, "Personal Household Goods", 3),
    ( "Children's artwork", 99.99, "Personal Household Goods", 78),
    ( "Dented pots and pans", 19.97, "Personal Household Goods", 8),
    ( "Nearly dead lawn mower", 6, "Garage Stuff", 1),
    ( "Crusted paint brushes", 8, "Garage Stuff", 5),
    ( "Ladder (actually a bucket)", 5, "Garage Stuff", 12),
    ( "Mostly fresh underwear", 20, "Personal Household Goods", 15),
    ( "Tony's jeans", 60, "Acquired Items", 3),
    ( "Neighbor's Barbies", .50, "Acquired Items", 5);

select * from products;