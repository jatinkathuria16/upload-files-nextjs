import { del } from '@vercel/blob';

export async function DELETE(req, context) {
  const { params } = context;
  let { urlToDelete } = params;
  urlToDelete = decodeURIComponent(urlToDelete);
  console.log(urlToDelete);
  await del(urlToDelete);

  return new Response();
}
