"use client";

import { Button } from "@/utils/PrimeReactComponents";
import Link from "next/link";
import React from "react";

interface ButtonLinkProps {
    label: string;
    href: string;
    styleClass?: string;
}

const ButtonLink: React.FC<ButtonLinkProps> = ({ label, href, styleClass }) => {
    return (
        <Link href={href} passHref>
            <Button className={`p-button ${styleClass}`} label={label} />
        </Link>
    );
};

export default ButtonLink;
