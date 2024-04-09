import { useState } from "react";
import data from "./data";

export default function Accordion() {
  const [selected, setSelected] = useState<number>(-1);
  const [enableMultiSelection, setEnableMultiSelection] =
    useState<boolean>(false);
  const [multiple, setMultiple] = useState<number[]>([]);

  const handleSingleSelect = (nextId: number) => {
    setSelected((currentId) => {
      if (currentId === nextId) return -1;
      return nextId;
    });
  };

  const handleMultiSelect = (currentId: number) => {
    const cpyMultiple: number[] = [...multiple];

    const indexOfCurrent: number = cpyMultiple.indexOf(currentId);

    if (indexOfCurrent === -1) {
      cpyMultiple.push(currentId);
    } else {
      cpyMultiple.splice(indexOfCurrent, 1);
    }

    setMultiple(cpyMultiple);
  };

  const content = (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-3">
      <button
        className="p-3 font-bold text-lg bg-indigo-300"
        onClick={() => setEnableMultiSelection(!enableMultiSelection)}
      >
        Enable Multiple Selections
      </button>
      <div className="w-3/6">
        {data.length > 0 ? (
          data.map((item) => {
            const isExpanded = item.id === selected;
            return (
              <div key={item.id} className="bg-indigo-300 mb-2 px-2 py-3">
                <div
                  className="font-bold flex justify-between cursor-pointer"
                  onClick={() =>
                    enableMultiSelection
                      ? handleMultiSelect(item.id)
                      : handleSingleSelect(item.id)
                  }
                >
                  <h2 className="">{item.label}</h2>
                  <span>+</span>
                </div>
                {enableMultiSelection
                  ? multiple.includes(item.id) && (
                      <div className="h-auto">{item.content}</div>
                    )
                  : isExpanded && <div className="h-auto">{item.content}</div>}
              </div>
            );
          })
        ) : (
          <div>No data found!</div>
        )}
      </div>
    </div>
  );

  return content;
}
