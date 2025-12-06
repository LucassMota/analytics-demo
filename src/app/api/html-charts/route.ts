import { NextResponse } from 'next/server'
import { readFile } from 'fs/promises'

export async function POST(req: Request) {
  const { path } = await req.json()
  const html = await readFile(path, 'utf8')
  return NextResponse.json({ html })
}
