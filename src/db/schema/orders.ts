import { pgTable, serial, integer, timestamp, numeric } from 'drizzle-orm/pg-core';
import { products } from './products';
import { users } from './users';

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  productId: integer('product_id').references(() => products.id).notNull(),
  quantity: integer('quantity').notNull(),
  totalAmount: numeric('total_amount', { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});
