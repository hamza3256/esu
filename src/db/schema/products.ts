import { pgTable, serial, text, varchar, integer } from 'drizzle-orm/pg-core';

export const products = pgTable('products', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    price: integer('price').notNull(),
  });