import { useFormStatus } from 'react-dom';
import { Button } from '../../../components/ui/button';

export default function FormButton() {
  const { pending } = useFormStatus();
  return (
    <div>
      <Button className="my-4"> {pending ? 'Uploading' : 'Upload'}</Button>
    </div>
  );
}
