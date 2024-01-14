import Link from "next/link";
import Social, { social } from "./Social";

const footerList = {
    title: '',
    contents: [{
        text: '',
        href: ''
    }]
}

/**
 * @param {footerList} props 
 */
function FooterList(props) {
    return (
        <div>
            <h4 className="text-lg fw-medium">{props.title}</h4>
            <div className="d-flex flex-column gap-2 mt-2">
                {props.contents.map((content, i) => {
                    return <Link key={i} href={content.href} style={{ textDecoration: 'none'}}>{content.text}</Link>
                })}
            </div>
        </div>
    )
}


const footer = {
    socials: social,
    footerLists: [footerList]
}

/**
 * @param {footer} props 
 * @returns 
 */
export default function Footer(props) {
    return (
        <div className="container py-5">
            <div className="d-flex flex-column flex-md-row justify-content-between">
                <div className="me-0 me-md-5 text-center">
                    <Link href='/' style={{ textDecoration: 'none', color: 'black' }}>
                        <h1>
                            <b><span className="text-primary">Toko</span> Tama</b>
                        </h1>
                    </Link>

                    <div className="mt-3">
                        <p className="fw-medium text-center text-md-start">Find Us</p>
                        <div className="d-flex gap-2 justify-content-center justify-content-md-start">
                            {props.socials.map((social, i) => {
                                return <Social key={i} href={social.href} text={social.text} image={social.image} size={social.size} />
                            })}
                        </div>
                    </div>
                </div>

                {/* <div className="d-flex flex-column flex-md-row flex-md-wrap text-center text-md-start mt-5 mt-md-0 gap-5">
                    {props.footerLists.map((list, i) => {
                        return <FooterList key={i} title={list.title} contents={list.contents}></FooterList>
                    })}
                </div> */}
            </div>
        </div>
    )
}