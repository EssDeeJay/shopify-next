import React from "react";
import Link from "next/link";

export default function NavAdmin() {
  return (
    <header className="border-b sticky top-0 z-20 bg-white">
      <div className="flex items-center max-w-6xl pt-4 pb-2 px-4 mx-auto lg:max-w-screen-xl">
        <Link href="/admin" passHref>
          <a className="cursor-pointer">
            <span className="text-lg pt-1 font-bold">Admin</span>
          </a>
        </Link>
        <Link href="/admin">
          <a className="cursor-pointer">
            <span className="text-md pt-1 ml-6">Products</span>
          </a>
        </Link>
        <Link href="/admin/collections-management">
          <a className="cursor-pointer">
            <span className="text-md pt-1 ml-6">Collections</span>
          </a>
        </Link>
        <Link href="/admin/orders-management">
          <a className="cursor-pointer">
            <span className="text-md pt-1 ml-6">Orders</span>
          </a>
        </Link>
      </div>
    </header>
  );
}
