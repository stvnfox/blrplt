import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const WaitingList = pgTable('waitingList', {
    id: serial('id').primaryKey(),
    email: varchar('email', { length: 256 }),
});