import { useMemo } from 'react';
import { useTheme } from 'next-themes';

import { Status } from '~/components';
import { usePersistantState, useStatus } from '~/lib';

import { DiscordStatus, NavigationItemType, Theme } from '~/types';

import type { NavigationItem, NavigationItems } from '~/types';

const staticMenuItems: Array<Array<NavigationItem>> = [
	[
		{
			type: NavigationItemType.LINK,
			icon: 'feather:home',
			text: 'Home',
			href: '/',
		},
		{
			type: NavigationItemType.LINK,
			icon: 'feather:edit-3',
			text: 'Blog',
			href: '/blog',
		},
		{
			type: NavigationItemType.LINK,
			icon: 'feather:copy',
			text: 'Projects',
			href: '/projects',
		},
		{
			type: NavigationItemType.LINK,
			icon: 'feather:clock',
			text: 'Timeline',
			href: '/timeline',
		},
		{
			type: NavigationItemType.LINK,
			icon: 'feather:link',
			text: 'Referrals',
			href: '/referrals',
		},
	],
	[
		{
			type: NavigationItemType.LINK,
			icon: 'feather:twitter',
			text: 'Twitter',
			href: 'https://twitter.com/nurodev',
			external: true,
		},
		{
			type: NavigationItemType.LINK,
			icon: 'feather:github',
			text: 'GitHub',
			href: 'https://github.com/nurodev',
			external: true,
		},
	],
];

export function useNavigation() {
	const state = usePersistantState();
	const { background, sound } = state.get();
	const { color, loading, status } = useStatus();
	const { theme, setTheme } = useTheme();

	const isDark = useMemo(() => {
		if (theme === Theme.SYSTEM)
			return window.matchMedia('(prefers-color-scheme: dark)').matches;

		return theme === Theme.DARK;
	}, [theme]);

	let menuItems: NavigationItems = [...staticMenuItems];

	// TODO: Convert to inline
	if (status && !loading && status.discord_status !== DiscordStatus.OFFLINE) {
		menuItems.push([
			{
				type: NavigationItemType.LINK,
				icon: (
					<Status.Indicator
						color={color}
						pulse={status.discord_status !== DiscordStatus.OFFLINE}
					/>
				),
				text: 'Status',
				href: '/status',
			},
		]);
	}

	const settingsItems: NavigationItems = [
		[
			{
				type: NavigationItemType.ACTION,
				icon: 'feather:image',
				endIcon: background ? 'feather:check-square' : 'feather:square',
				text: 'Animations',
				onClick: () =>
					state.set((settings) => ({
						...settings,
						background: !settings.background,
					})),
			},
			{
				type: NavigationItemType.ACTION,
				icon: 'feather:moon',
				endIcon: isDark ? 'feather:check-square' : 'feather:square',
				text: 'Dark Theme',
				onClick: () => setTheme(isDark ? 'light' : 'dark'),
			},
			{
				type: NavigationItemType.ACTION,
				icon: sound ? 'feather:volume-2' : 'feather:volume-x',
				endIcon: sound ? 'feather:check-square' : 'feather:square',
				text: sound ? 'Sounds On' : 'Sounds Off',
				onClick: () =>
					state.set((settings) => ({
						...settings,
						sound: !settings.sound,
					})),
			},
		],
	];

	return {
		menu: menuItems,
		settings: settingsItems,
	};
}
