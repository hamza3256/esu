import { pgTable, serial, text, timestamp, pgEnum, varchar } from 'drizzle-orm/pg-core';

// Define the role enum
const userRoleEnum = pgEnum('role', ['user', 'admin', 'moderator']); // Add other roles as needed

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    password: text('password').notNull(),
    role: userRoleEnum('role').default('user'), 
    createdAt: timestamp('created_at').defaultNow(),
  });
  
