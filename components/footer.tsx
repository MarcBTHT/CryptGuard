import Link from 'next/link';

type FooterLink = {
  href: string;
  label: string;
};

type FooterSectionProps = {
  title: string;
  links: FooterLink[];
};

// Composant réutilisable pour chaque section du footer
const FooterSection: React.FC<FooterSectionProps> = ({ title, links }) => (
    <div className="w-full sm:w-1/4 mb-6 sm:mb-0">
        <h3 className="font-bold text-lg text-white mb-2">{title}</h3>
        <ul>
            {links.map((link, index) => (
                <li key={index} className="pb-1 text-gray-600 text-sm">
                    <Link href={link.href}>{link.label}</Link>
                </li>
            ))}
        </ul>
    </div>
);

const Footer = () => {
    // Données des sections pour éviter la répétition
    const footerSections: FooterSectionProps[] = [
        {
            title: "About Us",
            links: [
                { href: "/about", label: "Our Company" },
                { href: "/careers", label: "Careers" },
                { href: "/foundation", label: "Foundation" }
            ]
        },
        {
            title: "Resources",
            links: [
                { href: "/faq", label: "FAQ" },
                { href: "/support", label: "Customer Support" },
                { href: "/blog", label: "Blog" }
            ]
        },
        {
            title: "Legal",
            links: [
                { href: "/terms", label: "Terms of Use" },
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/disclaimer", label: "Legal Disclaimer" }
            ]
        }
    ];

    return (
        <footer className="text-gray-800 w-full z-10">
            <div className="w-full px-4 sm:w-11/12 md:w-10/12 lg:w-9/12 xl:w-8/12 mx-auto text-center justify-center py-10">
                <div className="flex flex-wrap justify-between text-center">
                    {footerSections.map((section, index) => (
                        <FooterSection key={index} title={section.title} links={section.links} />
                    ))}
                </div>
                <div className="text-center text-xs text-gray-600 mt-3 border-t border-gray-500 pt-4">
                    © {new Date().getFullYear()} CryptGuard. All Rights Reserved.
                    <p>
                        By using this website, you accept our <Link href="/terms">Terms of Use</Link> and <Link href="/privacy">Privacy Policy</Link>.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;