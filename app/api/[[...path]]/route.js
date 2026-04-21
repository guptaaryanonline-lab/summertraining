import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'

let cachedClient = null
async function getDb() {
  if (!cachedClient) {
    cachedClient = new MongoClient(process.env.MONGO_URL)
    await cachedClient.connect()
  }
  const dbName = process.env.DB_NAME && process.env.DB_NAME !== 'your_database_name' ? process.env.DB_NAME : 'summer_school'
  return cachedClient.db(dbName)
}

const ok = (data, status = 200) => NextResponse.json(data, { status })
const err = (message, status = 400) => NextResponse.json({ error: message }, { status })

async function handler(request, { params }) {
  const path = (params?.path || []).join('/')
  const method = request.method

  try {
    if (path === '' || path === 'health') {
      return ok({ ok: true, service: 'summer-school', time: new Date().toISOString() })
    }

    // Registrations
    if (path === 'register' && method === 'POST') {
      const body = await request.json()
      const required = ['fullName', 'email', 'phone', 'programId', 'category']
      for (const k of required) {
        if (!body[k]) return err(`Missing field: ${k}`, 400)
      }
      const db = await getDb()
      const doc = {
        id: uuidv4(),
        fullName: body.fullName,
        email: body.email,
        phone: body.phone,
        institution: body.institution || '',
        programId: body.programId,
        programTitle: body.programTitle || '',
        category: body.category, // 'college' or 'school'
        createdAt: new Date().toISOString(),
      }
      await db.collection('registrations').insertOne(doc)
      return ok({ success: true, registration: doc })
    }

    if (path === 'registrations' && method === 'GET') {
      const db = await getDb()
      const list = await db.collection('registrations')
        .find({}, { projection: { _id: 0 } })
        .sort({ createdAt: -1 })
        .limit(200)
        .toArray()
      return ok({ registrations: list })
    }

    // Contact / enquiry
    if (path === 'contact' && method === 'POST') {
      const body = await request.json()
      if (!body.email || !body.message) return err('Email and message required', 400)
      const db = await getDb()
      const doc = {
        id: uuidv4(),
        name: body.name || '',
        email: body.email,
        message: body.message,
        createdAt: new Date().toISOString(),
      }
      await db.collection('contacts').insertOne(doc)
      return ok({ success: true })
    }

    return err(`Route not found: /${path}`, 404)
  } catch (e) {
    console.error('API error:', e)
    return err(e.message || 'Internal Error', 500)
  }
}

export const GET = handler
export const POST = handler
export const PUT = handler
export const DELETE = handler
export const PATCH = handler
