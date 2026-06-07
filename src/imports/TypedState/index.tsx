import imgImg03612 from \"./8e7ebf332deedbbc319f0fa3ad6ae222eaf5406e.png\";
import imgImg03591 from \"./f6b7b72b42cd56976252c336ddcce259473eac95.png\";
import imgImage1 from \"./88555d5614cd8f6999b7414e2b1de0a0ebe300fc.png\";

function Group() {
  return (
    <div className=\"[word-break:break-word] absolute contents font-['Louize:Regular',sans-serif] leading-[normal] left-[153px] not-italic text-[40px] text-black top-[48px] whitespace-nowrap\">
      <p className=\"absolute left-[170px] top-[48px]\">the</p>
      <p className=\"absolute left-[153px] top-[71px]\">good</p>
      <p className=\"absolute left-[198px] top-[92px]\">jar</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className=\"absolute h-[494px] left-[-168.5px] top-[-217px] w-[740px]\">
      <div className=\"absolute h-[494px] left-[-79.5px] mix-blend-luminosity opacity-60 top-0 w-[740px]\" data-name=\"image 1\">
        <img alt=\"\" className=\"absolute inset-0 max-w-none object-cover pointer-events-none size-full\" src={imgImage1} />
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className=\"-translate-x-1/2 -translate-y-1/2 absolute bg-[#f4f0e9] h-[106px] left-1/2 overflow-clip top-1/2 w-[320px]\">
      <Frame1 />
      <p className=\"-translate-x-1/2 [word-break:break-word] absolute font-['Louize:Regular',sans-serif] leading-[normal] left-[calc(50%+0.5px)] not-italic text-[#493a28] text-[16px] text-center top-[calc(50%-10px)] whitespace-nowrap\">demo’d my website at demo nights|</p>
    </div>
  );
}

export default function TypedState() {
  return (
    <div className=\"bg-white relative size-full\" data-name=\"typed state\">
      <div className=\"absolute h-[1244px] left-[-310px] top-[-73px] w-[996px]\" data-name=\"IMG_0361 2\">
        <img alt=\"\" className=\"absolute inset-0 max-w-none object-cover pointer-events-none size-full\" src={imgImg03612} />
      </div>
      <div className=\"absolute h-[225px] left-[-10px] top-[402px] w-[410px]\" data-name=\"IMG_0359 1\">
        <div className=\"absolute inset-0 overflow-hidden pointer-events-none\">
          <img alt=\"\" className=\"absolute h-[242.57%] left-0 max-w-none top-[-116.95%] w-full\" src={imgImg03591} />
        </div>
      </div>
      <div className=\"absolute h-[131px] left-[-10px] top-[271px] w-[410px]\" data-name=\"IMG_0359 2\">
        <div className=\"absolute inset-0 overflow-hidden pointer-events-none\">
          <img alt=\"\" className=\"absolute h-[416.63%] left-0 max-w-none top-[-100.87%] w-full\" src={imgImg03591} />
        </div>
      </div>
      <Group />
      <div className=\"absolute backdrop-blur-[11.5px] bg-[rgba(6,6,6,0.1)] h-[844px] left-0 top-0 w-[390px]\" />
      <Frame />
    </div>
  );
}