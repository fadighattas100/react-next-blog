'use strict';

import Link from "next/link";

export default function Nav() {
    return (
        <nav className="navbar navbar-light bg-light" style={{padding: '10px 110px'}}>
            <Link  href="/">
                <a style={{color: "black"}}>Home</a>
            </Link>
        </nav>
    );
}