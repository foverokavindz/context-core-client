import type { ReactNode } from 'react';
import { Layout, MessageSquare, Database, FileText, Users, Cpu } from 'lucide-react';

export interface NavItem {
	label: string;
	path: string;
	icon: ReactNode;
}

export interface NavSection {
	label?: string;
	items: NavItem[];
}

const ICON_SIZE = 17;

export const NAV_SECTIONS: NavSection[] = [
	{
		items: [
			{ label: 'Dashboard', icon: <Layout size={ICON_SIZE} />, path: '/dashboard' },
			{ label: 'Chat', icon: <MessageSquare size={ICON_SIZE} />, path: '/chat' },
		],
	},
	{
		label: 'Knowledge',
		items: [
			{ label: 'Data Sources', icon: <Database size={ICON_SIZE} />, path: '/data-sources' },
			{ label: 'Documents', icon: <FileText size={ICON_SIZE} />, path: '/documents' },
		],
	},
	{
		label: 'Management',
		items: [{ label: 'Organization', icon: <Users size={ICON_SIZE} />, path: '/organization' }],
	},
	{
		label: 'Integrations',
		items: [{ label: 'Agents / MCP', icon: <Cpu size={ICON_SIZE} />, path: '/agents-mcp' }],
	},
];
