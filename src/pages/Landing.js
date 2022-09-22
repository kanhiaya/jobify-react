import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import { Logo } from '../component';
import { Link } from 'react-router-dom';
function Landing() {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className='container page'>
        {/* info */}
        <div className='info'>
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            I'm baby godard portland roof party umami pug. Roof party JOMO ascot
            DIY flannel, VHS butcher man braid PBR&B plaid farm-to-table poke
            stumptown. Cornhole mukbang paleo affogato fashion axe normcore.
            Celiac authentic gastropub, whatever tonx semiotics migas pug kogi
            praxis microdosing glossier vinyl unicorn neutra. Affogato schlitz
            DIY pitchfork pinterest kogi aesthetic fanny pack kombucha flannel
            occupy disrupt paleo umami mixtape.
          </p>
          <Link to='/register' className='btn btn-hero'>
            Login/Register
          </Link>
        </div>
        <img src={main} alt='job hunt' className='img main-img' />
      </div>
    </Wrapper>
  );
}

export default Landing;
