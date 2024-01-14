import Navbar from './Navbar'
import Footer from './Footer'
import Head from 'next/head'
import auth from "@/api/auth";

export async function getStaticProps() {
    const res = await auth.verify()
    return {
        props: {
            jwt: res.status === 200 ? res.data : {}
        },
    }
}

const main = {
    title: '',
    description: '',
    className: '',
    noFooter: false
}

/**
 * 
 * @param {main} props
 * @returns 
 */
export default function Main(props) {
    const socials = [
        { size: 21, href: '#', image: '/socials/facebook.svg' },
        { size: 20, href: '#', image: '/socials/instagram.svg' },
        { size: 20, href: '#', image: '/socials/whatsapp.svg' },
        { size: 19, href: '#', image: '/socials/tiktok.svg' },
        { size: 17, href: '#', image: '/socials/location.svg' },
    ]

    const footer = [
        {
            title: 'Navigation',
            contents: [
                { text: 'Home', href: '#' },
                { text: 'Product', href: '#' },
                { text: 'Contact', href: '#' },
            ]
        },
    ]

    return (
        <div>
            <Head>
                <title>{props.title}</title>
                <link rel="icon" href="/icon.png" />
                <meta property="og:title" content={props.title} />
                <meta property="og:description" content={props.description} />
            </Head>
            <main className={`${props.className}`}>
                <Navbar socials={socials} />
                {props.children}
                { props.noFooter ? ( <div></div> ) : ( <Footer socials={socials} footerLists={footer} /> )}
            </main>
        </div>
    )
}