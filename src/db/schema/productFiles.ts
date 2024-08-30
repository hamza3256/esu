import { pgTable, serial, integer, varchar, timestamp } from 'drizzle-orm/pg-core';
import { products } from './products'; // Assuming products table is already defined

export const productFiles = pgTable('product_files', {
  id: serial('id').primaryKey(),
  productId: integer('product_id').references(() => products.id).notNull(),
  url: varchar('url', { length: 500 }).notNull(),
  uploadedAt: timestamp('uploaded_at').defaultNow(),
});
