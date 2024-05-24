

import BacoorLogo from '../assets/bacoor-logo.png';
import CouncilLogo from '../assets/councilLogo.png'

import Footer from '@/Components/Footer';

import FAQSComponent from '@/Components/FAQSComponent';
import BenefitsAndFeatures from '@/Components/BenefitsAndFeatures';
import VoterGuideComponent from '@/Components/VoterGuideComponent';
import HeroComponent from '@/Components/HeroComponent';
import NavigationBarComponent from '@/Components/NavigationBarComponent';


export default function Welcome() {

   
    const bgStyle = {
        backgroundColor: 'hsla(0, 0%, 100%, 1)',
        backgroundImage: 'radial-gradient(at 40% 20%, hsla(40,100%,88%,1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(212, 100%, 76%, 1) 0px, transparent 50%)',
    };
    return (
        <>

            <div style={bgStyle}>
                <div
                    className="h-full w-full">
                    

                    <NavigationBarComponent/>

                    <HeroComponent />

                    <div
                        className='h-auto w-full flex justify-center gap-5 my-24 overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)] '>
                        {[...Array(3)].map((_, index) => (
                            <div key={index} className='flex items-center justify-center md:justify-end gap-5 animate-infinite-scroll'>
                                {[...Array(14)].map((_, index) => (
                                    <div key={index} className='w-28 object-cover '>
                                        <img loading='lazy' src={index % 2 === 0 ? BacoorLogo : CouncilLogo} alt="Logo" className="pointer-events-none" />
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                    <VoterGuideComponent />

                    <BenefitsAndFeatures />
                    <FAQSComponent />
                    <Footer />
                </div>

            </div>
        </>

    );

}
