import type { NavbarMeta } from './Navbar';

interface SectionModule {
    NavbarInfo?: NavbarMeta;
    [key: string]: unknown;
}

export const loadNavbarSections = (): NavbarMeta[] => {
    // finds all section files at build time
    const sectionModules = import.meta.glob('../sections/*.section.tsx', {
        eager: true,
    });

    const sections: NavbarMeta[] = [];

    for (const path in sectionModules) {
        const module = sectionModules[path] as SectionModule;

        if (module.NavbarInfo) {
            sections.push(module.NavbarInfo);
        }
    }

    return sections
        .filter(Boolean)
        .sort(
            (a, b) =>
                (a.priority ?? sections.length + 1) -
                (b.priority ?? sections.length + 1)
        );
};
