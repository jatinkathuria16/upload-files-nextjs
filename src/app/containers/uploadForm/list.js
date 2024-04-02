/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-undef */

'use client';

// core
import { useEffect, useState } from 'react';
import { list } from '@vercel/blob';
import { useRouter } from 'next/navigation';

// custom component
import { Pencil, Trash2 } from 'lucide-react';
import InfoModal from './infoModal';

// styles
import { Skeleton } from '../../../components/ui/skeleton';
import { useToast } from '../../../components/ui/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';

export function List() {
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState(null);
  const router = useRouter();
  const { toast } = useToast();

  // const data = {
  //   blobs: [
  //     {
  //       downloadUrl:
  //         'https://cdn.britannica.com/43/172743-138-545C299D/overview-Barack-Obama.jpg?w=800&h=450&c=crop',
  //       pathname: '/OvMy70ZB',
  //       size: '7976 KB',
  //       uploadedAt: '2021-07-09T09:01:47.844Z',
  //       url: 'http://example.com/O6KAL0gY',
  //     },
  //     {
  //       downloadUrl: 'http://example.com/downloads/bSrdbeYs',
  //       pathname: '/Gym40zx7',
  //       size: '4838 KB',
  //       uploadedAt: '2022-09-15T14:37:29.393Z',
  //       url: 'http://example.com/DBxaswKP',
  //     },
  //     {
  //       downloadUrl: 'http://example.com/downloads/kJegNkKy',
  //       pathname: '/aLw5I0FH',
  //       size: '6188 KB',
  //       uploadedAt: '2022-11-17T11:29:44.863Z',
  //       url: 'http://example.com/bT7kbRrV',
  //     },
  //     {
  //       downloadUrl: 'http://example.com/downloads/abVWCfzT',
  //       pathname: '/FINu8l2k',
  //       size: '8140 KB',
  //       uploadedAt: '2022-03-09T11:13:10.793Z',
  //       url: 'http://example.com/6kpTqOK2',
  //     },
  //     {
  //       downloadUrl: 'http://example.com/downloads/B3eZAXHT',
  //       pathname: '/3i8oR9R1',
  //       size: '1102 KB',
  //       uploadedAt: '2020-05-27T11:27:11.810Z',
  //       url: 'http://example.com/mdNR4fiH',
  //     },
  //     {
  //       downloadUrl: 'http://example.com/downloads/fdpuIhYy',
  //       pathname: '/hfZevGym',
  //       size: '5452 KB',
  //       uploadedAt: '2021-05-15T07:24:49.653Z',
  //       url: 'http://example.com/P6S7TSPn',
  //     },
  //     {
  //       downloadUrl: 'http://example.com/downloads/zpKh14yg',
  //       pathname: '/WG7WGbWO',
  //       size: '5709 KB',
  //       uploadedAt: '2024-01-14T17:07:41.019Z',
  //       url: 'http://example.com/Mj5WGv1C',
  //     },
  //     {
  //       downloadUrl: 'http://example.com/downloads/oh7KOr7t',
  //       pathname: '/kymrOqyj',
  //       size: '5151 KB',
  //       uploadedAt: '2020-04-08T02:30:36.260Z',
  //       url: 'http://example.com/FzC5lo8o',
  //     },
  //     {
  //       downloadUrl: 'http://example.com/downloads/EHGTgBi2',
  //       pathname: '/5KRdznnF',
  //       size: '1325 KB',
  //       uploadedAt: '2022-07-10T03:02:59.714Z',
  //       url: 'http://example.com/jWA9yKwn',
  //     },
  //     {
  //       downloadUrl: 'http://example.com/downloads/tYsczkbm',
  //       pathname: '/52JzQ4Ax',
  //       size: '3910 KB',
  //       uploadedAt: '2023-02-13T20:32:07.576Z',
  //       url: 'http://example.com/HnU0GKRn',
  //     },
  //   ],
  // };
  async function allFiles() {
    try {
      const blobs = await list();
      setFiles(blobs);
      setLoading(false);
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: e?.message,
      });
    }
  }
  const handleDelete = async (file) => {
    setLoading(true);
    try {
      await fetch(`/api/file/${encodeURIComponent(file.url)}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setLoading(false);
      router.refresh();
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: e?.message,
      });
    }
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      allFiles();
    }, 5000);
  }, []);

  return (
    <div>
      <Card className="size-[450px] overflow-hidden ">
        <CardHeader>
          <CardTitle>Uploaded Files</CardTitle>
        </CardHeader>
        <div className="h-[350px] overflow-scroll">
          {loading ? (
            new Array(7).fill(1).map((_, i) => (
              <CardContent
                key={i}
                className=" flex items-center justify-between  "
              >
                <Skeleton className="h-[30px] w-[300px] bg-gray-300 dark:bg-gray-700" />
                <Skeleton className="size-[30px] bg-gray-300 dark:bg-gray-700" />
                <Skeleton className="size-[30px] bg-gray-300 dark:bg-gray-700" />
              </CardContent>
            ))
          ) : files?.blobs.length ? (
            files?.blobs?.map((file) => (
              <CardContent
                key={file.pathname}
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
                <CardDescription className="flex gap-2.5">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setShowRenameModal(file);
                    }}
                  >
                    <Pencil size={18} />
                  </Button>
                  <Button variant="ghost" onClick={() => handleDelete(file)}>
                    <Trash2 size={18} />
                  </Button>
                </CardDescription>
              </CardContent>
            ))
          ) : (
            <CardContent className="flex items-center justify-between ">
              <CardDescription>No Data Uploaded Yet!</CardDescription>
            </CardContent>
          )}
        </div>
      </Card>
      <InfoModal
        visible={showRenameModal}
        onChange={() => setShowRenameModal(null)}
        title={`Rename ${showRenameModal?.pathname}`}
      >
        <CardDescription>Set new name</CardDescription>
        <Input type="text" id="name" name="fileName" required />
        <div className="flex  gap-2.5">
          <Button
            className="mt-4 min-w-20"
            // onClick={() => {
            //   setShowRenameModal(null);
            // }}
          >
            Save
          </Button>
          <Button
            className="mt-4 min-w-20"
            onClick={() => {
              setShowRenameModal(null);
            }}
          >
            Cancel
          </Button>
        </div>
      </InfoModal>
    </div>
  );
}
