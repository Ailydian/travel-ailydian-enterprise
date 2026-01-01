/**
 * UNIFIED LAYOUT CONSTANTS - SINGLE SOURCE OF TRUTH
 *
 * All header and sidebar components MUST use these constants for consistent sizing.
 * This ensures pixel-perfect alignment across the entire application.
 *
 * @version 2.0.0
 * @author Travel LyDian Elite Frontend Team
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface HeaderConfig {
  height: {
    mobile: string;
    tablet: string;
    desktop: string;
    heightPx: number;
  };
  padding: {
    x: string;
    y: string;
  };
  maxWidth: string;
  zIndex: string;
  menu: {
    itemPadding: string;
    itemHeight: string;
    iconSize: string;
    fontSize: string;
    gap: string;
  };
  dropdown: {
    minWidth: string;
    maxHeight: string;
    padding: string;
    zIndex: string;
  };
  transitions: {
    duration: string;
    timing: string;
  };
}

export interface SidebarConfig {
  width: {
    expanded: string;
    collapsed: string;
    mobile: string;
    widthPx: {
      expanded: number;
      collapsed: number;
      mobile: number;
    };
  };
  padding: {
    x: string;
    y: string;
    item: string;
  };
  zIndex: string;
  menu: {
    itemHeight: string;
    iconSize: string;
    fontSize: string;
    gap: string;
  };
  transitions: {
    duration: string;
    timing: string;
  };
}

export interface LayoutConstants {
  header: HeaderConfig;
  sidebar: SidebarConfig;
  breakpoints: {
    mobile: number;
    tablet: number;
    desktop: number;
    wide: number;
  };
}

// ============================================================================
// LAYOUT CONSTANTS CONFIGURATION
// ============================================================================

export const LAYOUT_CONSTANTS: Readonly<LayoutConstants> = {
  // ========================================
  // HEADER CONFIGURATION
  // ========================================
  header: {
    height: {
      mobile: 'h-16',        // 64px - consistent across mobile
      tablet: 'sm:h-16',     // 64px - consistent across tablet
      desktop: 'md:h-16',    // 64px - consistent across desktop
      heightPx: 64,          // Numeric value for calculations
    },
    padding: {
      x: 'px-4 sm:px-6 lg:px-8',  // Responsive horizontal padding
      y: 'py-0',                   // No vertical padding (height controlled by h-16)
    },
    maxWidth: 'max-w-7xl',         // Container max width (1280px)
    zIndex: 'z-50',                // Header z-index

    // Menu item styling
    menu: {
      itemPadding: 'px-4 py-2',    // Menu item padding
      itemHeight: 'h-10',          // Menu item height (40px)
      iconSize: 'w-4 h-4',         // Icon size (16px)
      fontSize: 'text-sm',         // Font size
      gap: 'space-x-2',            // Gap between icon and text
    },

    // Dropdown menus
    dropdown: {
      minWidth: 'min-w-64',        // Minimum width (256px)
      maxHeight: 'max-h-96',       // Maximum height (384px)
      padding: 'p-2',              // Dropdown padding
      zIndex: 'z-[60]',            // Dropdown z-index (above header)
    },

    // Transitions
    transitions: {
      duration: 'duration-300',    // Animation duration
      timing: 'ease-out',          // Timing function
    },
  },

  // ========================================
  // SIDEBAR CONFIGURATION
  // ========================================
  sidebar: {
    width: {
      expanded: 'w-64',            // 256px - expanded sidebar
      collapsed: 'w-20',           // 80px - collapsed sidebar (icon only)
      mobile: 'w-64',              // 256px - mobile drawer
      widthPx: {
        expanded: 256,             // Numeric value for calculations
        collapsed: 80,             // Numeric value for calculations
        mobile: 256,               // Numeric value for calculations
      },
    },
    padding: {
      x: 'px-3',                   // Horizontal padding
      y: 'py-4',                   // Vertical padding
      item: 'px-3 py-2.5',         // Menu item padding
    },
    zIndex: 'z-40',                // Sidebar z-index (below header)

    // Menu item styling
    menu: {
      itemHeight: 'h-10',          // Menu item height (40px)
      iconSize: 'w-5 h-5',         // Icon size (20px)
      fontSize: 'text-sm',         // Font size
      gap: 'gap-3',                // Gap between icon and text
    },

    // Transitions
    transitions: {
      duration: 'duration-300',    // Animation duration
      timing: 'ease-out',          // Timing function
    },
  },

  // ========================================
  // RESPONSIVE BREAKPOINTS
  // ========================================
  breakpoints: {
    mobile: 640,    // sm: 640px
    tablet: 768,    // md: 768px
    desktop: 1024,  // lg: 1024px
    wide: 1280,     // xl: 1280px
  },
} as const;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get combined header height classes
 */
