/* eslint-disable react/prop-types */
// core
import { useFormStatus } from 'react-dom';

// styles
import { LoaderIcon } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { cn } from '../../lib/utils';

export default function FormButton({ title, className }) {
  const { pending } = useFormStatus();
  return (
    <div>
      <Button className={cn('mt-4 min-w-20', className)}>
        {pending ? <LoaderIcon className="animate-spin" /> : title}
      </Button>
    </div>
  );
}
