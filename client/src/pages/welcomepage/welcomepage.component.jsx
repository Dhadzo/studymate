import React from 'react';
import {Link} from 'react-router-dom';  
import './welcomepage.styles.scss';
import StudyingImage from '../../assets/studying-image.jpg'


const WelcomePage = () =>  {
    return (
        <div className="welcome-body">
                <div className="intro">
                    <div className="introHead">StudyMate</div>
                    <div className="introBody">
                        StudyMate is a platform for students where they get to interact with others who have similar interests with them.
                        It also helps them to find the closest study partner from their current location.
                    </div>
                    <div className="mt-5">
                    <Link className="p-3 buttn text-decoration-none" to='/signup'>Get started.</Link>
                    </div>
                </div>
                   
                <div className="picDiv">
                   <img src={StudyingImage}className="welcome-picture" />
                </div>
        </div>
    );
}

export default WelcomePage;