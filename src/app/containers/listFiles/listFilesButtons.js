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

function ListFilesButtons({ file, disable, setDisable }) {
  const [showRenameModal, setShowRenameModal] = useState(false);
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
  return (
    <>
      <CardDescription className="flex gap-2.5">
        <Button
          variant="ghost"
          onClick={() => {
            setShowRenameModal(file);
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
        visible={showRenameModal}
        onChange={() => setShowRenameModal(null)}
        title={`Rename ${showRenameModal?.pathname}`}
      >
        <CardDescription>Set new name</CardDescription>
        <Input type="text" id="name" name="fileName" required />
        <div className="flex  gap-2.5">
          <Button className="disable-button mt-4 min-w-20">Save</Button>
          <Button
            className="disable-button mt-4 min-w-20"
            onClick={() => {
              setShowRenameModal(null);
            }}
          >
            Cancel
          </Button>
        </div>
      </InfoModal>
    </>
  );
}

export default ListFilesButtons;
