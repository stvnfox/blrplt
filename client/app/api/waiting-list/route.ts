import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import { WaitingList } from '@/db/schemas/WaitingList';

const connectionString = process.env.NEXT_PUBLIC_DATABASE_URL
const client = postgres(connectionString, { prepare: false })
const db = drizzle(client);

export async function POST(request: Request) {
    const res = await request.json()

    if(!res.email) { 
        return Response.json({ success: false }, { status: 400, statusText: 'Bad Request' })
    }

    try {
        await db.insert(WaitingList).values({ email: res.email })
        
        return Response.json({ success: true }, { status: 200, statusText: 'OK' })
    } catch {
        return Response.json({ success: false }, { status: 500, statusText: 'Internal Server Error'})
    }
}
