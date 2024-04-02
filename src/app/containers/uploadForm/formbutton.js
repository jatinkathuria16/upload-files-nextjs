// core
import { useFormStatus } from 'react-dom';

// styles
import { LoaderIcon } from 'lucide-react';
import { Button } from '../../../components/ui/button';

export default function FormButton() {
  const { pending } = useFormStatus();
  return (
    <div>
      <Button className="mt-4 min-w-20">
        {pending ? <LoaderIcon className="animate-spin" /> : 'Upload'}
      </Button>
    </div>
  );
}
