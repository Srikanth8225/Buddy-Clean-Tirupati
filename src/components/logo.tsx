import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        'flex items-center gap-2 text-xl font-bold transition-colors',
        className
      )}
    >
      <div className="relative h-9 w-9 overflow-hidden rounded-md border border-[#A7D1AB]/30">
        <Image 
          src="/logo.png" 
          alt="Buddy Clean Logo" 
          fill
          sizes="36px"
          className="object-cover" 
        />
      </div>
      <span className="font-headline text-foreground">Buddy Clean</span>
    </Link>
  );
}
