import React, { Component } from 'react';
import './footer-distributed.css';

class index extends Component {


    render() {

        return (
            <footer className="footer-distributed">

                <div className="footer-right">
                    <p className="countUser footer-links"></p>
                    <a href="#0"><i className="fa fa-facebook"></i></a>
                    <a href="#0"><i className="fa fa-twitter"></i></a>
                    <a href="#0"><i className="fa fa-linkedin"></i></a>
                    <a href="#0"><i className="fa fa-github"></i></a>

                </div>

                <div className="footer-left">
                    <p className="footer-links">
                        <a href="/">Home</a>
                        ·
                        <a href="#0">About</a>
                        ·
                        <a href="#0">Contact</a>
                    </p>

                    <p>Tai Game Khung &copy; 2019</p>
                </div>

            </footer>
        )
    }


}

export default index;