export const getHeaderHeightClasses = (): string => {
  const { mobile, tablet, desktop } = LAYOUT_CONSTANTS.header.height;
  return `${mobile} ${tablet} ${desktop}`;
};

/**
 * Get combined header padding classes
 */
export const getHeaderPaddingClasses = (): string => {
  const { x, y } = LAYOUT_CONSTANTS.header.padding;
  return `${x} ${y}`;
};

/**
 * Get full header container classes
 */
export const getHeaderContainerClasses = (): string => {
  return `${LAYOUT_CONSTANTS.header.maxWidth} mx-auto ${getHeaderPaddingClasses()}`;
};

/**
 * Get full header classes (for sticky header)
 */
export const getHeaderClasses = (): string => {
  return `sticky top-0 ${LAYOUT_CONSTANTS.header.zIndex} ${getHeaderHeightClasses()}`;
};

/**
 * Get sidebar width classes based on state
 */
export const getSidebarWidthClasses = (collapsed: boolean = false): string => {
  return collapsed
    ? LAYOUT_CONSTANTS.sidebar.width.collapsed
    : LAYOUT_CONSTANTS.sidebar.width.expanded;
};

/**
 * Get sidebar padding classes
 */
export const getSidebarPaddingClasses = (): string => {
  const { x, y } = LAYOUT_CONSTANTS.sidebar.padding;
  return `${x} ${y}`;
};

/**
 * Get menu item classes (for both header and sidebar)
 */
export const getMenuItemClasses = (location: 'header' | 'sidebar' = 'header'): string => {
  const config = LAYOUT_CONSTANTS[location].menu;
  return `flex items-center ${config.gap} ${config.itemPadding} ${config.fontSize} font-medium rounded-lg transition-all ${LAYOUT_CONSTANTS[location].transitions.duration} ${LAYOUT_CONSTANTS[location].transitions.timing}`;
};

/**
 * Get icon size classes
 */
export const getIconSizeClasses = (location: 'header' | 'sidebar' = 'header'): string => {
  return LAYOUT_CONSTANTS[location].menu.iconSize;
};

/**
 * Calculate main content padding to account for fixed header
 */
export const getMainContentPaddingTop = (): string => {
  return `pt-16`; // Same as header height (64px)
};

/**
 * Calculate main content margin when sidebar is present
 */
export const getMainContentMarginLeft = (sidebarCollapsed: boolean = false): string => {
  return sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64';
};

// ============================================================================
// PRESET CLASS COMBINATIONS
// ============================================================================

export const PRESET_CLASSES = {
  // Header presets
  headerContainer: `${getHeaderContainerClasses()} flex items-center justify-between`,
  headerLogo: 'flex items-center gap-2 text-xl font-bold',
  headerNav: 'hidden lg:flex items-center gap-1',
  headerActions: 'flex items-center gap-3',
  headerMenuItem: `${getMenuItemClasses('header')} hover:bg-lydian-bg-surface/10 active:bg-lydian-bg-surface/20`,
  headerMenuItemActive: `${getMenuItemClasses('header')} bg-blue-50 text-lydian-primary`,

  // Sidebar presets
  sidebarContainer: `fixed inset-y-0 left-0 ${LAYOUT_CONSTANTS.sidebar.zIndex} transition-all ${LAYOUT_CONSTANTS.sidebar.transitions.duration}`,
  sidebarNav: `${getSidebarPaddingClasses()} space-y-1`,
  sidebarMenuItem: `${getMenuItemClasses('sidebar')} hover:bg-lydian-bg-surface/10 active:bg-lydian-bg-surface/20`,
  sidebarMenuItemActive: `${getMenuItemClasses('sidebar')} bg-blue-50 text-lydian-primary`,

  // Dropdown presets
  dropdown: `absolute ${LAYOUT_CONSTANTS.header.dropdown.zIndex} ${LAYOUT_CONSTANTS.header.dropdown.minWidth} ${LAYOUT_CONSTANTS.header.dropdown.maxHeight} ${LAYOUT_CONSTANTS.header.dropdown.padding} bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-lydian-border overflow-y-auto`,
} as const;

// ============================================================================
// EXPORTS
// ============================================================================

export default LAYOUT_CONSTANTS;

// Export individual configs for convenience
export const HEADER_CONFIG = LAYOUT_CONSTANTS.header;
export const SIDEBAR_CONFIG = LAYOUT_CONSTANTS.sidebar;
export const BREAKPOINTS = LAYOUT_CONSTANTS.breakpoints;
