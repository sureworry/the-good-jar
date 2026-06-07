import imgImg03612 from \"./8e7ebf332deedbbc319f0fa3ad6ae222eaf5406e.png\";
import imgImg03581 from \"./402368211f626223b6e9f946f1025ff002c10db1.png\";
import imgImg03701 from \"./e180000100eab2253bd7ef19aaa1b42314fd49e7.png\";
import imgImg03591 from \"./f6b7b72b42cd56976252c336ddcce259473eac95.png\";

function Group() {
  return (
    <div className=\"[word-break:break-word] absolute contents font-['Louize:Regular',sans-serif] leading-[normal] left-[153px] not-italic text-[40px] text-black top-[59px] whitespace-nowrap\">
      <p className=\"absolute left-[170px] top-[59px]\">the</p>
      <p className=\"absolute left-[153px] top-[82px]\">good</p>
      <p className=\"absolute left-[198px] top-[103px]\">jar</p>
    </div>
  );
}

function Frame() {
  return (
    <div className=\"-translate-x-1/2 absolute bg-[#90a475] content-stretch flex h-[60px] items-center justify-center left-1/2 p-[10px] top-[747px] w-[320px]\">
      <div aria-hidden className=\"absolute border border-[#90a475] border-solid inset-[-0.5px] pointer-events-none\" />
      <p className=\"[word-break:break-word] font-['Louize:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[14px] text-black text-center whitespace-nowrap\">choose</p>
    </div>
  );
}

export default function JarSelection() {
  return (
    <div className=\"bg-white relative size-full\" data-name=\"jar selection\">
      <div className=\"absolute h-[1244px] left-[-310px] top-[-73px] w-[996px]\" data-name=\"IMG_0361 2\">
        <img alt=\"\" className=\"absolute inset-0 max-w-none object-cover pointer-events-none size-full\" src={imgImg03612} />
      </div>
      <Group />
      <Frame />
      <div className=\"-translate-x-1/2 absolute h-[399px] left-[calc(50%+8px)] top-[222px] w-[204px]\" data-name=\"IMG_0358 1\">
        <div className=\"absolute inset-0 overflow-hidden pointer-events-none\">
          <img alt=\"\" className=\"absolute h-[152.38%] left-[-48.69%] max-w-none top-[-26.64%] w-[199.13%]\" src={imgImg03581} />
        </div>
      </div>
      <div className=\"absolute h-[211px] left-[314px] top-[324px] w-[239px]\" data-name=\"IMG_0370 1\">
        <div className=\"absolute inset-0 overflow-hidden pointer-events-none\">
          <img alt=\"\" className=\"absolute h-[246.01%] left-[-22.22%] max-w-none top-[-88.15%] w-[145.45%]\" src={imgImg03701} />
        </div>
      </div>
      <div className=\"absolute h-[264px] left-[-157px] top-[290px] w-[284px]\" data-name=\"IMG_0359 1\">
        <div className=\"absolute inset-0 overflow-hidden pointer-events-none\">
          <img alt=\"\" className=\"absolute h-[142.88%] left-0 max-w-none top-[-27.79%] w-full\" src={imgImg03591} />
        </div>
      </div>
    </div>
  );
}