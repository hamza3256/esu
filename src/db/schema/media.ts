import { pgTable, serial, varchar, integer, timestamp } from 'drizzle-orm/pg-core';

export const media = pgTable('media', {
  id: serial('id').primaryKey(),
  filename: varchar('filename', { length: 255 }).notNull(),
  mimeType: varchar('mime_type', { length: 255 }).notNull(),
  path: varchar('path', { length: 500 }).notNull(),
  size: integer('size').notNull(),
  uploadedAt: timestamp('uploaded_at').defaultNow(),
});
