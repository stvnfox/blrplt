import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const WaitingList = pgTable('waiting-list', {
    id: serial('id').primaryKey(),
    email: varchar('email', { length: 256 }),
});