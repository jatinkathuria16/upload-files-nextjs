// Custom Containers
import { Suspense } from 'react';
import { FileUploader } from './containers/uploadForm/fileUploader';
import { List } from './containers/listFiles/list';
import { Card, CardHeader, CardTitle } from '../components/ui/card';
import Loading from './loading';

function HomePage() {
  return (
    <section
      className=" flex h-screen items-center justify-center gap-10"
      key={Math.random()}
    >
      <FileUploader />
      <Card className="size-[450px] overflow-hidden ">
        <CardHeader>
          <CardTitle>Uploaded Files</CardTitle>
        </CardHeader>
        <Suspense fallback={<Loading />}>
          <List />
        </Suspense>
      </Card>
    </section>
  );
}

export default HomePage;
