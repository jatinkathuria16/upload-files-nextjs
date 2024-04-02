import { Skeleton } from '../components/ui/skeleton';
import { CardContent } from '../components/ui/card';

function Loading() {
  return new Array(7).fill(1).map((_, i) => (
    <CardContent key={i} className=" flex items-center justify-between  ">
      <Skeleton className="h-[30px] w-[300px] bg-gray-300 dark:bg-gray-700" />
      <Skeleton className="size-[30px] bg-gray-300 dark:bg-gray-700" />
      <Skeleton className="size-[30px] bg-gray-300 dark:bg-gray-700" />
    </CardContent>
  ));
}

export default Loading;
