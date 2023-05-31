
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedin,
} from "react-icons/fa";

import ContentWrapper from "../contentWrapper/ContentWrapper";

import "./style.scss";

const Footer = () => {
    return (
        <footer className="footer">
            <ContentWrapper>
                <ul className="menuItems">
                    <li className="menuItem">Terms Of Use</li>
                    <li className="menuItem">Privacy-Policy</li>
                    <li className="menuItem">About</li>
                    <li className="menuItem">Blog</li>
                    <li className="menuItem">FAQ</li>
                </ul>
                <div className="infoText">
                   This website built with 💛 by Harikrishna
                </div>
                <div className="socialIcons">
                    <a className="icon" href="/">
                        <FaFacebookF />
                    </a>
                    <a className="icon" href="https://www.instagram.com/harikrishna92364/">
                        <FaInstagram />
                    </a>
                    <a className="icon" href="https://twitter.com/Harikri35938819">
                        <FaTwitter />
                    </a>
                    <a className="icon" href="https://www.linkedin.com/in/harikrishna2364">
                        <FaLinkedin />
                    </a>
                </div>
            </ContentWrapper>
        </footer>
    );
};

export default Footer;