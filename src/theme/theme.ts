import { createTheme } from '@mui/material/styles';

const FONT_PRIMARY = 'Inter, sans-serif';

// Design tokens carried over 1:1 from the Context Core mockup's
export interface ThemeTokens {
	ink2: string;
	ink3: string;
	surfacePage: string;
	surfaceRaised: string;
	surfaceSunken: string;
	surfaceInset: string;
	surfaceSidebar: string;
	lineStrong: string;
	accentTint: string;
	accentTintStrong: string;
	positiveTint: string;
	warningTint: string;
	criticalTint: string;
	scrim: string;
	radius: {
		sm: number;
		md: number;
		lg: number;
		xl: number;
		'2xl': number;
		'3xl': number;
	};
	fontSize: {
		'3xs': number;
		'2xs': number;
		xs: number;
		sm: number;
		md: number;
		lg: number;
		xl: number;
		'2xl': number;
		'3xl': number;
		// Prominent one-off headings (e.g. chat welcome title) that fall outside
		// the ascending UI-chrome ladder above.
		heading: number;
	};
	elevation: {
		0: string;
		1: string;
		2: string;
		3: string;
		inset: string;
	};
	motion: {
		ease: string;
		durHover: string;
		durEnter: string;
	};
}

// Extending palette interface to include custom colors
declare module '@mui/material/styles' {
	interface Palette {
		border: Palette['primary'];
		accent: Palette['primary'];
		// hover: {
		// 	primary: string;
		// 	secondary?: string;
		// };
	}
	interface PaletteOptions {
		border?: PaletteOptions['primary'];
		accent?: PaletteOptions['primary'];
		// hover?: {
		// 	primary?: string;
		// 	secondary?: string;
		// };
	}
	interface Theme {
		tokens: ThemeTokens;
	}
	interface ThemeOptions {
		tokens?: ThemeTokens;
	}
}

declare module '@mui/material/Paper' {
	interface PaperPropsVariantOverrides {
		soft: true;
	}
}

