/**
 * Privilege Interior Solutions - Navigation Data Contract
 * Strictly limited to verified client routes and approved items.
 */

export interface NavRouteItem {
  readonly label: string;
  readonly path: string;
  readonly isExternal?: boolean;
}

export const APPROVED_NAV_ROUTES: readonly NavRouteItem[] = [
  { label: 'HOME', path: '/' },
  { label: 'ABOUT US', path: '/about' },
  { label: 'SERVICES', path: '/services' },
  { label: 'PROJECTS', path: '/projects' },
  { label: 'CONTACT US', path: '/contact' }
] as const;

export const PRIMARY_CTA: NavRouteItem = {
  label: 'ENQUIRE',
  path: '/contact'
} as const;

export const VERIFIED_BRAND = {
  companyName: 'Privilege Interior Solutions',
  shortName: 'Privilege Interiors',
  logoAssetPath: '/assets/logo-new.png',
  footerLogoAssetPath: '/assets/logo-footer.png',
  logoAltText: 'Privilege Interior Solutions — Official Logo',
  contactSummary: {
    primaryPhone: '+91 8277738659',
    secondaryPhone: '+91 9353152080',
    email: 'info@privilegeinteriorsolutions.com',
    address: 'S.M.V Road, Near Nano Hospitals, Arekere, Bengaluru, Karnataka 560076'
  }
} as const;
