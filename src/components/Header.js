import React, {useState} from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import "./Header.css";

const Header = ({ }) => {
    return (
        <div className='title-box'>
            <div className='row'>
                <div className='col box-1'>
                    <p className='title-1'> Lit</p>
                </div>
                <div className='col box-2'>
                    <p className='title-2'>erary Collector</p>
                </div>
            </div>
            <div className='row desc'>
                <p>Find a new cultural classic with Project Gutenberg</p>
            </div>
            <div className='row info'>
                <Popup className='popup' trigger={<button className='button-info'>How it works</button>}>
                    {close => (
                        <div>
                            <p>Choose a language, enter keywords or an ID, or randomize 
                                to recieve a classic book suggestion! </p>
                            <div>
                                <button className='button-close' onClick=
                                    {() => close()}>
                                        OK
                                </button>
                            </div>
                        </div>
                    )}
                </Popup>
            </div>
        </div>
    );
}

export default Header;