export const theme = createTheme({
	palette: {
		mode: 'light',

		primary: {
			main: '#14171b',
			light: '#4e5359',
			dark: '#000000',
			contrastText: '#fafafa',
		},

		// Secondary actions, outlined buttons
		secondary: {
			main: '#F5F5F5',
			light: '#FAFAFA',
			dark: '#E0E0E0',
			contrastText: '#212121',
		},

		background: {
			default: '#f9fafb',
			paper: '#ffffff',
		},

		text: {
			primary: '#14171b',
			secondary: '#757b81',
			disabled: '#BDBDBD',
		},

		success: {
			main: '#4CAF50',
			light: '#81C784',
			dark: '#388E3C',
			contrastText: '#FFFFFF',
		},
		error: {
			main: '#F44336',
			light: '#E57373',
			dark: '#D32F2F',
			contrastText: '#FFFFFF',
		},
		warning: {
			main: '#FF9800',
			light: '#FFB74D',
			dark: '#F57C00',
			contrastText: '#000000',
		},
		info: {
			main: '#2196F3',
			light: '#64B5F6',
			dark: '#1976D2',
			contrastText: '#FFFFFF',
		},

		// Action states colors
		action: {
			active: '#212121',
			hover: '#EDEDEDCB',
			selected: '#E0E0E0',
			disabled: '#BDBDBD',
			disabledBackground: '#F5F5F5',
			focus: 'rgba(0, 0, 0, 0.12)',
			hoverOpacity: 0.08,
		},

		// Dividers and borders (--m-line)
		divider: '#e3e5e8',

		// Custom palette extensions
		border: {
			main: '#E0E0E0',
			light: '#F5F5F5',
			dark: '#BDBDBD',
		},

		// Accent (--m-accent*): tinted-fill indigo used for active nav state,
		// icon chips and focus rings — never a full-saturation block.
		accent: {
			main: '#3f69d3',
			light: 'rgba(63, 105, 211, 0.10)',
			dark: '#1e41a8',
			contrastText: '#FFFFFF',
		},
	},
	typography: {
		fontFamily: FONT_PRIMARY,
		fontWeightRegular: 400,
		fontWeightMedium: 600,
		fontWeightBold: 700,

		// Headings
		h1: {
			fontWeight: 700,
			lineHeight: 1.3,
		},
		h2: {
			fontWeight: 700,
			lineHeight: 1.3,
		},
		h3: {
			fontWeight: 600,
			lineHeight: 1.3,
		},
		h4: {
			fontSize: '1.5rem',
			fontWeight: 600,
			lineHeight: 1.3,
		},
		h5: {
			fontSize: '1.25rem',
			fontWeight: 600,
			lineHeight: 1.3,
		},
		h6: {
			fontSize: '1.125rem',
			fontWeight: 600,
			lineHeight: 1.3,
		},

		subtitle1: {
			fontSize: '1.125rem',
			fontWeight: 500,
			lineHeight: 1.4,
		},
		subtitle2: {
			fontSize: '1rem',
			fontWeight: 500,
			lineHeight: 1.4,
		},

		body1: {
			fontSize: '1rem',
			lineHeight: 1.5,
		},
		body2: {
			fontSize: '0.875rem',
			lineHeight: 1.5,
		},

		caption: {
			fontSize: '0.75rem',
			lineHeight: 1.4,
		},
		overline: {
			fontSize: '0.65rem',
			fontWeight: 700,
			letterSpacing: '0.1em',
		},

		button: {
			fontWeight: 500,
			lineHeight: 1.57,
			textTransform: 'none',
		},
	},
	shape: {
		borderRadius: 10,
	},
	tokens: {
		ink2: '#4e5359',
		ink3: '#757b81',
		surfacePage: '#f9fafb',
		surfaceRaised: '#ffffff',
		surfaceSunken: '#f3f5f6',
		surfaceInset: '#f5f7f9',
		surfaceSidebar: '#fafbfc',
		lineStrong: '#d1d5d8',
		accentTint: 'rgba(63, 105, 211, 0.10)',
		accentTintStrong: 'rgba(63, 105, 211, 0.18)',
		positiveTint: 'rgba(15, 160, 92, 0.12)',
		warningTint: 'rgba(228, 158, 34, 0.14)',
		criticalTint: 'rgba(231, 0, 11, 0.10)',
		scrim: 'rgba(20, 23, 27, 0.45)',
		radius: {
			sm: 6,
			md: 8,
			lg: 10,
			xl: 14,
			'2xl': 18,
			'3xl': 22,
		},
		// Micro type ladder for UI chrome (nav labels, badges, meta text)
		fontSize: {
			'3xs': 11,
			'2xs': 11.5,
			xs: 12,
			sm: 12.5,
			md: 13,
			lg: 13.5,
			xl: 14,
			'2xl': 15,
			'3xl': 22,
			heading: 19,
		},
		elevation: {
			0: 'inset 0 0 0 1px rgba(20, 23, 27, 0.07)',
			1: 'inset 0 1px 0 #fff, inset 0 0 0 1px rgba(20, 23, 27, 0.07), 0 1px 2px rgba(20, 23, 27, 0.04)',
			2: 'inset 0 1px 0 #fff, inset 0 0 0 1px rgba(20, 23, 27, 0.06), 0 2px 4px rgba(20, 23, 27, 0.04), 0 12px 28px -14px rgba(20, 23, 27, 0.16)',
			3: 'inset 0 1px 0 #fff, 0 4px 8px rgba(20, 23, 27, 0.05), 0 24px 48px -20px rgba(20, 23, 27, 0.22)',
			inset: 'inset 2px 2px 5px rgba(20, 23, 27, 0.07), inset -2px -2px 5px #fff',
		},
		motion: {
			ease: 'cubic-bezier(.4,0,.2,1)',
			durHover: '140ms',
			durEnter: '220ms',
		},
	},
	// Component-specific overrides
	components: {
		MuiPaper: {
			styleOverrides: {
				root: ({ theme }) => ({
					border: `1px solid ${theme.palette.divider}`,
					backgroundColor: theme.palette.background.paper,
				}),
			},
		},
		MuiCard: {
			styleOverrides: {
				root: ({ theme }) => ({
					border: `1px solid ${theme.palette.divider}`,
					backgroundColor: theme.palette.background.default,
					boxShadow: 'none',
				}),
			},
			variants: [
				{
					props: { variant: 'soft' },
					style: ({ theme }) => ({
						border: 'none',
						backgroundColor: theme.tokens.surfaceRaised,
						borderRadius: theme.tokens.radius.xl,
						boxShadow: theme.tokens.elevation[2],
					}),
				},
			],
		},
		MuiButton: {
			styleOverrides: {
				root: ({ theme }) => ({
					boxShadow: 'none',
					textTransform: 'none',
					'&.MuiButton-outlinedPrimary': {
						borderColor: theme.palette.divider,
					},
				}),
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: ({ theme }) => ({
					'& .MuiOutlinedInput-notchedOutline': {
						borderColor: theme.palette.divider,
					},
					'&:hover .MuiOutlinedInput-notchedOutline': {
						borderColor: theme.palette.divider,
					},
					'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
						borderColor: theme.palette.divider,
					},
				}),
			},
		},
		MuiToggleButton: {
			styleOverrides: {
				root: ({ theme }) => ({
					borderColor: theme.palette.divider,
					color: theme.palette.text.primary,
					'&.Mui-selected': {
						backgroundColor: theme.palette.action.selected,
					},
				}),
			},
		},
		MuiIconButton: {
			styleOverrides: {
				root: ({ theme }) => ({
					boxShadow: 'none',
					color: theme.palette.text.primary,
					border: `1px solid ${theme.palette.divider}`,
					padding: '12px',
				}),
			},
		},
		MuiSelect: {
			defaultProps: {
				MenuProps: {
					slotProps: {
						paper: {
							sx: {
								bgcolor: 'background.default',
								'& .MuiList-padding': {
									p: 0,
								},
								'& .MuiMenuItem-root': {
									py: 1.2,
									px: 2,
									'&:hover': {
										bgcolor: 'action.hover',
									},
									'&.Mui-selected': {
										bgcolor: 'action.selected',
										'&:hover': {
											bgcolor: 'action.selected',
										},
									},
								},
							},
						},
					},
				},
			},
			styleOverrides: {
				root: {
					'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
						borderColor: 'divider',
					},
				},
			},
		},
	},
});
