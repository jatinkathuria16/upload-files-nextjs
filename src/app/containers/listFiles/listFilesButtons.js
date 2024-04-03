/* eslint-disable no-useless-escape */
/* eslint-disable react/prop-types */

'use client';

import { LoaderIcon, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CardDescription } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import InfoModal from '../infoModal';
import { Input } from '../../../components/ui/input';
import { useToast } from '../../../components/ui/use-toast';
import { renameFile } from '../../actions/actions';
import FormButton from '../../sharedUI/formbutton';

function ListFilesButtons({ file, disable, setDisable }) {
  const [renameInfo, setRenameInfo] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const handleDelete = async (f) => {
    setLoading(true);
    setDisable(true);
    try {
      await fetch(`/api/file/`, {
        method: 'DELETE',
        body: JSON.stringify({ url: f?.url }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      router.refresh();
      setDisable(false);
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: e?.message,
      });
      setLoading(false);
      setDisable(false);
    }
  };

  const handleRename = async (formData) => {
    const newName = formData.get('name');

    if (newName === file?.pathname) {
      toast({
        variant: 'destructive',
        title: 'Invalid Name',
        description:
          'Please enter a valid name that is different from the current one.',
      });

      return;
    }
    const isValidFileName =
      // eslint-disable-next-line no-control-regex
      /^(?!^(?:COM\d|LPT\d|PRN|AUX|NUL|CON)(?:\..*)?$)[^\\\/:*?"<>|\x00-\x1F]*[^\\\/:*?"<>|\x00-\x1F\.\\\/]$/i.test(
        newName,
      );

    if (!isValidFileName) {
      toast({
        variant: 'destructive',
        title: 'Invalid File Name',
        description:
          'Please enter a valid file name containing only alphanumeric characters, dashes, underscores, or dots.',
      });
      return;
    }

    try {
      const clientAction = await renameFile(formData, renameInfo);
      if (clientAction === 'revalidate') {
        setRenameInfo(null);
        handleDelete(file);
      }
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: e?.message,
      });
    }
  };

  return (
    <>
      <CardDescription className="flex gap-2.5">
        <Button
          variant="ghost"
          onClick={() => {
            setRenameInfo(file);
          }}
          disabled={disable}
        >
          <Pencil size={18} />
        </Button>
        <Button
          variant="ghost"
          disabled={disable}
          onClick={() => handleDelete(file)}
        >
          {loading ? (
            <LoaderIcon className="animate-spin" />
          ) : (
            <Trash2 size={18} />
          )}
        </Button>
      </CardDescription>
      <InfoModal
        visible={renameInfo}
        onChange={() => setRenameInfo(null)}
        title={`Rename ${renameInfo?.pathname}`}
      >
        <CardDescription>Set new name</CardDescription>
        <form action={handleRename}>
          <Input
            type="text"
            id="name"
            name="name"
            required
            autoFocus
            defaultValue={
              file?.pathname.includes('.')
                ? file?.pathname.slice(file?.pathname.lastIndexOf('.'))
                : ''
            }
            onFocus={(e) => {
              e.target.setSelectionRange(0, 0);
            }}
          />
          <div className="flex  gap-2.5">
            <FormButton title="Save" className="disable-button" />
            <Button
              type="button"
              className="disable-button mt-4 min-w-20"
              onClick={() => {
                setRenameInfo(null);
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </InfoModal>
    </>
  );
}

export default ListFilesButtons;
