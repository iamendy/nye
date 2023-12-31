import Link from "next/link";
import Logo from "./icons/Logo";
import styles from "../styles/Navbar.module.scss";
import Menu from "../components/icons/Menu";
import { useRouter } from "next/router";
import { ConnectButton } from "@rainbow-me/rainbowkit";
const Navbar = () => {
  const { pathname } = useRouter();
  return (
    <nav className={styles.navbarWrapper}>
      <div className={styles.navbar}>
        <Link href="/" className={styles.logo}>
          <Logo />

          <span>Nyé</span>
        </Link>

        <div className="flex gap-x-4">
          <Link
            href={"/organization"}
            className={`${
              pathname?.includes("organization") && "border-b border-b-black"
            } p-2 `}
          >
            For Organization
          </Link>
          <Link
            href={"/donor"}
            className={`${
              pathname?.includes("donor") && "border-b border-b-black"
            } p-2`}
          >
            For Donor
          </Link>
        </div>

        <div className={styles.menu}>
          <Menu />

          <ConnectButton showBalance={false} />
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
