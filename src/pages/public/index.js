import React from 'react';
import './css/aos.css';
import './css/bootstrap.min.css';
import './css/style.css';
import $ from 'jquery'; 
import AOS from 'aos';
import { Link } from 'react-router-dom';
const Homepage = () => {
    AOS.init({
        duration: 800,
        easing: 'slide',
        once: true
    });

    var siteScroll = function() {

  	

        $(window).scroll(function() {
  
            var st = $(this).scrollTop();
  
            if (st > 100) {
                $('.js-sticky-header').addClass('shrink');
            } else {
                $('.js-sticky-header').removeClass('shrink');
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
                                    <span className="mr-3"><strong className="text-white">Phone:</strong> <Link to="tel://#">+1 234 5678 9101</Link></span>
                                    <span><strong className="text-white">Email:</strong> <Link to="#">info@yourdomain.com</Link></span>
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
                <div id="sticky-wrapper" class="sticky-wrapper" style={{height: '68px'}}>
                <header className="site-navbar py-4 bg-white js-sticky-header site-navbar-target" role="banner">

                    <div className="container">
                        <div className="row align-items-center">

                            <div className="col-11 col-xl-2">
                                <h1 className="mb-0 site-logo"><Link to="index.html" className="text-black h2 mb-0">Create<span className="text-primary">.</span> </Link></h1>
                            </div>
                            <div className="col-12 col-md-10 d-none d-xl-block">
                                <nav className="site-navigation position-relative text-right" role="navigation">

                                    <ul className="site-menu main-menu js-clone-nav mr-auto d-none d-lg-block">
                                        <li><Link to="#home-section" className="nav-link">Home</Link></li>
                                        <li><Link to="#work-section" className="nav-link">Work</Link></li>
                                        <li>
                                            <Link to="#services-section" className="nav-link">Services</Link>
                                        </li>
                                        <li className="has-children">
                                            <Link to="#about-section" className="nav-link">About</Link>
                                            <ul className="dropdown">
                                                <li><Link to="#about-section">Specialties</Link></li>
                                                <li><Link to="#team-section">Our Team</Link></li>
                                            </ul>
                                        </li>
                                        <li><Link to="#blog-section" className="nav-link">Blog</Link></li>
                                        <li><Link to="#contact-section" className="nav-link">Contact</Link></li>
                                    </ul>
                                </nav>
                            </div>


                            <div className="d-inline-block d-xl-none ml-md-0 mr-auto py-3" style={{ position: 'relative', top: '3px' }}><Link to="#" className="site-menu-toggle js-menu-toggle text-black"><span className="icon-menu h3"></span></Link></div>

                        </div>
                    </div>
                </header>
                </div>
                <div class="site-blocks-cover overlay" style ={ { backgroundImage: `url(/images/hero_1.jpg)` } } data-aos="fade" data-stellar-background-ratio="0.5">
                    <div class="container">
                        <div class="row align-items-center justify-content-center text-center">

                            <div class="col-md-12" data-aos="fade-up" data-aos-delay="400">

                                <div class="row justify-content-center mb-4">
                                    <div class="col-md-8 text-center">
                                        <h1>We Love To Build <span class="typed-words"></span></h1>
                                        <p class="lead mb-5">Free Web Template by <Link to="#" target="_blank">Colorlib</Link></p>
                                        <div><a data-fancybox data-ratio="2" href="https://vimeo.com/317571768" class="btn btn-primary btn-md">Watch Video</a></div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <section class="site-section">
      <div class="container">
        <div class="row">
          <div class="col-md-6 col-lg-4">
            <div class="p-3 box-with-humber">
              <div class="number-behind">01.</div>
              <h2 class="text-primary">Innovate</h2>
              <p class="mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Et praesentium eos nulla qui commodi consectetur beatae fugiat. Veniam iste rerum perferendis.</p>
              <ul class="list-unstyled ul-check primary">
                <li>Customer Experience</li>
                <li>Product Management</li>
                <li>Proof of Concept</li>
              </ul>
            </div>
          </div>

          <div class="col-md-6 col-lg-4">
            <div class="p-3 box-with-humber">
              <div class="number-behind">02.</div>
              <h2 class="text-primary">Create</h2>
              <p class="mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Et praesentium eos nulla qui commodi consectetur beatae fugiat. Veniam iste rerum perferendis.</p>
              <ul class="list-unstyled ul-check primary">
                <li>Web Design</li>
                <li>Branding</li>
                <li>Web &amp; App Development</li>
              </ul>
            </div>
          </div>

          <div class="col-md-6 col-lg-4">
            <div class="p-3 box-with-humber">
              <div class="number-behind">03.</div>
              <h2 class="text-primary">Scale</h2>
              <p class="mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Et praesentium eos nulla qui commodi consectetur beatae fugiat. Veniam iste rerum perferendis.</p>
              <ul class="list-unstyled ul-check primary">
                <li>Social Media</li>
                <li>Paid Campaigns</li>
                <li>Marketing &amp; SEO</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
            </div>

        </React.Fragment>

    );
}

export default Homepage;