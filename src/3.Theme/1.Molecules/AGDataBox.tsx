import React from 'react';
import { Box, Stack, useTheme, alpha } from '@mui/material';
import AGGlassBox from '../0.Atoms/AGGlassBox';
import AGTitle from '../0.Atoms/AGTitle';
import AGIcon from '../0.Atoms/AGIcon';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import RemoveIcon from '@mui/icons-material/Remove';

export interface AGDataBoxTrend {
    value?: string | number;
    direction: 'up' | 'down' | 'neutral';
    label?: string; // e.g. "vs last month"
}

export interface AGDataBoxProps {
    /** The title or label of the data point */
    title: string;
    /** The main numeric value to display */
    value: string | number;
    /** Optional trend information */
    trend?: AGDataBoxTrend;
    /** Optional icon to display alongside the data */
    icon?: React.ReactNode;
    /** Value color (theme token or CSS color) */
    valueColor?: string;
    /** If true, formats the value as a gradient using the primary theme colors */
    gradientValue?: boolean;
    /** Custom gradient for the value text */
    customGradient?: string;
}

const AGDataBox = ({
    title,
    value,
    trend,
    icon,
    valueColor = 'text.primary',
    gradientValue = false,
    customGradient
}: AGDataBoxProps) => {
    const theme = useTheme();

    const getTrendColor = (direction: 'up' | 'down' | 'neutral') => {
        switch (direction) {
            case 'up': return theme.palette.success.main;
            case 'down': return theme.palette.error.main;
            default: return theme.palette.text.secondary;
        }
    };

    const getTrendIcon = (direction: 'up' | 'down' | 'neutral') => {
        switch (direction) {
            case 'up': return <TrendingUpIcon fontSize="inherit" />;
            case 'down': return <TrendingDownIcon fontSize="inherit" />;
            default: return <RemoveIcon fontSize="inherit" />;
        }
    };

    // Determine value gradient/color
    const finalGradient = customGradient || (gradientValue ? 'primary.main, secondary.main' : undefined);

    return (
        <AGGlassBox
            glass
            glassBlur={15}
            glassOpacity={0.05} // Very subtle
            borderWidth={1}
            borderColor="divider"
            padding={3}
            rounded={24} // More rounded for modern feel
            shadow="0 2px 12px rgba(0,0,0,0.04)"
            hoverShadow="0 12px 32px rgba(0,0,0,0.12)"
            liftOnHover
            liftAmount={6}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                justifyContent: 'space-between',
                minWidth: 220,
                overflow: 'hidden', // Keep decorations inside
                position: 'relative',
                '&:hover .ag-databox-icon': {
                    transform: 'scale(1.1) rotate(5deg)',
                    opacity: 1
                }
            }}
        >
            {/* Background Decoration Blob */}
            <Box
                sx={{
                    position: 'absolute',
                    top: -40,
                    right: -40,
                    width: 140,
                    height: 140,
                    borderRadius: '50%',
                    background: finalGradient
                        ? `linear-gradient(135deg, ${theme.palette.primary.main}22, ${theme.palette.secondary.main}22)`
                        : `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.08)} 0%, transparent 70%)`,
                    pointerEvents: 'none',
                    filter: 'blur(20px)',
                    zIndex: 0
                }}
            />

            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={3} sx={{ zIndex: 1 }}>
                <AGTitle
                    variant="body2"
                    color="text.secondary"
                    weight={600}
                    sx={{
                        textTransform: 'uppercase',
                        letterSpacing: '0.8px',
                        fontSize: '0.75rem',
                        mt: 0.5
                    }}
                >
                    {title}
                </AGTitle>

                {icon && (
                    <Box className="ag-databox-icon" sx={{ transition: 'all 0.4s ease', opacity: 0.8 }}>
                        <AGIcon
                            size={48}
                            shape="rounded"
                            variant="gradient"
                            gradient="primary.light, primary.main"
                            iconScale={0.6}
                        >
                            {icon}
                        </AGIcon>
                    </Box>
                )}
            </Stack>

            <Stack spacing={0.5} sx={{ zIndex: 1 }}>
                <AGTitle
                    variant="h3"
                    weight={800} // Extra bold for premium feel
                    color={!finalGradient ? valueColor : undefined}
                    gradient={finalGradient}
                    sx={{
                        fontSize: '2.5rem',
                        lineHeight: 1.1,
                        letterSpacing: '-1px'
                    }}
                >
                    {value}
                </AGTitle>

                {trend && (
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        mt={1}
                        sx={{
                            opacity: 0.9
                        }}
                    >
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            color: getTrendColor(trend.direction),
                            bgcolor: alpha(getTrendColor(trend.direction), 0.08),
                            px: 1.2,
                            py: 0.4,
                            borderRadius: 100,
                            fontSize: '0.8125rem',
                            fontWeight: 700,
                            border: `1px solid ${alpha(getTrendColor(trend.direction), 0.15)}`
                        }}>
                            <Box component="span" sx={{ display: 'flex', mr: 0.5, fontSize: '1.1em' }}>
                                {getTrendIcon(trend.direction)}
                            </Box>
                            {trend.value}
                        </Box>
                        {trend.label && (
                            <AGTitle variant="caption" color="text.secondary" weight={500}>
                                {trend.label}
                            </AGTitle>
                        )}
                    </Stack>
                )}
            </Stack>
        </AGGlassBox>
    );
};

export default AGDataBox;
