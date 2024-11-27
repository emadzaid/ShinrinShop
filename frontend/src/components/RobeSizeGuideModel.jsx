const RobeSizeGuideModel = () => {
    return (
      <div className="mb-4">
      <button 
              className="underline" 
              onClick={() => document.getElementById('size-guide-model').showModal()}
            >
              View Size Guide
            </button>
            <dialog id="size-guide-model" className="modal">
              <div className="modal-box w-11/12 max-w-5xl">
                <div className="modal-action">
                  <form method="dialog">
                    {/* if there is a button, it will close the modal */}
                    <button className="btn">Close</button>
                  </form>
                </div>
                <h1 className="text-3xl font-bold mb-4">Kimono Robe Size Guide</h1>
                <div className="overflow-x-auto my-6">
                <table className="table w-full border-collapse border border-gray-200">
                  <thead>
                    <tr>
                      <th className="bg-gray-100 border border-gray-200 px-4 py-2">Size</th>
                      <th className="bg-gray-100 border border-gray-200 px-4 py-2">U.S.</th>
                      <th className="bg-gray-100 border border-gray-200 px-4 py-2">UK</th>
                      <th className="bg-gray-100 border border-gray-200 px-4 py-2">EU</th>
                      <th className="bg-gray-100 border border-gray-200 px-4 py-2">Japan</th>
                      <th className="bg-gray-100 border border-gray-200 px-4 py-2">France</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2">S/M</td>
                      <td className="border border-gray-200 px-4 py-2">0-12</td>
                      <td className="border border-gray-200 px-4 py-2">4-16</td>
                      <td className="border border-gray-200 px-4 py-2">30-42</td>
                      <td className="border border-gray-200 px-4 py-2">5-17</td>
                      <td className="border border-gray-200 px-4 py-2">32-44</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2">L/XL</td>
                      <td className="border border-gray-200 px-4 py-2">14-20</td>
                      <td className="border border-gray-200 px-4 py-2">18-24</td>
                      <td className="border border-gray-200 px-4 py-2">44-50</td>
                      <td className="border border-gray-200 px-4 py-2">19-25</td>
                      <td className="border border-gray-200 px-4 py-2">46-52</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2">Long</td>
                      <td className="border border-gray-200 px-4 py-2">8-16</td>
                      <td className="border border-gray-200 px-4 py-2">12-20</td>
                      <td className="border border-gray-200 px-4 py-2">38-46</td>
                      <td className="border border-gray-200 px-4 py-2">13-19</td>
                      <td className="border border-gray-200 px-4 py-2">40-48</td>
                    </tr>
                  </tbody>
                </table>
              </div>
     
              </div>
            </dialog>
    
           </div>
    );
  };
  
  export default RobeSizeGuideModel;
  
