import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import { WaitingList } from '@/db/schemas/WaitingList';

const connectionString = process.env.NEXT_PUBLIC_DATABASE_URL || ''
const client = postgres(connectionString, { prepare: false })
const db = drizzle(client);

export async function POST(request: Request) {
    const res = await request.json()
    
    if(!res.email) { 
        return Response.json({ success: false }, { status: 400, statusText: 'Email is required' })
    }

    console.log(await db.select().from(WaitingList).where(eq(WaitingList.email, res.email)))

    const emailAlreadyExists = (await db.select().from(WaitingList).where(eq(WaitingList.email, res.email))).length > 0;
    if(emailAlreadyExists) {
        return Response.json({ success: false, message: 'Email already exists' }, { status: 404, statusText: 'Email already exists' })
    }

    try {
        await db.insert(WaitingList).values({ email: res.email });
        
        return Response.json({ success: true }, { status: 200, statusText: 'OK' })
    } catch(err) {
        console.log(err)
        return Response.json({ success: false, message: 'Internal Server Error' }, { status: 500, statusText: 'Internal Server Error'})
    }
}
