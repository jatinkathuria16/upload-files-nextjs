'use client';

// Core
import { useRef, useState } from 'react';

// Server Action
import { uploadMultipleFiles } from '../../actions/actions';

// Custom Components
import FormButton from '../../sharedUI/formbutton';
import InfoModal from '../infoModal';

// Styles
import {
  Card,
  CardDescription,
  CardFooter,
  CardContent,
  CardTitle,
  CardHeader,
} from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { DialogDescription } from '../../../components/ui/dialog';

export function FileUploader() {
  const formRef = useRef(null);
  const [failed, setFailed] = useState(null);
  console.log({ failed });
  return (
    <div className="w-[450px]">
      <Card>
        <CardHeader>
          <CardTitle>A simple file uploader</CardTitle>
        </CardHeader>

        <CardContent>
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
            <FormButton title="Upload" />
          </form>
        </CardContent>
        <CardFooter>*Files above 5mb would be rejected</CardFooter>
      </Card>
      <InfoModal
        visible={!!failed?.length}
        onChange={() => setFailed(null)}
        title="Upload Failed"
      >
        {failed?.map((item, i) => (
          <div className="mb-2" key={i}>
            {item?.name ? (
              <DialogDescription key={i}>
                {i + 1}. {item.name}
              </DialogDescription>
            ) : null}
            <DialogDescription key={i}>{item.message}</DialogDescription>
          </div>
        ))}
      </InfoModal>
    </div>
  );
}
