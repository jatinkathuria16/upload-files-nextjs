'use client';

import { useState } from 'react';
import { CardContent, CardDescription } from '../../../components/ui/card';
import ListFilesButtons from './listFilesButtons';

function ListItem({ files }) {
  const [disable, setDisable] = useState(false);
  return files?.blobs?.map((file, i) => (
    <CardContent
      key={file.url + i}
      className="flex items-center justify-between"
    >
      <a
        href={file.downloadUrl}
        target="_blank"
        rel="noopener noreferrer"
        download
        style={{ maxWidth: '80%' }}
      >
        <CardDescription className="overflow-hidden text-ellipsis">
          {file.pathname}
        </CardDescription>
      </a>
      <ListFilesButtons file={file} disable={disable} setDisable={setDisable} />
    </CardContent>
  ));
}

export default ListItem;
