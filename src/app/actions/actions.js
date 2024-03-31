/* eslint-disable no-throw-literal */

'use server';

import { put } from '@vercel/blob';
import { revalidatePath } from 'next/cache';

export async function uploadFile(file) {
  try {
    const blob = await put(file.name, file, {
      access: 'public',
    });
    revalidatePath('/');
    return blob;
  } catch (error) {
    console.error('Error uploading File:', error);
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
  for (const file of allFiles) {
    try {
      console.log('trying');
      const blob = await uploadFile(file);
      uploadedFiles.push(blob);
    } catch (error) {
      unuploadedFiles.push(error);
    }
  }
  console.log('Uploaded Files:', uploadedFiles);
  console.log('Unuploaded Files:', unuploadedFiles);
  return unuploadedFiles;
}
