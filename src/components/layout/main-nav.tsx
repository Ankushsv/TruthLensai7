'use client';

import { usePathname } from 'next/navigation';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { ScanText, GraduationCap, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const navItems = [
  { href: '/', label: 'Analyze', icon: ScanText },
  { href: '/learn', label: 'Learn', icon: GraduationCap },
  { href: '/fact-check', label: 'Fact-Check', icon: CheckCircle },
];

export default function MainNav() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col p-2">
      <SidebarMenu>
        {navItems.map((item) => (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton
              asChild
              isActive={pathname === item.href}
              tooltip={{ children: item.label }}
            >
              <Link href={item.href}>
                <item.icon />
                <span>{item.label}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </div>
  );
}
