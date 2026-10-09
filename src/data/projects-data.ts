/**
 * Privilege Interior Solutions - Projects Data Contract
 *
 * Real authentic assets from local public/assets only.
 * Strictly NO fabricated project facts (no fake client names, locations, dates, or square footage).
 * Uses neutral verified descriptive labels (RESIDENTIAL INTERIORS, MODULAR KITCHEN, LIVING & DINING, etc.)
 */

export interface ProjectEntry {
  readonly id: string;
  readonly number: string;
  readonly category: string;
  readonly descriptor: string;
  readonly scope: string;
  readonly image: string;
  readonly alt: string;
  readonly orientation: 'landscape' | 'portrait';
  readonly year?: string;
}

export const AUTHENTIC_PROJECTS: readonly ProjectEntry[] = [
  {
    id: 'living-dining-suite',
    number: '01',
    category: 'RESIDENTIAL INTERIORS',
    descriptor: 'Living & Dining Suite',
    scope: 'Turnkey Living, Ambient Lighting & Faux Ceiling Detail',
    image: '/assets/audit_candidates/HDR-6-clean.jpg',
    alt: 'Privilege Interiors — Contemporary Living Room with Ambient Ceiling Cove and Dining Suite',
    orientation: 'landscape'
  },
  {
    id: 'modular-island-kitchen',
    number: '02',
    category: 'MODULAR KITCHEN',
    descriptor: 'Modular Island & Cabinetry',
    scope: 'Seamless Cabinetry, Quartz Waterfall Island & Integrated Storage',
    image: '/assets/audit_candidates/19_Budget-Friendly_Modern_Kitchen_Ideas_for_a_Sleek_Look.jpg',
    alt: 'Privilege Interiors — Contemporary Modular Kitchen with Island Breakfast Counter',
    orientation: 'portrait'
  },
  {
    id: 'master-bedroom-suite',
    number: '03',
    category: 'MASTER BEDROOM',
    descriptor: 'Master Bedroom Suite',
    scope: 'Custom Headboard, Full-Height Wardrobes & Ambient Vanity Bay',
    image: '/assets/audit_candidates/HDR-30-clean.jpg',
    alt: 'Privilege Interiors — Master Bedroom with Upholstered Backing and Fitted Wardrobe Joinery',
    orientation: 'landscape'
  },
  {
    id: 'dining-partition-suite',
    number: '04',
    category: 'RESIDENTIAL INTERIORS',
    descriptor: 'Dining & Partition Architecture',
    scope: 'Illuminated Portal Frame, Display Cabinetry & Architectural Glasswork',
    image: '/assets/audit_candidates/HDR-10-clean.jpg',
    alt: 'Privilege Interiors — Bespoke Dining Area with Backlit Portal Frame and Display Cabinets',
    orientation: 'portrait'
  },
  {
    id: 'entrance-foyer-lighting',
    number: '05',
    category: 'RESIDENTIAL INTERIORS',
    descriptor: 'Foyer & Architectural Portal',
    scope: 'Concealed LED Portal, Textured Wall Cladding & Sculptural Lighting',
    image: '/assets/audit_candidates/HDR-11-clean.jpg',
    alt: 'Privilege Interiors — Entrance Foyer with Warm Illuminated Timber Portal and Custom Lighting',
    orientation: 'landscape'
  },
  {
    id: 'study-library-joinery',
    number: '06',
    category: 'RESIDENTIAL INTERIORS',
    descriptor: 'Library & Custom Study Joinery',
    scope: 'Floor-to-Ceiling Bookshelf, Concealed Shelf Lighting & Timber Cladding',
    image: '/assets/audit_candidates/HDR-12-clean.jpg',
    alt: 'Privilege Interiors — Custom Built-in Library Wall and Integrated Ambient Lighting',
    orientation: 'portrait'
  },
  {
    id: 'walk-in-wardrobe-suite',
    number: '07',
    category: 'BEDROOM & WARDROBE',
    descriptor: 'Walk-in Wardrobe & Dressing Suite',
    scope: 'Smoked Glass Wardrobes, Integrated Lighting & Island Storage',
    image: '/assets/audit_candidates/download_(1).jpg',
    alt: 'Privilege Interiors — Modern Walk-in Closet with Backlit Shelving and Central Island Drawers',
    orientation: 'portrait'
  },
  {
    id: 'study-glass-partition',
    number: '08',
    category: 'RESIDENTIAL INTERIORS',
    descriptor: 'Private Study & Glass Partition',
    scope: 'Sliding Partition, Built-in Floating Desk & Overhead Storage',
    image: '/assets/audit_candidates/HDR-14-clean.jpg',
    alt: 'Privilege Interiors — Compact Workstation with Sliding Glass Door and Overhead Storage',
    orientation: 'portrait'
  }
];
