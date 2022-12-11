import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-dark text-center p-3 fixed-bottom">
            <div>
                © { new Date().getFullYear() } Copyright&nbsp;:&nbsp;
                <a style={{ color: "black", textDecoration: "none" }} 
                href="https://aziz-rbaii.netlify.app/" 
                target="_blank">aziz-rbaii.netlify.app</a>
            </div>
        </footer>
    )
}

export default Footer