"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const Nav = () => {
  return (
    <nav className = "flex-between w-full mb-16 pt-3">
        <Link href = "/" className = "flex gap-2 flex-center">
            <Image
                src = "/assets/images/nivellogo.png"
                alt = "NivelMate Logo"
                width = {50}
                height = {50}
                className = "object-contain"
            />
        </Link>
    </nav>
  )
}

export default Nav