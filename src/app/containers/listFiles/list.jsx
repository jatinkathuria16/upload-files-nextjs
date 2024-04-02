// core
import { list } from '@vercel/blob';

// styles
import { CardContent, CardDescription } from '../../../components/ui/card';
import ListItem from './listItem';

export async function List() {
  let files = {};
  async function allFiles() {
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
    const blobs = await list();
    return blobs;
  }
  try {
    files = await allFiles();
  } catch (e) {
    console.log(e);
  }

  return (
    <div className="h-[350px] overflow-scroll">
      {files?.blobs.length ? (
        <ListItem files={files} />
      ) : (
        <CardContent className="flex items-center justify-between ">
          <CardDescription>No Data Uploaded Yet!</CardDescription>
        </CardContent>
      )}
    </div>
  );
}
