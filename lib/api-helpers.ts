import { NextResponse } from 'next/server'

export function jsonOk(data: unknown, status = 200) {
  return NextResponse.json(data, { status })
}

export function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status })
}

export function jsonNotFound(message = 'Not found') {
  return NextResponse.json({ error: message }, { status: 404 })
}
