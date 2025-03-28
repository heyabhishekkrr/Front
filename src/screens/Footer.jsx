import React from 'react'

const Footer = () => {
    return (
        <>
        <div className='Foot'>
            <div className="Footer">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-lg-5 col-12 ft-1">
                            <h3><span>Portioabhi</span>.+</h3>
                            <p>Welcome to our website...</p>
                            <div className="footer-icons">
                                <i class="fa-brands fa-facebook"></i>
                                <i class="fa-brands fa-twitter"></i>
                                <i class="fa-brands fa-instagram"></i>
                                <i class="fa-brands fa-linkedin-in"></i>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3 col-12 ft-2 quicklinks">
                            <h5>Quick Links</h5>
                            <ul>
                                <li className="nav-item">
                                    <a className="" href="/">Services</a>
                                </li>
                                <li className="nav-item">
                                    <a className="" href="/">Portfolio</a>
                                </li>
                                <li className="nav-item">
                                    <a className="" href="/contact">Contact Us</a>
                                </li>
                                <li className="nav-item">
                                    <a className="" href="/">Services</a>
                                </li>
                                <li className="nav-item">
                                    <a className="" href="/">Portfolio</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-6 col-lg-4 col-12 ft-3">
                            <h5>Connect</h5>
                        
                            <p><i class="fa-solid fa-envelope"></i> rk1499955@gmail.com</p>
                            <p><i class="fa-solid fa-location-dot"></i>Darbhanga,Bihar</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='Last-footer'>
                <p>Develop By Abhishek</p>
            </div>
            </div>
        </>
    )
}

export default Footer