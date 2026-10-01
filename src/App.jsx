import { useCallback, useRef, useState } from "react";
import IconSprite from "./components/ui/IconSprite";
import Header from "./components/layout/Header";
import MobileMenu from "./components/layout/MobileMenu";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Work from "./components/sections/Work";
import WhyMe from "./components/sections/WhyMe";
import Contact from "./components/sections/Contact";
import Footer from "./components/layout/Footer";
import Lightbox from "./components/overlays/Lightbox";
import { NAV_COPY, SECTION_IDS } from "./data/siteData";
import useSiteMedia from "./hooks/useSiteMedia";
import useHeaderSolid from "./hooks/useHeaderSolid";
import useScrollSpy from "./hooks/useScrollSpy";
import useLightbox from "./hooks/useLightbox";

const NO_CHAPTERS = [];

export default function App() {
  const { status, data, retry } = useSiteMedia();
  const chapters = data?.chapters ?? NO_CHAPTERS;
  const lightbox = useLightbox(chapters);
  const sentinelRef = useRef(null);
  const menuButtonRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerSolid = useHeaderSolid(sentinelRef);
  const activeId = useScrollSpy(SECTION_IDS);

  const openMenu = useCallback(() => setMenuOpen(true), []);
  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    menuButtonRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <>
      <IconSprite />
      {/* .skip */}
      <a
        href="#main"
        className="fixed -top-20 left-4 z-[200] bg-cream px-[18px] py-3 font-semibold text-wine transition-[top] duration-200 focus:top-4"
      >
        {NAV_COPY.skip}
      </a>

      <Header
        solid={headerSolid}
        activeId={activeId}
        menuOpen={menuOpen}
        onMenuOpen={openMenu}
        menuButtonRef={menuButtonRef}
      />
      <MobileMenu open={menuOpen} activeId={activeId} onClose={closeMenu} />

      <main id="main">
        <Hero
          heroFigure={data?.heroFigure ?? null}
          chapters={chapters}
          status={status}
          sentinelRef={sentinelRef}
        />
        <About />
        <Work media={data} status={status} retry={retry} onOpenItem={lightbox.openItem} />
        <WhyMe whyFigure={data?.whyFigure ?? null} />
        <Contact />
      </main>
      <Footer />
      <Lightbox chapters={chapters} state={lightbox.state} onClose={lightbox.close} onGo={lightbox.go} />
    </>
  );
}
