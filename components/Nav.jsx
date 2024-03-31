"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const Nav = () => {
  return (
    <nav className = "flex-between w-full mb-16 pt-3">
        <Link href = "/" className = "flex gap-2 flex-center">
            <Image
                src = "/assets/images/nivelmatelogo.svg"
                alt = "NivelMate Logo"
                width = {20}
                height = {20}
                className = "object-contain"
            />
            <p className = "logo_text">NivelMate</p>
        </Link>
        <br className = "max-md:hidden" />
        <div className = "sm:flex hidden">
            <div className = "flex gap-3 md:gap-5">
                <Link href = "/about" className = "outline_btn">
                    About
                </Link>
            </div>
        </div>
    </nav>
  )
}

export default Nav