import React from 'react';
import './css/aos.css';
import './css/bootstrap.min.css';
import './css/style.css';
import './css/font.css'
import './font/icomoon/style.css'
import $ from 'jquery';
import AOS from 'aos';
import { Link } from 'react-router-dom';
import Typed from 'react-typed';
import Scrollchor from 'react-scrollchor';
const Homepage = () => {
    AOS.init({
        duration: 800,
        easing: 'slide',
        once: true
    });

    var siteScroll = function () {
        $(window).scroll(function () {
            var st = $(this).scrollTop();
            if (st > 100) {
                $('.js-sticky-header').addClass('shrink sticky');
            } else {
                $('.js-sticky-header').removeClass('shrink sticky');
            }

        })
    };
    siteScroll();
    return (

        <React.Fragment>
            <div className="site-wrap">

                <div className="site-mobile-menu site-navbar-target">
                    <div className="site-mobile-menu-header">
                        <div className="site-mobile-menu-close mt-3">
                            <span className="icon-close2 js-menu-toggle"></span>
                        </div>
                    </div>
                    <div className="site-mobile-menu-body"></div>
                </div>

                <div className="border-bottom top-bar py-2 bg-dark" id="home-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <p className="mb-0">
                                    <span className="mr-3"><strong className="text-white">Phone:</strong> <Link to="#">+1 234 5678 9101</Link></span>
                                    <span><strong className="text-white">Email:</strong> <Link to="#">abc@domain.com</Link></span>
                                </p>
                            </div>
                            <div className="col-md-6">
                                <ul className="social-media">
                                    <li><Link to="#" className="p-2"><span className="icon-facebook"></span></Link></li>
                                    <li><Link to="#" className="p-2"><span className="icon-twitter"></span></Link></li>
                                    <li><Link to="#" className="p-2"><span className="icon-instagram"></span></Link></li>
                                    <li><Link to="#" className="p-2"><span className="icon-linkedin"></span></Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="sticky-wrapper" className="sticky-wrapper" style={{ height: '68px' }}>
                    <header className={`site-navbar py-4 bg-white js-sticky-header site-navbar-target`} id="header" role="banner">

                        <div className="container">
                            <div className="row align-items-center">

                                <div className="col-11 col-xl-2">
                                    <h1 className="mb-0 site-logo"><Link to="/" className="text-black h2 mb-0">Pfood<span className="text-primary">.</span> </Link></h1>
                                </div>
                                <div className="col-12 col-md-10 d-none d-xl-block">
                                    <nav className="site-navigation position-relative text-right" role="navigation">

                                        <ul className="site-menu main-menu js-clone-nav mr-auto d-none d-lg-block">
                                            <li><Scrollchor to="#home-section" className="nav-link">Trang chủ</Scrollchor></li>
                                            <li><Scrollchor to='#section1' className="nav-link">Sản phẩm</Scrollchor></li>
                                            <li>
                                                <Scrollchor to="#services-section" className="nav-link">Dịch vụ</Scrollchor>
                                            </li>
                                            <li className="has-children">
                                                <Scrollchor to="#about-section" className="nav-link">Về</Scrollchor>
                                                <ul className="dropdown">
                                                    <li><Scrollchor to="#about-section">Chúng tôi</Scrollchor></li>
                                                    <li><Scrollchor to="#team-section">Đội ngũ phát triển</Scrollchor></li>
                                                </ul>
                                            </li>
                                            <li>
                                                <Link to="/partner/sign-up" className="nav-link">Đối tác</Link>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>


                                <div className="d-inline-block d-xl-none ml-md-0 mr-auto py-3" style={{ position: 'relative', top: '3px' }}><Link to="#" className="site-menu-toggle js-menu-toggle text-black"><span className="icon-menu h3"></span></Link></div>

                            </div>
                        </div>
                    </header>
                </div>

                <div className="site-blocks-cover overlay" style={{ backgroundImage: `url(/images/homepage.jpg)` }} data-aos="fade" data-stellar-background-ratio="0.5">
                    <div className="container">
                        <div className="row align-items-center justify-content-center text-center">

                            <div className="col-md-12" data-aos="fade-up" data-aos-delay="400">

                                <div className="row justify-content-center mb-4">
                                    <div className="col-md-8 text-center">
                                        <h1><Typed
                                            strings={["Here you can find hardware", "Here you can find software", "Here you can find net tools"]}
                                            typeSpeed={80}
                                            backSpeed={80}
                                            backDelay={1000}
                                            smartBackspace
                                        /></h1>
                                        <p className="lead mb-5">Hello <Link to="#" target="_blank">World</Link></p>
                                        <div><Link data-fancybox data-ratio="2" to="#" className="btn btn-primary btn-md">Xem Video</Link></div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <section className="site-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 col-lg-4">
                                <div className="p-3 box-with-humber">
                                    <div className="number-behind">01.</div>
                                    <h2 className="text-primary">Innovate</h2>
                                    <p className="mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Et praesentium eos nulla qui commodi consectetur beatae fugiat. Veniam iste rerum perferendis.</p>
                                    <ul className="list-unstyled ul-check primary">
                                        <li>Customer Experience</li>
                                        <li>Product Management</li>
                                        <li>Proof of Concept</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-md-6 col-lg-4">
                                <div className="p-3 box-with-humber">
                                    <div className="number-behind">02.</div>
                                    <h2 className="text-primary">Create</h2>
                                    <p className="mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Et praesentium eos nulla qui commodi consectetur beatae fugiat. Veniam iste rerum perferendis.</p>
                                    <ul className="list-unstyled ul-check primary">
                                        <li>Web Design</li>
                                        <li>Branding</li>
                                        <li>Web &amp; App Development</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-md-6 col-lg-4">
                                <div className="p-3 box-with-humber">
                                    <div className="number-behind">03.</div>
                                    <h2 className="text-primary">Scale</h2>
                                    <p className="mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Et praesentium eos nulla qui commodi consectetur beatae fugiat. Veniam iste rerum perferendis.</p>
                                    <ul className="list-unstyled ul-check primary">
                                        <li>Social Media</li>
                                        <li>Paid Campaigns</li>
                                        <li>Marketing &amp; SEO</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section >

                <section className="site-section" id={"section1"}>
                        <div className="container">
                            <div className="row mb-5 justify-content-center">
                                <div className="col-md-8 text-center">
                                    <h2 className="text-black h1 site-section-heading text-center">Sản phẩm</h2>
                                    <p className="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores, itaque neque, delectus odio iure explicabo.</p>
                                </div>
                            </div>
                        </div>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-6 col-lg-4">
                                    <Link to="#" className="media-1" data-fancybox="gallery">
                                        <img src="images/img_1.jpg" alt="img" className="img-fluid" />
                                        <div className="media-1-content">
                                            <h2>Bonzai Tree</h2>
                                            <span className="category">Web Application</span>
                                        </div>
                                    </Link>
                                </div>
                                <div className="col-md-6 col-lg-4">
                                    <Link to="#" className="media-1" data-fancybox="gallery">
                                        <img src="images/img_2.jpg" alt="img" className="img-fluid" />
                                        <div className="media-1-content">
                                            <h2>Simple Woman</h2>
                                            <span className="category">Branding</span>
                                        </div>
                                    </Link>
                                </div>
                                <div className="col-md-6 col-lg-4">
                                    <Link to="#" className="media-1" data-fancybox="gallery">
                                        <img src="images/img_3.jpg" alt="img" className="img-fluid" />
                                        <div className="media-1-content">
                                            <h2>Fruits</h2>
                                            <span className="category">Website</span>
                                        </div>
                                    </Link>
                                </div>

                                <div className="col-md-6 col-lg-4">
                                    <Link to="#" className="media-1" data-fancybox="gallery">
                                        <img src="images/img_4.jpg" alt="img" className="img-fluid" />
                                        <div className="media-1-content">
                                            <h2>Design Material</h2>
                                            <span className="category">Web Application</span>
                                        </div>
                                    </Link>
                                </div>
                                <div className="col-md-6 col-lg-4">
                                    <Link to="#" className="media-1" data-fancybox="gallery">
                                        <img src="images/img_5.jpg" alt="img" className="img-fluid" />
                                        <div className="media-1-content">
                                            <h2>Handy Food</h2>
                                            <span className="category">Branding</span>
                                        </div>
                                    </Link>
                                </div>
                                <div className="col-md-6 col-lg-4">
                                    <Link to="#" className="media-1" data-fancybox="gallery">
                                        <img src="images/img_6.jpg" alt="img" className="img-fluid" />
                                        <div className="media-1-content">
                                            <h2>Cat With Cup</h2>
                                            <span className="category">Website</span>
                                        </div>
                                    </Link>
                                </div>


                            </div>
                        </div>
                </section >

                <section className="site-section border-bottom" id="services-section">
                    <div className="container">
                        <div className="row justify-content-center mb-5">
                            <div className="col-md-8 text-center" data-aos="fade-up">
                                <h2 className="text-black h1 site-section-heading text-center">Dịch vụ</h2>
                            </div>
                        </div>
                        <div className="row align-items-stretch">
                            <div className="col-md-6 col-lg-4 mb-4 mb-lg-4" data-aos="fade-up">
                                <div className="unit-4 d-flex">
                                    <div className="unit-4-icon mr-4"><span className="text-primary icon-laptop2"></span></div>
                                    <div>
                                        <h3>Web Design</h3>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis quis molestiae vitae eligendi at.</p>
                                        <p><Link to="#">Learn More</Link></p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4 mb-4 mb-lg-4" data-aos="fade-up" data-aos-delay="100">
                                <div className="unit-4 d-flex">
                                    <div className="unit-4-icon mr-4"><span className="text-primary icon-shopping_cart"></span></div>
                                    <div>
                                        <h3>eCommerce</h3>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis quis molestiae vitae eligendi at.</p>
                                        <p><Link to="#">Learn More</Link></p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4 mb-4 mb-lg-4" data-aos="fade-up" data-aos-delay="200">
                                <div className="unit-4 d-flex">
                                    <div className="unit-4-icon mr-4"><span className="text-primary icon-question_answer"></span></div>
                                    <div>
                                        <h3>Web Applications</h3>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis quis molestiae vitae eligendi at.</p>
                                        <p><Link to="#">Learn More</Link></p>
                                    </div>
                                </div>
                            </div>


                            <div className="col-md-6 col-lg-4 mb-4 mb-lg-4" data-aos="fade-up" data-aos-delay="300">
                                <div className="unit-4 d-flex">
                                    <div className="unit-4-icon mr-4"><span className="text-primary icon-format_paint"></span></div>
                                    <div>
                                        <h3>Branding</h3>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis quis molestiae vitae eligendi at.</p>
                                        <p><Link to="#">Learn More</Link></p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4 mb-4 mb-lg-4" data-aos="fade-up" data-aos-delay="400">
                                <div className="unit-4 d-flex">
                                    <div className="unit-4-icon mr-4"><span className="text-primary icon-extension"></span></div>
                                    <div>
                                        <h3>Copy Writing</h3>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis quis molestiae vitae eligendi at.</p>
                                        <p><Link to="#">Learn More</Link></p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4 mb-4 mb-lg-4" data-aos="fade-up" data-aos-delay="500">
                                <div className="unit-4 d-flex">
                                    <div className="unit-4-icon mr-4"><span className="text-primary icon-phonelink"></span></div>
                                    <div>
                                        <h3>Mobile Applications</h3>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis quis molestiae vitae eligendi at.</p>
                                        <p><Link to="#">Learn More</Link></p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                <div className="site-section" id="about-section">
                    <div className="container">
                        <div className="row mb-5">

                            <div className="col-md-5 ml-auto mb-5 order-md-2" data-aos="fade">
                                <img src="images/about_1.jpg" alt="img" className="img-fluid rounded" />
                            </div>
                            <div className="col-md-6 order-md-1" data-aos="fade">

                                <div className="row">

                                    <div className="col-12">
                                        <div className="text-left pb-1">
                                            <h2 className="text-black h1 site-section-heading">Về chúng tôi</h2>
                                        </div>
                                    </div>
                                    <div className="col-12 mb-4">
                                        <p className="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet incidunt magnam corrupti, odit eos harum quaerat nostrum voluptatibus aspernatur eligendi accusantium cum, impedit blanditiis voluptate commodi doloribus, nemo dignissimos recusandae.</p>
                                    </div>
                                    <div className="col-md-12 mb-md-5 mb-0 col-lg-6">
                                        <div className="unit-4">
                                            <div className="unit-4-icon mr-4 mb-3"><span className="text-secondary icon-phonelink"></span></div>
                                            <div>
                                                <h3>Web &amp; Mobile Specialties</h3>
                                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis quis consect.</p>
                                                <p className="mb-0"><Link to="#">Learn More</Link></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mb-md-5 mb-0 col-lg-6">
                                        <div className="unit-4">
                                            <div className="unit-4-icon mr-4 mb-3"><span className="text-secondary icon-extension"></span></div>
                                            <div>
                                                <h3>Intuitive Thinkers</h3>
                                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis quis.</p>
                                                <p className="mb-0"><Link to="#">Learn More</Link></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>


                <div className="site-section border-bottom" id="team-section">
                    <div className="container">
                        <div className="row justify-content-center mb-5">
                            <div className="col-md-7 text-center">
                                <h2 className="text-black h1 site-section-heading">Đội ngũ phát triển</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-lg-4 mb-5 mb-lg-0" data-aos="fade" data-aos-delay="100">
                                <div className="person text-center">
                                    <img src="images/person_2.jpg" alt="img" className="img-fluid rounded-circle w-50 mb-5" />
                                    <h3>John Rooster</h3>
                                    <p className="position text-muted">Co-Founder, President</p>
                                    <p className="mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi at consequatur unde molestiae quidem provident voluptatum deleniti quo iste error eos est praesentium distinctio cupiditate tempore suscipit inventore deserunt tenetur.</p>
                                    <ul className="ul-social-circle">
                                        <li><Link to="#"><span className="icon-facebook"></span></Link></li>
                                        <li><Link to="#"><span className="icon-twitter"></span></Link></li>
                                        <li><Link to="#"><span className="icon-linkedin"></span></Link></li>
                                        <li><Link to="#"><span className="icon-instagram"></span></Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4 mb-5 mb-lg-0" data-aos="fade" data-aos-delay="200">
                                <div className="person text-center">
                                    <img src="images/person_3.jpg" alt="img" className="img-fluid rounded-circle w-50 mb-5" />
                                    <h3>Tom Sharp</h3>
                                    <p className="position text-muted">Co-Founder, COO</p>
                                    <p className="mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi at consequatur unde molestiae quidem provident voluptatum deleniti quo iste error eos est praesentium distinctio cupiditate tempore suscipit inventore deserunt tenetur.</p>
                                    <ul className="ul-social-circle">
                                        <li><Link to="#"><span className="icon-facebook"></span></Link></li>
                                        <li><Link to="#"><span className="icon-twitter"></span></Link></li>
                                        <li><Link to="#"><span className="icon-linkedin"></span></Link></li>
                                        <li><Link to="#"><span className="icon-instagram"></span></Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4 mb-5 mb-lg-0" data-aos="fade" data-aos-delay="300">
                                <div className="person text-center">
                                    <img src="images/person_4.jpg" alt="img" className="img-fluid rounded-circle w-50 mb-5" />
                                    <h3>Winston Hodson</h3>
                                    <p className="position text-muted">Marketing</p>
                                    <p className="mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi at consequatur unde molestiae quidem provident voluptatum deleniti quo iste error eos est praesentium distinctio cupiditate tempore suscipit inventore deserunt tenetur.</p>
                                    <ul className="ul-social-circle">
                                        <li><Link to="#"><span className="icon-facebook"></span></Link></li>
                                        <li><Link to="#"><span className="icon-twitter"></span></Link></li>
                                        <li><Link to="#"><span className="icon-linkedin"></span></Link></li>
                                        <li><Link to="#"><span className="icon-instagram"></span></Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Link to="/partner/sign-up" className="bg-primary py-5 d-block">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md10"><h2 className="text-white">Trở thành đối tác ngay !</h2></div>
                        </div>
                    </div>
                </Link>

                <footer className="site-footer">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-9">
                                <div className="row">
                                    <div className="col-md-5">
                                        <h2 className="footer-heading mb-4">Về chúng tôi</h2>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque facere laudantium magnam voluptatum autem. Amet aliquid nesciunt veritatis aliquam.</p>
                                    </div>
                                    <div className="col-md-3 ml-auto">
                                        <h2 className="footer-heading mb-4">Features</h2>
                                        <ul className="list-unstyled">
                                            <li><Link to="#">Về chúng tôi</Link></li>
                                            <li><Link to="#">Sản phẩm</Link></li>
                                            <li><Link to="#">Dịch vụ</Link></li>
                                        </ul>
                                    </div>
                                    <div className="col-md-3">
                                        <h2 className="footer-heading mb-4">Follow Us</h2>
                                        <Link to="#" className="pl-0 pr-3"><span className="icon-facebook"></span></Link>
                                        <Link to="#" className="pl-3 pr-3"><span className="icon-twitter"></span></Link>
                                        <Link to="#" className="pl-3 pr-3"><span className="icon-instagram"></span></Link>
                                        <Link to="#" className="pl-3 pr-3"><span className="icon-linkedin"></span></Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <h2 className="footer-heading mb-4">Đăng ký nhận thông tin</h2>
                                <form action="#" method="post">
                                    <div className="input-group mb-3">
                                        <input type="text" className="form-control border-secondary text-white bg-transparent" placeholder="Email" aria-label="Enter Email" aria-describedby="button-addon2" />
                                        <div className="input-group-append">
                                            <button className="btn btn-primary text-white" type="button" id="button-addon2">Send</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="row pt-5 mt-5 text-center">
                            <div className="col-md-12">
                                <div className="border-top pt-5">
                                    <p>

                                        Copyright &copy; All rights reserved | This app is made with <i className="icon-heart text-danger" aria-hidden="true"></i> by <Link to="#" target="_blank" >Ffood</Link>

                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </footer>
            </div>

        </React.Fragment>

    );
}

export default Homepage;