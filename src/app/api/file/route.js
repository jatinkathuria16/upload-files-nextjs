import { del } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function DELETE(req) {
  const json = await req.json();
  await del(json.url);
  return NextResponse.json({});
}
