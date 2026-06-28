import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

export default function Breadcrumb({ items = [] }) {
  return (
    <nav className="text-sm text-gray-500 mb-6">
      <ol className="flex items-center gap-2 flex-wrap">
        <li>
          <Link href="/" className="hover:text-red-600 transition">
            Home
          </Link>
        </li>

        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <FaChevronRight className="text-xs text-gray-400" />

            {item.href ? (
              <Link href={item.href} className="hover:text-red-600 transition">
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-900 font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
