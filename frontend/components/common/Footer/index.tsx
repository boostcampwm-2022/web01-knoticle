import { FooterContent, FooterLink } from './styled';

function Footer() {
  return (
    <footer>
      <FooterContent>
        <div>Copyright © 2022 by Knoticle Team</div>
        <div>
          <FooterLink href="https://github.com/boostcampwm-2022/web01-knoticle">Github</FooterLink>
        </div>
      </FooterContent>
    </footer>
  );
}

export default Footer;
