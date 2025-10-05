import { Sparkles } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        'flex items-center gap-2 text-xl font-bold text-primary-dark transition-colors hover:text-primary',
        className
      )}
    >
      <div className="rounded-lg bg-primary p-2 text-primary-foreground">
        <Sparkles className="h-5 w-5" />
      </div>
      <span className="font-headline text-foreground hidden">Buddy Clean</span>
    </Link>
  );
}
