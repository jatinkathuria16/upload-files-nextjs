/* eslint-disable no-throw-literal */

'use server';

import { put } from '@vercel/blob';
import { revalidatePath } from 'next/cache';

const API_URL = 'https://dummyjson.com/posts/';

async function callExampleAPI(endpoint, type, data) {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`, {
      method: type || 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    console.error('Error calling Dummy API:', error);
    throw error;
  }
}

export async function uploadFile(file, i) {
  try {
    // calling a third party API  before the upload begins
    const uploadCall = await callExampleAPI('add', 'POST', {
      title: `${file?.name} initiating upload`,
      userId: i,
    });
    console.log(uploadCall?.title);

    // trying upload
    const blob = await put(file.name, file, {
      access: 'public',
    });

    // calling a third party when the upload succeeds
    const successCall = await callExampleAPI(`${i}`, 'PUT', {
      title: `${file?.name} successfully uploaded`,
    });
    console.log(successCall?.title);

    // revalidating the list
    revalidatePath('/');
    return blob;
  } catch (error) {
    // calling a third party when the upload fails
    const failedCall = await callExampleAPI(`${i}`, 'PUT', {
      title: `${file?.name} failed to upload`,
    });
    console.log(failedCall?.title);
    throw {
      message: error.message,
      name: file?.name,
      size: file?.size,
      type: file?.type,
    };
  }
}

export async function uploadMultipleFiles(formData) {
  const allFiles = formData.getAll('file');
  const uploadedFiles = [];
  const unuploadedFiles = [];
  let i = 1;
  for (const file of allFiles) {
    try {
      const blob = await uploadFile(file, i);
      i += 1;
      uploadedFiles.push(blob);
    } catch (error) {
      i += 1;
      unuploadedFiles.push(error);
    }
  }
  console.log('Uploaded Files:', uploadedFiles);
  console.log('Unuploaded Files:', unuploadedFiles);
  return unuploadedFiles;
}
