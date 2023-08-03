import React from 'react';
import FooterComponent from '../../scenes/auth/components/Footer';
import Wrap from '../../scenes/auth/components/Wrap';
import Header from '../header/Header';

interface WrapProps {
    children: React.ReactNode;
    background?: string;
    className?: string;
    style?: Object
}

const WrapMainComponent = ({ children, background, className, style }: WrapProps) => {
    return (
        <div>
            <Header />
            <Wrap className={className}>
                {children}
            </Wrap>
            <FooterComponent />
        </div>
    );
}

export default WrapMainComponent;