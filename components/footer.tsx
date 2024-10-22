import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="text-gray-800 w-full z-10">
            <div className="w-full px-4 sm:w-11/12 md:w-10/12 lg:w-9/12 xl:w-8/12 mx-auto text-center justify-center py-10">
                <div className="flex flex-wrap justify-between text-center">
                    <div className="w-full sm:w-1/4 mb-6 sm:mb-0">
                        <h3 className="font-bold text-lg text-white mb-2">About Us</h3>
                        <ul>
                            <li className="pb-1 text-gray-600 text-sm"><Link href="/about">Our Company</Link></li>
                            <li className="pb-1 text-gray-600 text-sm"><Link href="/careers">Careers</Link></li>
                            <li className="pb-1 text-gray-600 text-sm"><Link href="/foundation">Foundation</Link></li>
                        </ul>
                    </div>
                    <div className="w-full sm:w-1/4 mb-6 sm:mb-0">
                        <h3 className="font-bold text-lg text-white mb-2">Resources</h3>
                        <ul>
                            <li className="pb-1 text-gray-600 text-sm"><Link href="/faq">FAQ</Link></li>
                            <li className="pb-1 text-gray-600 text-sm"><Link href="/support">Customer Support</Link></li>
                            <li className="pb-1 text-gray-600 text-sm"><Link href="/blog">Blog</Link></li>
                        </ul>
                    </div>
                    <div className="w-full sm:w-1/4">
                        <h3 className="font-bold text-lg text-white mb-2">Legal</h3>
                        <ul>
                            <li className="pb-1 text-gray-600 text-sm"><Link href="/terms">Terms of Use</Link></li>
                            <li className="pb-1 text-gray-600 text-sm"><Link href="/privacy">Privacy Policy</Link></li>
                            <li className="pb-1 text-gray-600 text-sm"><Link href="/disclaimer">Legal Disclaimer</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="text-center text-xs text-gray-600 mt-3 border-t border-gray-500 pt-4">
                    © {new Date().getFullYear()} CryptGuard. All Rights Reserved.
                    <p>By using this website, you accept our <Link href="/terms">Terms of Use</Link> and <Link href="/privacy">Privacy Policy</Link>.</p>
                </div>
            </div>
        </footer>
    );
}
export default Footer;