import React from 'react';
import Logo from "../../assets/images/imgpng.png";;

function Footer() {

    return (
        <div>
            <section className='bg-dark text-light p-3 text-opacity-50'>
                <div className='container w-25 '>
                    <div className='d-flex justify-content-center align-items-center gap-3'>
                        <p className='mt-3 '>© 2025 CICMA by EAME</p>
                        <img src={Logo} alt="Logo" className='w-25' />
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Footer;