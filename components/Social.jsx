import Link from "next/link";
import Image from "next/image";

export const social = {
    image: '',
    href: '',
    text: '',
    className: '',
    size: 0
}

/**
 * @param {social} props 
 */
export default function Social(props) {
    return (
        <Link href={props.href}>
            <Image src={props.image} alt="social" width={props.size} height={props.size}></Image>
        </Link>
    )
}