import clsx from 'clsx';
import Link from 'next/link';
import { Icon } from '@iconify/react';

import type { AnchorHTMLAttributes } from 'react';

import type { WithClassName } from '~/types';

interface OutlineProps extends AnchorHTMLAttributes<HTMLAnchorElement>, WithClassName {
	external?: boolean;
	icon?: string;
	small?: boolean;
}

export function Outline({
	children,
	className,
	external = false,
	href,
	icon,
	onClick,
	small = false,
	...rest
}: OutlineProps) {
	return (
		<Link href={href} passHref>
			<a
				className={clsx(
					'inline-flex items-center justify-center w-full sm:w-auto bg-gray-50 bg-opacity-75 hover:(bg-gray-100 bg-opacity-75 text-gray-500) dark:(bg-gray-900 bg-opacity-75 hover:bg-gray-800 hover:bg-opacity-75 border-gray-700 text-primary-500 hover:text-primary-400) backdrop-filter backdrop-blur-sm saturate-200 text-gray-400 font-medium border-2 border-gray-200 rounded-lg cursor-pointer default-transition focus:(outline-none ring-2 ring-offset-4 ring-primary-500)',
					small ? 'px-4 py-1 text-sm' : 'px-8 py-2',
					className,
				)}
				href={href}
				onClick={(...args) => onClick && onClick(...args)}
				rel="noopener noreferrer"
				target={external ? '_blank' : undefined}
				{...rest}
			>
				{icon && <Icon className="mt-1 mr-3" icon={icon} />}
				{children}
			</a>
		</Link>
	);
}
