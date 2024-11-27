const KimonoSizeGuideModel = () => {
    return (
      <>
        <button 
          className="underline" 
          onClick={() => document.getElementById('size-guide-model').showModal()}
        >
          View Size Guide
        </button>
        <dialog id="size-guide-model" className="modal">
          <div className="modal-box w-11/12 max-w-5xl overflow-y-scroll">
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
            <h1 className="text-3xl font-bold mb-4">Kimono Size Guide</h1>
            <div className="flex flex-col gap-4 items-center text-start">
              <h3 className="font-bold text-lg">What’s My Size?</h3>
              <p>
                When buying a kimono or yukata, you don’t need to worry about finding your exact size. Women’s kimono 
                usually come in just one size, which will probably be longer and wider than you need. They are adjusted 
                to the right size by folding them at the waist.
                <br /> <br />
                Sleeves tend to be worn shorter than you may be used to – between the wrist and elbow.
              </p>
  
              <h3 className="font-bold text-lg">How to Check if a Kimono or Yukata will Fit?</h3>
              <p>
                To check if a kimono or yukata will fit you, you just need to measure your height and around your hips 
                (or waist if that is wider).
              </p>
              <img src="/images/Height-Hips.jpg" className="size-1/2" />
  
              <h3 className="font-bold text-lg">Adjusting the Length</h3>
              <p>
                Pull up your kimono until the bottom reaches the correct length, then tie it in place round your waist 
                with a ribbon or a koshi himo (kimono tie). Fold the excess material down over the tie.
              </p>
  
              <h3 className="font-bold text-lg">Adjusting the Width</h3>
              <p>
                Wrap the front of the kimono around your body so that it is tight and comfortable. Tie in place with a 
                ribbon or a koshi himo (kimono tie). Fold the excess material down over the tie.
              </p>
              <img src="/images/Height-Sleeve.jpg" className="size-1/2" />
            </div>
          </div>
        </dialog>
      </>
    );
  }
  
  export default KimonoSizeGuideModel;
  