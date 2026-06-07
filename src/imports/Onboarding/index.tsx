import imgImg03612 from \"./8e7ebf332deedbbc319f0fa3ad6ae222eaf5406e.png\";
import imgImage1 from \"./88555d5614cd8f6999b7414e2b1de0a0ebe300fc.png\";

function Frame1() {
  return (
    <div className=\"absolute h-[494px] left-[-168.5px] top-[-244px] w-[740px]\">
      <div className=\"absolute h-[494px] left-[-79.5px] mix-blend-luminosity opacity-60 top-0 w-[740px]\" data-name=\"image 1\">
        <img alt=\"\" className=\"absolute inset-0 max-w-none object-cover pointer-events-none size-full\" src={imgImage1} />
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className=\"-translate-x-1/2 -translate-y-1/2 absolute bg-[#f4f0e9] h-[174px] left-1/2 overflow-clip top-[calc(50%-14px)] w-[320px]\">
      <Frame1 />
      <p className=\"-translate-x-1/2 [word-break:break-word] absolute font-['Space_Grotesk:Regular',sans-serif] font-normal leading-[normal] left-1/2 text-[#493a28] text-[14px] text-center top-[calc(50%-36px)] w-[284px]\">lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum</p>
    </div>
  );
}

function Group() {
  return (
    <div className=\"[word-break:break-word] absolute contents font-['Louize:Regular',sans-serif] leading-[normal] left-[153px] not-italic text-[40px] text-black top-[59px] whitespace-nowrap\">
      <p className=\"absolute left-[170px] top-[59px]\">the</p>
      <p className=\"absolute left-[153px] top-[82px]\">good</p>
      <p className=\"absolute left-[198px] top-[103px]\">jar</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className=\"-translate-x-1/2 absolute bg-[#90a475] content-stretch flex h-[60px] items-center justify-center left-1/2 p-[10px] top-[747px] w-[320px]\">
      <div aria-hidden className=\"absolute border border-[#90a475] border-solid inset-[-0.5px] pointer-events-none\" />
      <p className=\"[word-break:break-word] font-['Louize:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[14px] text-black text-center whitespace-nowrap\">get started</p>
    </div>
  );
}

export default function Onboarding() {
  return (
    <div className=\"bg-white relative size-full\" data-name=\"onboarding\">
      <div className=\"absolute h-[1244px] left-[-310px] top-[-73px] w-[996px]\" data-name=\"IMG_0361 2\">
        <img alt=\"\" className=\"absolute inset-0 max-w-none object-cover pointer-events-none size-full\" src={imgImg03612} />
      </div>
      <Frame />
      <Group />
      <Frame2 />
    </div>
  );
}