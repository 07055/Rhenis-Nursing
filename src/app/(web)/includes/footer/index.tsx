import { APP_NAME } from '@/lib/config/config';

export default function Footer() {
  return (
    <footer className="bg-red-100 text-center text-sm p-4 mt-auto">
      <p className="font-bold text-black">
        &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
      </p>
    </footer>
  );
}
