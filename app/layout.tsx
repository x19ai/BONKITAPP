import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import './globals.css'
import appConfig from '../src/config/appConfig'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: appConfig.websiteTitle,
	description: 'draw a website and bonk it',
	icons: {
		icon: '/favicon.svg',
	},
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				{children}
				<SpeedInsights />
				<Analytics />
			</body>
		</html>
	)
}
