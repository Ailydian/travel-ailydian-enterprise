/**
 * Dashboard Layout Components
 *
 * This module exports the main dashboard layout components for the LyDian platform.
 * These components work together to create a professional, responsive dashboard experience.
 *
 * @example
 * import { DashboardShell } from '@/components/dashboard';
 *
 * export default function DashboardPage() {
 *   return (
 *     <DashboardShell
 *       title="Overview"
 *       breadcrumbs={[{ label: 'Dashboard' }, { label: 'Overview' }]}
 *     >
 *       <YourContent />
 *     </DashboardShell>
 *   );
 * }
 */

export { default as DashboardShell } from './DashboardShell';
export { default as DashboardSidebar } from './DashboardSidebar';
export { default as DashboardHeader } from './DashboardHeader';
