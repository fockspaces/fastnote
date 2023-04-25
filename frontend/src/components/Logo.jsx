import "../styles/global/logo.scss";
import { src } from "../utils/srcLink";
const Logo = () => {
  return (
    <a href="/">
      <img src={src.logo} alt="Note App" className="logo" />
    </a>
  );
};
export default Logo;
