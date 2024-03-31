'use client';

import { useRef, useState } from 'react';

import { uploadMultipleFiles } from '../../actions/actions';
import FormButton from './formbutton';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';

export function FileUploader() {
  const formRef = useRef(null);
  const [failed, setFailed] = useState(null);
  return (
    <div className="w-[450px]">
      {!failed ? (
        <Card>
          <CardHeader>
            <CardTitle className="pb-4">A simple file uploader</CardTitle>
            <form
              ref={formRef}
              action={async (formData) => {
                const MAX_BUFFER_SIZE = 5 * 1000 * 1000;
                let uploadable = true;
                const allFiles = formData.getAll('file');
                allFiles.forEach((file) => {
                  if (file.size > MAX_BUFFER_SIZE) {
                    uploadable = false;
                  }
                });
                uploadable
                  ? setFailed(await uploadMultipleFiles(formData))
                  : setFailed([
                      {
                        message:
                          'One or more files exceed the maximum allowed size of 5MB.',
                      },
                    ]);
                formRef.current?.reset();
              }}
            >
              <CardDescription>Files</CardDescription>
              <Input type="file" id="image" name="file" required multiple />
              <FormButton />
            </form>
          </CardHeader>
          <CardFooter>*Files above 5mb would be rejected</CardFooter>
        </Card>
      ) : (
        <div>failed</div>
      )}
    </div>
  );
}
