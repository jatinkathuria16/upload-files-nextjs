// Custom Containers
import { FileUploader } from './containers/uploadForm/fileUploader';
import { List } from './containers/uploadForm/list';

function HomePage() {
  return (
    <div className=" flex h-screen items-center justify-center gap-10">
      <FileUploader />
      <List />
    </div>
  );
}

export default HomePage;
